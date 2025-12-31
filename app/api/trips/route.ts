import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();

  const trip = await prisma.trip.create({
    data: {
      user: {
        connect: { clerkId: userId },
      },
      title: body.title ?? 'New Trip',
      destination: body.destination,
      budget: body.budget,
      pace: body.pace,
      itinerary: {
        create: {
          days: {}, // placeholder, AI will fill later
        },
      },
    },
    include: {
      itinerary: true,
    },
  });

  return NextResponse.json(trip);
}
