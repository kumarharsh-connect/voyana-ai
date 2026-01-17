export const dynamic = 'force-dynamic';

import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { notFound } from 'next/navigation';
import TripClient from './_components/TripClient';

export default async function TripPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  
  let trip;
  try {
    trip = await getAuthorizedTrip(tripId);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'TRIP_NOT_FOUND') {
      notFound();
    }
    throw error;
  }

  const initialMessages = trip.messages
    .filter((msg) => msg.role !== 'SYSTEM')
    .map((msg) => ({
      role: msg.role as 'USER' | 'ASSISTANT',
      content: msg.content,
    }));

  return (
    <TripClient
      tripId={trip.id}
      trip={trip}
      initialItinerary={trip.itinerary?.content ?? null}
      initialMessages={initialMessages}
    />
  );
}
