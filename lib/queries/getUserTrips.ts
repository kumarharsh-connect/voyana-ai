import { prisma } from '@/lib/prisma';

export async function getUserTrips(clerkUserId: string) {
  return prisma.trip.findMany({
    where: {
      user: {
        clerkId: clerkUserId,
      },
    },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      destination: true,
      status: true,
      coverImageUrl: true,
      minBudget: true,
      maxBudget: true,
      groupType: true,
      days: true,
      currency: true,
      updatedAt: true,
      createdAt: true,
      itinerary: {
        select: {
          content: true,
          mapsEnriched: true,
        },
      },
    },
  });
}
