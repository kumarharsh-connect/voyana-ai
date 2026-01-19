import { openai } from './openai';
import { GENERATION_SYSTEM_PROMPT } from './generationSystemPrompt';
import { buildGenerationPrompt } from './generationPromptBuilder';
import { enrichItineraryWithMaps } from '@/lib/maps/enrichItineraryWithMaps';
import { enrichItineraryUX } from './enrichItineraryUX';

type TripData = {
  destination: string;
  days: number;
  groupType: string | null;
  minBudget: number | null;
  maxBudget: number | null;
  currency: string;
  pace: string | null;
};

/**
 * @param tripData
 * @returns
 **/
export async function generateItinerary(tripData: TripData) {
  // Base generation
  const prompt = buildGenerationPrompt({
    destination: tripData.destination,
    days: tripData.days,
    groupType: tripData.groupType ?? 'solo',
    minBudget: tripData.minBudget ?? undefined,
    maxBudget: tripData.maxBudget ?? undefined,
    pace: tripData.pace ?? 'balanced',
    currency: tripData.currency,
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.4,
    messages: [
      { role: 'system', content: GENERATION_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
  });

  const aiText = completion.choices[0]?.message?.content;
  if (!aiText) {
    throw new Error('AI_EMPTY_RESPONSE');
  }

  let baseItinerary;
  try {
    const parsed = JSON.parse(aiText);
    baseItinerary =
      parsed?.itinerary && Array.isArray(parsed.itinerary.days)
        ? parsed.itinerary
        : parsed;

    if (!Array.isArray(baseItinerary?.days)) {
      throw new Error('AI_INVALID_RESPONSE');
    }
  } catch {
    throw new Error('AI_INVALID_JSON');
  }

  if (!baseItinerary?.days) {
    throw new Error('AI_INVALID_RESPONSE');
  }

  // Enrich with maps (locations)
  let withMaps: any = baseItinerary;
  try {
    withMaps = await enrichItineraryWithMaps(
      baseItinerary,
      tripData.destination,
    );
  } catch (error) {
    console.error('Maps enrichment error:', error);
  }

  let finalItinerary = withMaps;
  try {
    finalItinerary = await enrichItineraryUX(withMaps);
  } catch (error) {
    console.error('UX enrichment error:', error);
  }

  // final result
  return finalItinerary;
}
