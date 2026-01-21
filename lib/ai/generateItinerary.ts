import { openai } from './openai';
import { UNIFIED_GENERATION_SYSTEM_PROMPT } from './generationSystemPrompt';
import { buildUnifiedGenerationPrompt } from './generationPromptBuilder';

type TripData = {
  destination: string;
  days: number;
  groupType: string | null;
  minBudget: number | null;
  maxBudget: number | null;
  currency: string;
  pace: string | null;
};

export async function generateItinerary(tripData: TripData) {
  const prompt = buildUnifiedGenerationPrompt({
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
    response_format: { type: 'json_object' },
    max_tokens: 2000,
    messages: [
      { role: 'system', content: UNIFIED_GENERATION_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
  });

  const aiText = completion.choices[0]?.message?.content;
  if (!aiText) {
    throw new Error('AI_EMPTY_RESPONSE');
  }

  let completeItinerary;
  try {
    const parsed = JSON.parse(aiText);

    // Validate the response structure
    if (!parsed?.itinerary || !Array.isArray(parsed.itinerary.days)) {
      throw new Error('AI_INVALID_RESPONSE');
    }

    completeItinerary = parsed.itinerary;

    // Validate required fields
    for (const day of completeItinerary.days) {
      if (!day.day || !Array.isArray(day.activities)) {
        throw new Error('AI_INVALID_DAY_STRUCTURE');
      }

      // Validate activities have required fields
      for (const activity of day.activities) {
        if (!activity.name || !activity.description || !activity.timeBlock) {
          throw new Error('AI_INVALID_ACTIVITY_STRUCTURE');
        }
      }
    }
  } catch (error) {
    console.error('AI Response parsing error:', error);
    if (error instanceof SyntaxError) {
      throw new Error('AI_INVALID_JSON');
    }
    throw error;
  }

  return completeItinerary;
}
