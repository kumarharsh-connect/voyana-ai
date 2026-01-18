import ItineraryDay from './ItineraryDay';

export default function ItineraryTimeline({
  itinerary,
  onSelectedLocation,
}: {
  itinerary?: { days?: any[] };
  onSelectedLocation: (loc: any) => void;
}) {
  if (!itinerary?.days?.length) {
    return (
      <p className='text-muted-foreground'>No itinerary days available yet.</p>
    );
  }

  return (
    <div className='space-y-10'>
      {itinerary.days.map((day) => (
        <ItineraryDay
          key={day.day}
          day={day}
          onSelectedLocation={onSelectedLocation}
        />
      ))}
    </div>
  );
}
