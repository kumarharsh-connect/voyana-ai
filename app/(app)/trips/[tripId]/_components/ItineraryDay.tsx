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
      <h2 className='mb-6 font-heading text-2xl font-semibold'>
        Day {day.day}
      </h2>

      <div className='relative pl-6 border-l border-border space-y-6'>
        {day.activities.map((activity: any, idx: number) => (
          <ActivityItem
            key={idx}
            activity={activity}
            onClick={() => {
              if (!activity.location) return;

              onSelectedLocation({
                ...activity.location({
                  day: day.day,
                  index: idx,
                }),
              });
            }}
          />
        ))}
      </div>
    </section>
  );
}
