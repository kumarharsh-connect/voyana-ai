import ActivityItem from './ActivityItem';

export default function ItineraryDay({
  day,
  onSelectedLocation,
}: {
  day: any;
  onSelectedLocation: (loc: any) => void;
}) {
  return (
    <section>
      <h2 className='mb-8 font-heading text-2xl font-semibold tracking-tight'>
        Day {day.day}
      </h2>

      <div className='relative pl-8 border-l-2 border-border/60 space-y-8'>
        {day.activities.map((activity: any, idx: number) => (
          <ActivityItem
            key={idx}
            activity={activity}
            onClick={() => {
              if (!activity.location?.lat || !activity.location?.lng) return;

              onSelectedLocation({
                ...activity.location,
                day: day.day,
                index: idx,
              });
            }}
          />
        ))}
      </div>
    </section>
  );
}
