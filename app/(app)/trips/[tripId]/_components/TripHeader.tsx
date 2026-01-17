import { MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TripHeader({
  trip,
  onEnrichMaps,
  mapsLoading,
}: {
  trip: any;
  onEnrichMaps: () => void;
  mapsLoading: boolean;
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

          {trip.status === 'GENERATED' && (
            <div className='flex items-center gap-3'>
              <Button
                variant='secondary'
                onClick={onEnrichMaps}
                disabled={mapsLoading || trip.itinerary?.mapsEnriched}
              >
                <MapPin className='h-4 w-4 mr-2' />
                {mapsLoading ? 'Loading Maps...' : 'Enable Map View'}
              </Button>

              <Button
                variant='secondary'
                disabled={!trip.itinerary.mapsEnriched}
              >
                <Download className='h-4 w-4 mr-2' />
                Export PDF
              </Button>
            </div>
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
