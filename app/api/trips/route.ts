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
      budget: body.budget ?? null,
      pace: body.pace ?? null,
      groupSize: body.groupSize ?? null,
      groupType: body.groupType ?? null,
      status: 'DRAFT',
    },
  });

  return NextResponse.json(trip);
}

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: {
      user: { clerkId: userId },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return NextResponse.json(trips);
}
