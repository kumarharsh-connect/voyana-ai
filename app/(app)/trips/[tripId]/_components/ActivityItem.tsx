import { Clock, MapPin } from 'lucide-react';

export default function ActivityItem({ activity }: { activity: any }) {
  return (
    <div className='relative'>
      <span className='absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-primary' />

      <div className='space-y-1'>
        <h3 className='font-semibold'>{activity.name}</h3>

        {activity.time && (
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Clock className='h-3.5 w-3.5' />
            {activity.time}
          </div>
        )}

        {activity.description && (
          <p className='text-sm text-muted-foreground leading-relaxed'>
            {activity.description}
          </p>
        )}
        {activity.location && (
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <MapPin className='h-3.5 w-3.5' />
            {activity.location.address}
          </div>
        )}
      </div>
    </div>
  );
}
