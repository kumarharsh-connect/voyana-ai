import { TripStatus } from '@prisma/client';

export function assertTripCanChat(status: TripStatus) {
  if (status !== 'GENERATED') {
    throw new Error('CHAT_NOT_ALLOWED');
  }
}
