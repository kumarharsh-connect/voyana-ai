import { parseTripIntent } from '@/lib/intent/parseTripIntent';
import { createTrip } from '@/lib/trips/createTrip';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { mode: 'ERROR', message: 'UNAUTHORIZED' },
      { status: 401 },
    );
  }

  const { input } = await req.json();
  if (!input || typeof input !== 'string') {
    return NextResponse.json(
      { mode: 'ERROR', message: 'Invalid input' },
      { status: 401 },
    );
  }
  const intent = parseTripIntent(input);

  // case 1: enough info
  if (intent.confidence === 'high' && intent.destination && intent.days) {
    const trip = await createTrip({
      userId,
      destination: intent.destination,
      days: intent.days,
      groupType: intent.groupType ?? 'solo',
    });

    return NextResponse.json({ mode: 'GENERATED', tripId: trip.id });
  }

  // case 2: partial input
  if (intent.destination) {
    return NextResponse.json({
      mode: 'CREATE',
      redirect: `/trips/create?destination=${encodeURIComponent(intent.destination)}`,
    });
  }

  // case 3: not understandable
  return NextResponse.json(
    { mode: 'ERROR', message: 'Could not understand input' },
    { status: 400 },
  );
}
