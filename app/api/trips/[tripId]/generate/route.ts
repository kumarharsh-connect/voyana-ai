import { checkMissingInfo } from '@/lib/ai/checkMissingInfo';
import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { assertTripCanGenerate } from '@/lib/guards/tripStatusGuard';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

import { openai } from '@/lib/ai/openai';
import { GENERATION_SYSTEM_PROMPT } from '@/lib/ai/generationSystemPrompt';
import { buildGenerationPrompt } from '@/lib/ai/generationPromptBuilder';

type AIGenerationResponse = {
  itinerary: {
    overview: {
      destination: string;
      summary?: string;
    };
    days: Array<{
      day: number;
      activities: Array<{
        name: string;
        description: string;
      }>;
    }>;
  };
};

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    console.log('COOKIE:', (await headers()).get('cookie'));
    console.log('AUTH:', (await headers()).get('authorization'));
    console.log('Endpoint hit');
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);
    console.log(trip);

    // State guard
    assertTripCanGenerate(trip.status);
    console.log(trip.status);

    // Check missing info
    const missing = checkMissingInfo(trip);
    if (missing) {
      return NextResponse.json(missing);
    }

    const prompt = buildGenerationPrompt({
      destination: trip.destination,
      groupSize: trip.groupSize,
      groupType: trip.groupType,
      budget: trip.budget,
      pace: trip.pace,
    });
    console.log('Prompt generated');

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
      throw new Error('EMPTY_AI_RESPONSE');
    }
    console.log('RAW_AI_TEXT');
    console.log(aiText);
    console.log('RAW_AI_TEXT');

    let aiResponse: AIGenerationResponse;

    try {
      aiResponse = JSON.parse(aiText);
    } catch {
      throw new Error('INVALID_AI_JSON');
    }

    if (
      !aiResponse.itinerary ||
      !aiResponse.itinerary.overview ||
      !Array.isArray(aiResponse.itinerary.days)
    ) {
      throw new Error('INVALID_AI_JSON');
    }

    const itinerary = await prisma.itinerary.upsert({
      where: { tripId: trip.id },
      update: {
        content: aiResponse.itinerary,
        generatedByAI: true,
      },
      create: {
        tripId: trip.id,
        content: aiResponse.itinerary,
        generatedByAI: true,
      },
    });

    await prisma.trip.update({
      where: { id: trip.id },
      data: { status: 'GENERATED' },
    });

    return NextResponse.json({ type: 'ITINERARY', itinerary });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (error.message === 'TRIP_NOT_FOUND') {
      return new NextResponse('Trip not found', { status: 404 });
    }

    if (error.message === 'INVALID_TRIP_STATE') {
      return new NextResponse('Trip has already been generated', {
        status: 409,
      });
    }

    if (error.message === 'INVALID_AI_JSON') {
      return new NextResponse('AI returned invalid itinerary', { status: 502 });
    }

    if (error.message === 'EMPTY_AI_RESPONSE') {
      return new NextResponse('AI did not respond', { status: 502 });
    }

    return new NextResponse('Server error', { status: 500 });
  }
}
