'use client';
import { useState } from 'react';
import TripHeader from './TripHeader';
import ItineraryTimeline from './ItineraryTimeline';
import MapPanel from './MapPanel';
import AIAssistant from './AIAssistant';
import DraftEmptyState from './DraftEmptyState';

export default function TripClient({
  tripId,
  trip,
  initialItinerary,
}: {
  tripId: string;
  trip: any;
  initialItinerary: any | null;
}) {
  const [itinerary, setItinerary] = useState(initialItinerary);

  const isDraft = trip.status === 'DRAFT';

  // if (!itinerary) return null;

  return (
    <div className='relative'>
      <TripHeader trip={trip} />

      {isDraft ? (
        <DraftEmptyState tripId={tripId} />
      ) : (
        <>
          <div className='mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10'>
            <ItineraryTimeline itinerary={itinerary} />
            <MapPanel itinerary={itinerary} />
          </div>

          <AIAssistant tripId={tripId} onItineraryUpdate={setItinerary} />
        </>
      )}
    </div>
  );
}
