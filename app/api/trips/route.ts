import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();

  const {
    destination,
    days,
    groupType,
    pace,
    minBudget,
    maxBudget,
    currency = 'INR',
  } = body;

  // REQUIRED FIELDS
  if (!destination || !days || !groupType) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  const trip = await prisma.trip.create({
    data: {
      user: { connect: { clerkId: userId } },
      title: `Trip to ${destination}`,
      destination,
      days,
      groupType,
      pace: pace ?? 'balanced',
      minBudget: minBudget ?? null,
      maxBudget: maxBudget ?? null,
      currency,
      status: 'DRAFT',
    },
  });

  return NextResponse.json({ tripId: trip.id });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const trips = await prisma.trip.findMany({
    where: { user: { clerkId: userId } },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json(trips);
}
