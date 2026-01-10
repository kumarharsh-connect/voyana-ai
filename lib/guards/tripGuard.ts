import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function getAuthorizedTrip(tripId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('UNAUTHORIZED');
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      user: {
        clerkId: userId,
      },
    },

    include: {
      itinerary: true,
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!trip) {
    throw new Error('TRIP_NOT_FOUND');
  }

  return trip;
}
