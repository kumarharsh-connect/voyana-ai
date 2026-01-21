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

  try {
    let coverImageUrl: string | undefined;
    try {
      coverImageUrl = await fetchDestinationImage(body.destination);
    } catch (imageError) {
      console.warn('Failed to fetch destination image:', imageError);
    }

    const trip = await prisma.trip.create({
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
        coverImageUrl,
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
        currency: trip.currency || 'INR',
        pace: trip.pace,
      });
    } catch (aiError: any) {
      await prisma.trip.update({
        where: { id: trip.id },
        data: { status: 'DRAFT' },
      });
      throw aiError;
    }

    const result = await prisma.$transaction(async (tx) => {
      const itinerary = await tx.itinerary.create({
        data: {
          tripId: trip.id,
          content: enrichedContent,
          generatedByAI: true,
          mapsEnriched: true,
        },
      });

      await tx.trip.update({
        where: { id: trip.id },
        data: { status: 'GENERATED' },
      });

      return itinerary;
    });

    return NextResponse.json({ tripId: trip.id });
  } catch (error: any) {
    console.error('Error in trip generation flow:', error);

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

    const aiErrors: Record<string, string> = {
      AI_EMPTY_RESPONSE: 'AI did not respond',
      AI_INVALID_JSON: 'AI returned invalid JSON',
      AI_INVALID_RESPONSE: 'AI returned invalid response',
    };

    if (aiErrors[error.message]) {
      return new NextResponse(aiErrors[error.message], { status: 502 });
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
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
