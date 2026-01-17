import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchDestinationImage } from '@/lib/images/unsplash';

import { generateItinerary } from '@/lib/ai/generateItinerary';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);

    // Generate itinerary with AI and enrich with maps
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

    // Update or create itinerary
    await prisma.itinerary.upsert({
      where: { tripId: trip.id },
      update: {
        content: enrichedContent,
        mapsEnriched: true,
        generatedByAI: true,
      },
      create: {
        tripId: trip.id,
        content: enrichedContent,
        generatedByAI: true,
        mapsEnriched: true,
      },
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

    return NextResponse.json({ itinerary: enrichedContent });
  } catch (e) {
    console.error(e);
    return new NextResponse('Generation failed', { status: 500 });
  }
}
