import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
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

  // Rate limiting check
  const { success } = await rateLimiter.limit(identifier);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await req.json();

  if (!body.destination || !body.days) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  let coverImageUrl: string | undefined;

  try {
    const [imageUrl, enrichedContent] = await Promise.all([
      fetchDestinationImage(body.destination).catch((err) => {
        console.warn('Image fetch failed', err);
        return undefined;
      }),
      generateItinerary({
        destination: body.destination,
        days: body.days,
        groupType: body.groupType ?? 'solo',
        minBudget: body.minBudget,
        maxBudget: body.maxBudget,
        currency: body.currency || 'USD',
        pace: body.pace ?? 'balanced',
      }),
    ]);

    coverImageUrl = imageUrl;
    const result = await prisma.$transaction(async (tx) => {
      // Create the Trip
      const trip = await tx.trip.create({
        data: {
          user: { connect: { clerkId: userId } },
          title: body.title ?? `Trip to ${body.destination}`,
          destination: body.destination,
          days: body.days,
          groupType: body.groupType ?? 'solo',
          pace: body.pace ?? 'balanced',
          minBudget: body.minBudget,
          maxBudget: body.maxBudget,
          status: 'GENERATED',
          coverImageUrl: coverImageUrl,
        },
      });

      const itinerary = await tx.itinerary.create({
        data: {
          tripId: trip.id,
          content: enrichedContent,
          generatedByAI: true,
          mapsEnriched: true,
        },
      });

      return { trip, itinerary };
    });

    return NextResponse.json({ tripId: result.trip.id });
  } catch (error: any) {
    console.error('Error in trip generation flow:', error);

    // AI Rate Limit Handling
    if (
      error?.status === 429 ||
      error?.code === 'rate_limit_exceeded' ||
      error?.message?.includes('rate limit')
    ) {
      let retryMinutes = 1;
      const minutesMatch = error?.message?.match(/(\d+)\s*minutes?/i);
      if (minutesMatch) retryMinutes = parseInt(minutesMatch[1]);

      return NextResponse.json(
        {
          error: `AI is rate-limited. Try again after ${retryMinutes}m.`,
          retryAfter: retryMinutes,
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate trip. Please try again.' },
      { status: 500 },
    );
  }
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
