'use client';
import dynamic from 'next/dynamic';
import { extractLocations } from '@/lib/maps/extractLocations';
import { MapLocation } from '@/types/map';

const ItineraryMap = dynamic(() => import('./ItineraryMap'), {
  ssr: false,
});

export default function MapPanel({
  itinerary,
  focusLocation,
}: {
  itinerary: any;
  focusLocation?: MapLocation;
}) {
  const locations = extractLocations(itinerary);

  return (
    <aside className='sticky top-24 h-[calc(100vh-6rem)] rounded-2xl border border-border bg-background overflow-hidden'>
      <ItineraryMap locations={locations} focus={focusLocation} />
    </aside>
  );
}
