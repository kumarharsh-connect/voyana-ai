'use client';

import { useState } from 'react';
import TripHeader from './TripHeader';
import ItineraryTimeline from './ItineraryTimeline';
import MapPanel from './MapPanel';
import AIAssistant from './AIAssistant';

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

  return (
    <>
      <TripHeader trip={trip} />

      <div className='max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10 px-6 py-10'>
        <ItineraryTimeline itinerary={itinerary} />
        <MapPanel itinerary={itinerary} />
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
