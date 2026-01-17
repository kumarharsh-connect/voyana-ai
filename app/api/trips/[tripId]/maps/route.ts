import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { enrichItineraryWithMaps } from '@/lib/maps/enrichItineraryWithMaps';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);

    if (trip.status !== 'GENERATED') {
      return new NextResponse('Trip not generated', { status: 409 });
    }

    if (!trip.itinerary) {
      return new NextResponse('Itinerary not found', { status: 404 });
    }

    if (trip.itinerary.mapsEnriched) {
      return NextResponse.json(trip.itinerary);
    }

    const enrichedContent = await enrichItineraryWithMaps(
      trip.itinerary.content,
      trip.destination
    );

    const updated = await prisma.itinerary.update({
      where: { tripId: trip.id },
      data: {
        content: enrichedContent,
        mapsEnriched: true,
      },
    });

    return NextResponse.json({
      content: updated.content,
    });
  } catch (error) {
    console.error('MAPS ENRICH ERROR:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}
