export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TripClient from './_components/TripClient';

export default async function TripPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { itinerary: true },
  });

  if (!trip) notFound();

  return (
    <TripClient
      tripId={trip.id}
      trip={trip}
      initialItinerary={trip.itinerary?.content ?? null}
    />
  );
}
