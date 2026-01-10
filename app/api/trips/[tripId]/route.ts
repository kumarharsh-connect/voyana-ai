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
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (error.message === 'TRIP_NOT_FOUND') {
      return new NextResponse('Trip not found', { status: 404 });
    }

    return new NextResponse('Server error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const trip = await getAuthorizedTrip(tripId);

    await prisma.trip.delete({
      where: { id: trip.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (error.message === 'TRIP_NOT_FOUND') {
      return new NextResponse('Trip not found', { status: 404 });
    }

    return new NextResponse('Server error', { status: 500 });
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

    if (typeof body.groupSize === 'number') {
      data.groupSize = body.groupSize;
    }
    if (typeof body.groupType === 'string') {
      data.groupType = body.groupType;
    }
    if (Object.keys(data).length === 0) {
      return new NextResponse('No valid fields to update', { status: 400 });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: trip.id },
      data,
    });

    return NextResponse.json(updatedTrip);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (error.message === 'TRIP_NOT_FOUND') {
      return new NextResponse('Trip not found', { status: 404 });
    }

    return new NextResponse('Server error', { status: 500 });
  }
}
