export const runtime = 'nodejs';
import { assertTripCanChat } from '@/lib/guards/tripChatGuard';
import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

import { openai } from '@/lib/ai/openai';
import { SYSTEM_PROMPT } from '@/lib/ai/systemPrompt';
import { buildChatPrompt } from '@/lib/ai/chatPromptBuilder';
import { aiLimiter } from '@/lib/rate-limit';

type ItineraryContent = {
  overview?: any;
  days?: any[];
  [key: string]: any;
};

function mergeItineraryPreservingLocations(
  oldItinerary: any,
  newItinerary: any,
) {
  const locationMap = new Map<string, any>();
  for (const day of oldItinerary?.days ?? []) {
    for (const activity of day.activities ?? []) {
      if (activity.location) {
        locationMap.set(activity.name, activity.location);
      }
    }
  }

  return {
    ...newItinerary,
    days: newItinerary.days.map((day: any) => ({
      ...day,
      activities: day.activities.map((activity: any) => ({
        ...activity,
        location: locationMap.get(activity.name) ?? activity.location ?? null,
      })),
    })),
  };
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ tripId: string }> },
) {
  try {
    const { tripId } = await params;

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return new NextResponse('Invalid Message', { status: 400 });
    }

    const trip = await getAuthorizedTrip(tripId);

    // state guard
    assertTripCanChat(trip.status);

    await prisma.message.create({
      data: {
        tripId: trip.id,
        role: 'USER',
        content: message,
      },
    });

    if (!trip.itinerary) {
      return new NextResponse('Itinerary not found', { status: 409 });
    }

    const existingContent = (trip.itinerary?.content as ItineraryContent) ?? {};

    const prompt = buildChatPrompt({
      itinerary: existingContent,
      userMessage: message,
      destination: trip.destination,
      groupType: trip.groupType,
    });

    // calling openai
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
    });

    // parse ai response
    const aiText = completion.choices[0]?.message?.content;
    if (!aiText) {
      throw new Error('EMPTY_AI_RESPONSE');
    }
    console.log(aiText);

    let aiResponse: {
      itinerary: any;
      reply: string;
    };

    aiResponse = JSON.parse(aiText);
    if (
      !aiResponse ||
      typeof aiResponse !== 'object' ||
      !aiResponse.itinerary ||
      typeof aiResponse.reply !== 'string'
    ) {
      throw new Error('INVALID_AI_JSON');
    }

    // update itinerary

    const mergedItinerary = mergeItineraryPreservingLocations(
      existingContent,
      aiResponse.itinerary,
    );

    const updatedItinerary = await prisma.itinerary.update({
      where: { tripId: trip.id },
      data: {
        content: mergedItinerary,
        generatedByAI: true,
        mapsEnriched: false,
      },
    });

    // save ai message
    await prisma.message.create({
      data: {
        tripId: trip.id,
        role: 'ASSISTANT',
        content: aiResponse.reply,
      },
    });

    return NextResponse.json({
      itinerary: updatedItinerary.content,
      reply: aiResponse.reply,
    });
  } catch (error: any) {
    if (
      error?.status === 429 ||
      error?.code === 'rate_limit_exceeded' ||
      error?.message?.includes('Rate limit')
    ) {
      return NextResponse.json(
        {
          error: 'AI is temporarily rate-limited. Please retry shortly.',
        },
        { status: 429 },
      );
    }
    if (error.message === 'UNAUTHORIZED') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (error.message === 'TRIP_NOT_FOUND') {
      return new NextResponse('Trip not found', { status: 404 });
    }

    if (error.message === 'CHAT_NOT_ALLOWED') {
      return new NextResponse('Chat not allowed for this trip', {
        status: 409,
      });
    }

    if (error.message === 'INVALID_AI_JSON') {
      return new NextResponse('AI returnes invalid response', { status: 502 });
    }
    if (error.message === 'EMPTY_AI_RESPONSE') {
      return new NextResponse('AI did not respond', { status: 502 });
    }

    console.error('CHAT ERROR', error);
    return new NextResponse('Server error', { status: 500 });
  }
}
