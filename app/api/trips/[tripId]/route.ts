import { NextResponse } from 'next/server';
import { getAuthorizedTrip } from '@/lib/guards/tripGuard';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);
    return NextResponse.json(trip);
  } catch {
    return new NextResponse('Trip not found', { status: 404 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);
    await prisma.trip.delete({ where: { id: trip.id } });
    return NextResponse.json({ success: true });
  } catch {
    return new NextResponse('Trip not found', { status: 404 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);
    const body = await req.json();

    const data: any = {};

    if (typeof body.pace === 'string') data.pace = body.pace;
    if (typeof body.minBudget === 'number') data.minBudget = body.minBudget;
    if (typeof body.maxBudget === 'number') data.maxBudget = body.maxBudget;

    if (!Object.keys(data).length) {
      return new NextResponse('No valid fields', { status: 400 });
    }

    const updated = await prisma.trip.update({
      where: { id: trip.id },
      data,
    });

    return NextResponse.json(updated);
  } catch {
    return new NextResponse('Update failed', { status: 500 });
  }
}
