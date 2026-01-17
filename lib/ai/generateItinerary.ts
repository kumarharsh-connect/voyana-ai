import { openai } from './openai';
import { GENERATION_SYSTEM_PROMPT } from './generationSystemPrompt';
import { buildGenerationPrompt } from './generationPromptBuilder';
import { enrichItineraryWithMaps } from '@/lib/maps/enrichItineraryWithMaps';

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
 * Creates a personalized travel itinerary using AI, then adds real-world locations
 * and addresses to each activity so you can see everything on a map.
 * 
 * @param tripData - All the trip details like destination, days, budget, etc.
 * @returns A complete itinerary with activities, descriptions, and location data
 */
export async function generateItinerary(tripData: TripData) {
  // Build the prompt
  const prompt = buildGenerationPrompt({
    destination: tripData.destination,
    days: tripData.days,
    groupType: tripData.groupType ?? 'solo',
    minBudget: tripData.minBudget ?? undefined,
    maxBudget: tripData.maxBudget ?? undefined,
    pace: tripData.pace ?? 'balanced',
    currency: tripData.currency,
  });

  // Call OpenAI
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.4,
    messages: [
      { role: 'system', content: GENERATION_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
  });

  // Parse AI response
  const aiText = completion.choices[0]?.message?.content;
  if (!aiText) {
    throw new Error('AI_EMPTY_RESPONSE');
  }

  let aiResponse;
  try {
    aiResponse = JSON.parse(aiText);
  } catch {
    throw new Error('AI_INVALID_JSON');
  }

  if (!aiResponse?.itinerary) {
    throw new Error('AI_INVALID_RESPONSE');
  }

  // Enrich with maps (locations)
  let enrichedContent: any = aiResponse.itinerary;
  try {
    enrichedContent = await enrichItineraryWithMaps(
      aiResponse.itinerary,
      tripData.destination
    );
  } catch (error) {
    // Log but continue with unenriched content
    console.error('Maps enrichment error:', error);
  }

  return enrichedContent;
}
