import { prisma } from '@/lib/prisma';
import { generateItinerary } from '@/lib/ai/generateItinerary';
import { fetchDestinationImage } from '@/lib/images/unsplash';

type CreateTripInput = {
  userId: string;
  destination: string;
  days: number;
  groupType?: string;
  pace?: string;
  minBudget?: number | null;
  maxBudget?: number | null;
  currency?: string;
  title?: string;
};

export async function createTrip(input: CreateTripInput) {
  const {
    userId,
    destination,
    days,
    groupType = 'solo',
    pace = 'balanced',
    minBudget,
    maxBudget,
    currency,
    title,
  } = input;

  const resolvedMinBudget =
    typeof minBudget === 'string' ? Number(minBudget) : (minBudget ?? null);

  const resolvedMaxBudget =
    typeof maxBudget === 'string' ? Number(maxBudget) : (maxBudget ?? null);

  if (
    resolvedMinBudget !== null &&
    resolvedMaxBudget !== null &&
    resolvedMinBudget > resolvedMaxBudget
  ) {
    throw new Error('INVALID_BUDGET_RANGE');
  }

  const resolvedCurrency = currency ?? 'INR';

  const trip = await prisma.trip.create({
    data: {
      user: { connect: { clerkId: userId } },
      title: title ?? `Trip to ${destination}`,
      destination,
      days,
      groupType,
      pace,
      minBudget: resolvedMinBudget,
      maxBudget: resolvedMaxBudget,
      currency: resolvedCurrency,
      status: 'GENERATED',
    },
  });

  const itinerary = await generateItinerary({
    destination,
    days,
    groupType,
    minBudget: resolvedMinBudget,
    maxBudget: resolvedMaxBudget,
    currency: resolvedCurrency,
    pace,
  });

  await prisma.itinerary.create({
    data: {
      tripId: trip.id,
      content: itinerary,
      generatedByAI: true,
      mapsEnriched: true,
    },
  });

  fetchDestinationImage(destination)
    .then((url) => {
      if (url) {
        return prisma.trip.update({
          where: { id: trip.id },
          data: { coverImageUrl: url },
        });
      }
    })
    .catch(() => {});

  return trip;
}
