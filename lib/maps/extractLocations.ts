import { MapLocation } from '@/types/map';

export function extractLocations(itinerary: any): MapLocation[] {
  if (!itinerary?.days) return [];

  const locations: MapLocation[] = [];

  itinerary.days.forEach((day: any) => {
    day.activities.forEach((activity: any, index: number) => {
      if (activity.location) {
        locations.push({
          ...activity.location,
          day: day.day,
          index,
        });
      }
    });
  });

  return locations;
}
