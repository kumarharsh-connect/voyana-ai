import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchDestinationImage } from '@/lib/images/unsplash';

import { openai } from '@/lib/ai/openai';
import { GENERATION_SYSTEM_PROMPT } from '@/lib/ai/generationSystemPrompt';
import { buildGenerationPrompt } from '@/lib/ai/generationPromptBuilder';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);

    const prompt = buildGenerationPrompt({
      destination: trip.destination,
      days: trip.days,
      groupType: trip.groupType!,
      minBudget: trip.minBudget,
      maxBudget: trip.maxBudget,
      currency: trip.currency,
      pace: trip.pace,
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
    if (!aiText) throw new Error('EMPTY_AI_RESPONSE');

    const parsed = JSON.parse(aiText);

    const itinerary = await prisma.itinerary.upsert({
      where: { tripId: trip.id },
      update: { content: parsed.itinerary },
      create: { tripId: trip.id, content: parsed.itinerary },
    });

    await prisma.trip.update({
      where: { id: trip.id },
      data: { status: 'GENERATED' },
    });

    if (!trip.coverImageUrl) {
      const imageUrl = await fetchDestinationImage(trip.destination);
      if (imageUrl) {
        await prisma.trip.update({
          where: { id: trip.id },
          data: { coverImageUrl: imageUrl },
        });
      }
    }

    return NextResponse.json({ itinerary: itinerary.content });
  } catch (e) {
    console.error(e);
    return new NextResponse('Generation failed', { status: 500 });
  }
}
