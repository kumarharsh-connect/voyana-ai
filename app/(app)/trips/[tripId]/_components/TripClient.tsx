'use client';

import { useState } from 'react';
import TripHeader from './TripHeader';
import ItineraryTimeline from './ItineraryTimeline';
import MapPanel from './MapPanel';
import AIAssistant from './AIAssistant';
import { MapLocation } from '@/types/map';

export interface Message {
  role: 'USER' | 'ASSISTANT';
  content: string;
}

export default function TripClient({
  tripId,
  trip,
  initialItinerary,
  initialMessages,
}: {
  tripId: string;
  trip: any;
  initialItinerary: any | null;
  initialMessages: Message[];
}) {
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [focusLocation, setFocusLocation] = useState<MapLocation | undefined>();

  return (
    <>
      <TripHeader trip={trip} />

      <div className='max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 px-6 py-12'>
        <ItineraryTimeline
          itinerary={itinerary}
          onSelectedLocation={setFocusLocation}
        />
        <MapPanel itinerary={itinerary} focusLocation={focusLocation} />
      </div>

      <AIAssistant
        tripId={tripId}
        messages={messages}
        setMessages={setMessages}
        onItineraryUpdate={setItinerary}
      />
    </>
  );
}
