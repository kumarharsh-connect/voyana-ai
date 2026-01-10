import { TripStatus } from '@prisma/client';

export function assertTripCanGenerate(status: TripStatus) {
  if (status !== 'DRAFT') {
    throw new Error('INVALID_TRIP_STATE');
  }
}
