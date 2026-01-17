'use client';

import { useState } from 'react';
import TripHeader from './TripHeader';
import ItineraryTimeline from './ItineraryTimeline';
import MapPanel from './MapPanel';
import AIAssistant from './AIAssistant';

export default function TripClient({ tripId, trip, initialItinerary }: any) {
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [mapsLoading, setMapsLoading] = useState(false);

  const enrichMaps = async () => {
    if (!itinerary || trip.itinerary?.mapsEnriched) return;

    setMapsLoading(true);
    const res = await fetch(`/api/trips/${tripId}/maps`, { method: 'POST' });
    if (res.ok) {
      const updated = await res.json();
      setItinerary(updated.content);
    }
    setMapsLoading(false);
  };

  return (
    <>
      <TripHeader
        trip={trip}
        onEnrichMaps={enrichMaps}
        mapsLoading={mapsLoading}
      />

      <div className='max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10 px-6 py-10'>
        <ItineraryTimeline itinerary={itinerary} />
        <MapPanel itinerary={itinerary} />
      </div>

      <AIAssistant tripId={tripId} onItineraryUpdate={setItinerary} />
    </>
  );
}
