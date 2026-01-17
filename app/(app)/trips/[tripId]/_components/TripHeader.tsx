import { MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TripHeader({
  trip,
}: {
  trip: any;
}) {
  return (
    <header className='border-b border-border bg-background/80 backdrop-blur'>
      <div className='max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-6'>
          <div>
            <h1 className='font-heading text-4xl font-bold'>{trip.title}</h1>

            <div className='mt-2 flex items-center gap-2 text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              {trip.destination}
            </div>
          </div>

          {trip.status === 'GENERATED' && trip.itinerary && (
            <Link href={`/api/trips/${trip.id}/export/pdf`} tabIndex={-1}>
              <Button variant='secondary'>
                <Download className='h-4 w-4 mr-2' />
                Export PDF
              </Button>
            </Link>
          )}
        </div>

        {trip.itinerary?.content?.overview?.summary && (
          <p className='max-w-3xl text-muted-foreground leading-relaxed'>
            {trip.itinerary.content.overview.summary}
          </p>
        )}
      </div>
    </header>
  );
}
