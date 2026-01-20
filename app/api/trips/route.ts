import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

import { createTrip } from '@/lib/trips/createTrip';
import { rateLimiter } from '@/lib/rate-limit';
import { fetchDestinationImage } from '@/lib/images/unsplash';
import { generateItinerary } from '@/lib/ai/generateItinerary';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';

  const identifier = userId ?? ip;
  const { success } = await rateLimiter.limit(identifier);

  const body = await req.json();

  if (!body.destination || !body.days) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  if (body.minBudget && body.maxBudget && body.minBudget > body.maxBudget) {
    return NextResponse.json(
      { error: 'Invalid budget range' },
      { status: 400 },
    );
  }

  const trip = await prisma.trip.create({
    data: {
      user: {
        connect: { clerkId: userId },
      },
      title: body.title ?? `Trip to ${body.destination}`,
      destination: body.destination,
      days: body.days,
      groupType: body.groupType ?? 'solo',
      pace: body.pace ?? 'balanced',
      minBudget: body.minBudget,
      maxBudget: body.maxBudget,
      status: 'GENERATED',
    },
  });

  let enrichedContent;
  try {
    enrichedContent = await generateItinerary({
      destination: trip.destination,
      days: trip.days,
      groupType: trip.groupType,
      minBudget: trip.minBudget,
      maxBudget: trip.maxBudget,
      currency: trip.currency,
      pace: trip.pace,
    });
  } catch (error: any) {
    if (
      error?.status === 429 ||
      error?.code === 'rate_limit_exceeded' ||
      error?.message?.includes('Rate limit')
    ) {
      return NextResponse.json(
        { error: 'AI is currently busy. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    if (error.message === 'AI_EMPTY_RESPONSE') {
      return new NextResponse('AI did not respond', { status: 502 });
    }
    if (error.message === 'AI_INVALID_JSON') {
      return new NextResponse('AI returned invalid JSON', { status: 502 });
    }
    if (error.message === 'AI_INVALID_RESPONSE') {
      return new NextResponse('AI returned invalid response', { status: 502 });
    }
    throw error;
  }

  await prisma.itinerary.create({
    data: {
      tripId: trip.id,
      content: enrichedContent,
      generatedByAI: true,
      mapsEnriched: true,
    },
  });

  fetchDestinationImage(trip.destination)
    .then((url) => {
      if (url) {
        return prisma.trip.update({
          where: { id: trip.id },
          data: { coverImageUrl: url },
        });
      }
    })
    .catch(() => {});

  // const trip = await createTrip({
  //   userId,
  //   destination: body.destination,
  //   days: body.days,
  //   groupType: body.groupType,
  //   pace: body.pace,
  //   minBudget: body.minBudget,
  //   maxBudget: body.maxBudget,
  //   currency: body.currency,
  //   title: body.title,
  // });
  return NextResponse.json({ tripId: trip.id });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: { user: { clerkId: userId } },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json(trips);
}
