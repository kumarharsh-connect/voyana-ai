import { geocodePlace } from './geoapify';
import { distanceInKm } from './distance';
import { getDestinationLocation } from './getDestinationLocation';

const MAX_DISTANCE_KM = 50;

export async function enrichItineraryWithMaps(
  itinerary: any,
  destination: string
) {
  const destinationLocation = await getDestinationLocation(destination);

  if (!destinationLocation) {
    // skip map when no geocode
    return itinerary;
  }

  const enrichedDays = [];

  for (const day of itinerary.days) {
    const enrichedActivities = [];

    for (const activity of day.activities) {
      const queries = [
        `${activity.name}, ${destination}`,
        `${activity.name} near ${destination}`,
        `${destination} ${activity.name}`,
      ];

      let acceptedLocation = null;

      for (const query of queries) {
        const location = await geocodePlace(query);

        if (!location) continue;

        const dist = distanceInKm(
          destinationLocation.lat,
          destinationLocation.lng,
          location.lat,
          location.lng
        );

        if (dist <= MAX_DISTANCE_KM) {
          acceptedLocation = location;
          break;
        }
      }

      enrichedActivities.push({
        ...activity,
        location: acceptedLocation,
      });
    }

    enrichedDays.push({
      ...day,
      activities: enrichedActivities,
    });
  }

  return {
    ...itinerary,
    days: enrichedDays,
  };
}
