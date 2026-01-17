import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, ImageOff } from 'lucide-react';

type TripCardProps = {
  trip: {
    id: string;
    itinerary: any;
    title: string;
    destination: string;
    status: string;
    coverImageUrl?: string | null;
  };
};

export default function TripCard({ trip }: TripCardProps) {
  return (
    <div className='group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-primary/5 hover:border-primary/10'>
      {/* Cover Image Container */}
      <div className='relative h-48 w-full overflow-hidden bg-muted'>
        {trip.coverImageUrl ? (
          <img
            src={trip.coverImageUrl}
            alt={trip.destination}
            className='object-cover transition-all duration-500 group-hover:scale-105 group-hover:saturate-110'
          />
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-muted/50 to-muted text-muted-foreground/70'>
            <ImageOff className='h-10 w-10 mb-2 opacity-50' />
            <span className='text-sm font-medium'>No image</span>
          </div>
        )}

        <span className='absolute top-3 right-3 inline-flex items-center rounded-full border border-white/10 bg-white/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md shadow-sm'>
          {trip.status.toUpperCase().replace('_', ' ')}{' '}
        </span>
      </div>

      {/* Content Section */}
      <div className='flex flex-1 flex-col justify-between p-5 space-y-4'>
        <div>
          <h3
            className='font-bold text-xl font-heading leading-snug text-card-foreground line-clamp-1'
            title={trip.title}
          >
            {trip.title}
          </h3>
          <div className='mt-1.5 flex items-center text-sm text-muted-foreground'>
            <MapPin className='h-3.5 w-3.5 mr-1 text-primary/70' />
            <p className='line-clamp-1'>{trip.destination}</p>
          </div>
        </div>

        {/* Action Buttons Container */}
        <div className='flex gap-2 pt-1'>
          <Link href={`/trips/${trip.id}`} className='flex-1' tabIndex={-1}>
            <Button
              variant='secondary'
              className='w-full rounded-xl bg-linear-to-b from-primary to-secondary shadow-sm font-semibold transition-transform active:scale-95'
            >
              Continue
            </Button>
          </Link>

          {trip.status === 'GENERATED' && trip.itinerary?.mapsEnriched && (
            <Link href={`/api/trips/${trip.id}/export/pdf`} tabIndex={-1}>
              <Button
                variant='secondary'
                className='rounded-xl border-primary border bg-white text-primary hover:bg-primary/10 font-medium transition-transform active:scale-95'
              >
                PDF
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
