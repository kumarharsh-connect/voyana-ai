import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Download, Calendar, Users, Wallet } from 'lucide-react';
import { formatBudget } from '@/lib/format/budget';
import { getDestinationInitials } from '@/lib/format/text';
import { getStatusColor } from '@/lib/ui/trip';
import { exportTripPdf } from '@/lib/actions/exportPdf';

export default function TripHeader({ trip }: { trip: any }) {
  const budgetText = formatBudget(
    trip.minBudget,
    trip.maxBudget,
    trip.currency,
  );
  const initials = getDestinationInitials(trip.destination);

  const [exporting, setExporting] = useState(false);

  const handleExportPdf = async () => {
    exportTripPdf({
      tripId: trip.id,
      destination: trip.destination,
      onStart: () => setExporting(true),
      onFinish: () => setExporting(false),
      onError: () => {
        alert('Failed to export PDF. Please try again.');
      },
    });
  };

  return (
    <header className='relative border-b border-border bg-background/70 backdrop-blur-md'>
      {/* Cover */}
      <div className='relative h-56 md:h-72 overflow-hidden'>
        {trip.coverImageUrl ? (
          <img
            src={trip.coverImageUrl}
            alt={trip.destination}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 via-secondary/10 to-primary/5'>
            <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 text-primary font-bold text-3xl shadow-inner'>
              {initials}
            </div>
          </div>
        )}

        <div className='absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent' />

        {/* Status badge */}
        <span
          className={`absolute top-6 right-6 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur ${getStatusColor(trip.status)}`}
        >
          {trip.status}
        </span>
      </div>

      {/* Content */}
      <div className='-mt-16 relative z-10 max-w-7xl mx-auto px-6'>
        <div className='rounded-2xl border border-border bg-background/95 backdrop-blur px-6 py-7 space-y-5 shadow-sm'>
          {/* Title */}
          <div>
            <h1 className='font-heading text-3xl md:text-4xl font-bold tracking-tight leading-relaxed'>
              {trip.title}
            </h1>
            <div className='mt-2 flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4 text-primary/70' />
              {trip.destination}
            </div>
          </div>

          {/* Metadata row  */}
          <div className='flex flex-wrap items-center gap-5 text-sm text-muted-foreground '>
            {trip.days && (
              <div className='flex items-center gap-1.5'>
                <Calendar className='h-4 w-4' />
                <span>
                  {trip.days} {trip.days === 1 ? 'day' : 'days'}
                </span>
              </div>
            )}

            {trip.groupType && (
              <div className='flex items-center gap-1.5'>
                <Users className='h-4 w-4' />
                <span className='capitalize'>{trip.groupType}</span>
              </div>
            )}

            {budgetText && (
              <div className='flex items-center gap-1.5'>
                <Wallet className='h-4 w-4' />
                <span>{budgetText}</span>
              </div>
            )}
          </div>

          {/* Overview */}
          {trip.itinerary?.content?.overview?.summary && (
            <p className='max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed'>
              {trip.itinerary.content.overview.summary}
            </p>
          )}

          {/* Actions */}
          <div className='flex flex-wrap items-center gap-3 pt-4 border-t border-border/60'>
            <Link href={`/api/trips/${trip.id}`} tabIndex={-1}>
              <Button className='rounded-xl px-6 font-semibold shadow-sm active:scale-95 hover:shadow-md transition-all'>
                Continue Planning{' '}
              </Button>
            </Link>

            {trip.status === 'GENERATED' && trip.itinerary && (
              <Button
                variant='secondary'
                disabled={exporting}
                onClick={handleExportPdf}
                className='rounded-xl border-primary/50 text-background hover:bg-primary/30 hover:text-primary/50 hover:border-2'
              >
                <Download className='h-4 w-4 mr-2' />
                {exporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
