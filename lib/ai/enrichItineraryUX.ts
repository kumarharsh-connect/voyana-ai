import { openai } from './openai';
import { SYSTEM_PROMPT } from './systemPrompt';

export async function enrichItineraryUX(itinerary: any) {
  const normalized = itinerary?.itinerary ?? itinerary;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: JSON.stringify(normalized),
      },
    ],
  });

  const aiText = completion.choices[0]?.message?.content;
  if (!aiText) throw new Error('AI_EMPTY_RESPONSE');

  try {
    const parsed = JSON.parse(aiText);
    if (!parsed?.itinerary) throw new Error('AI_INVALID_RESPONSE');
    return parsed.itinerary;
  } catch {
    console.warn('[UX] Invalid JSON, returning original itinerary');
    return itinerary?.itinerary ?? itinerary;
  }
}
