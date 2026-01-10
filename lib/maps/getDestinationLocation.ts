import { geocodePlace } from './geoapify';

export async function getDestinationLocation(destination: string) {
  return geocodePlace(destination);
}
