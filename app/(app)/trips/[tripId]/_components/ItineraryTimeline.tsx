import ItineraryDay from './ItineraryDay';

type Props = {
  itinerary?: {
    days?: any[];
  };
};

export default function ItineraryTimeline({ itinerary }: Props) {
  if (!itinerary?.days?.length) {
    return (
      <p className='text-muted-foreground'>No itinerary days available yet.</p>
    );
  }

  return (
    <div>
      {itinerary.days.map((day) => (
        <ItineraryDay key={day.day} day={day} />
      ))}
    </div>
  );
}
