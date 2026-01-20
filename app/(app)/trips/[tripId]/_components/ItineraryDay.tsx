import ActivityItem from './ActivityItem';

const TIME_ORDER = ['morning', 'afternoon', 'evening'];

export default function ItineraryDay({
  day,
  onSelectedLocation,
}: {
  day: any;
  onSelectedLocation: (loc: any) => void;
}) {
  const hasTimeBlocks = day.activities.some(
    (a: any) =>
      a.timeBlock === 'morning' ||
      a.timeBlock === 'afternoon' ||
      a.timeBlock === 'evening',
  );

  const activitiesByTime = hasTimeBlocks
    ? TIME_ORDER.map((block) => ({
        block,
        label: day.dayTimeBlocks?.[block],
        activities: day.activities.filter((a: any) => a.timeBlock === block),
      })).filter((g) => g.activities.length > 0)
    : [];

  return (
    <section className='space-y-6'>
      <h2 className='font-heading text-4xl font-semibold tracking-tight'>
        Day {day.day}
      </h2>

      {/* Local Tip */}
      {day.localTip && (
        <div className='rounded-xl border border-border bg-muted/40 p-4 text-sm'>
          <span className='font-medium text-primary'>Local tip:</span>{' '}
          {day.localTip}
        </div>
      )}
      {/* Timeline */}
      <div className='space-y-10'>
        {hasTimeBlocks ? (
          activitiesByTime.map(({ block, label, activities }) => (
            <div key={block}>
              <div className='mb-4 flex items-center gap-3'>
                <h3 className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
                  {block}
                </h3>
                {label && (
                  <span className='text-xs text-muted-foreground'>{label}</span>
                )}
              </div>

              <div className='relative pl-8 border-l-2 border-border/60 space-y-8'>
                {activities.map((activity: any, idx: number) => (
                  <ActivityItem
                    key={idx}
                    activity={activity}
                    onClick={() => {
                      if (!activity.location?.lat) return;
                      onSelectedLocation({
                        ...activity.location,
                        day: day.day,
                        index: idx,
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className='relative pl-8 border-l-2 border-border/60 space-y-8'>
            {day.activities.map((activity: any, idx: number) => (
              <ActivityItem
                key={idx}
                activity={activity}
                onClick={() => {
                  if (!activity.location?.lat) return;
                  onSelectedLocation({
                    ...activity.location,
                    day: day.day,
                    index: idx,
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
