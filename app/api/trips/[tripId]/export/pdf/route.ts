import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { buildItineraryPdf } from '@/lib/pdf/buildItineraryPdf';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> },
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);

    if (!trip.itinerary) {
      return new NextResponse('Itinerary not found', { status: 404 });
    }

    const pdfBytes = await buildItineraryPdf({
      destination: trip.destination,
      itinerary: trip.itinerary.content,
    });

    // mark export time
    await prisma.itinerary.update({
      where: { tripId: trip.id },
      data: { pdfExportedAt: new Date() },
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${trip.destination}-itinerary.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF EXPORT ERROR:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}
