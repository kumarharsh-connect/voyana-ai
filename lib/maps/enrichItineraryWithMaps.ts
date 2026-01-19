import { geocodePlace } from './geoapify';
import { distanceInKm } from './distance';
const MAX_DISTANCE_KM = 50;

export async function enrichItineraryWithMaps(
  itinerary: any,
  destination: string,
) {
  const normalized = itinerary?.normalized ?? itinerary;

  if (!Array.isArray(normalized?.days)) {
    console.warn('[Maps] Invalid normalized shape, skipping');
    return normalized;
  }

  const destinationLocation = await geocodePlace(destination);

  if (!destinationLocation) {
    // skip map when no geocode
    return normalized;
  }

  const enrichedDays = [];

  for (const day of normalized.days) {
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
          location.lng,
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
    ...normalized,
    days: enrichedDays,
  };
}
