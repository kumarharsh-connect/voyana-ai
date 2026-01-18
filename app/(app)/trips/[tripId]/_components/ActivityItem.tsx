import { Clock, MapPin } from 'lucide-react';

export default function ActivityItem({
  activity,
  onClick,
}: {
  activity: any;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className='group relative cursor-pointer rounded-xl p-4 transition hover:bg-muted/40 hover:shadow-sm active:scale-[0.99]'
    >
      <span className='absolute -left-[11px] top-5 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background' />

      <div className='space-y-1'>
        <h3 className='font-semibold group-hover:text-primary transition'>
          {activity.name}
        </h3>

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
