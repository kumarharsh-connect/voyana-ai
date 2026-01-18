'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, Wallet, Download } from 'lucide-react';
import { formatRelativeTime } from '@/lib/format/time';
import { formatBudget } from '@/lib/format/budget';
import { getGroupTypeLabel, getDestinationInitials } from '@/lib/format/text';
import { getStatusColor } from '@/lib/ui/trip';
import { exportTripPdf } from '@/lib/actions/exportPdf';

type TripCardProps = {
  trip: {
    id: string;
    itinerary: any;
    title: string;
    destination: string;
    status: string;
    coverImageUrl?: string | null;
    days?: number;
    minBudget?: number | null;
    maxBudget?: number | null;
    currency?: string;
    groupType?: string | null;
    updatedAt: Date;
  };
};

export default function TripCard({ trip }: TripCardProps) {
  const budgetText = formatBudget(
    trip.minBudget,
    trip.maxBudget,
    trip.currency,
  );
  const destinationInitials = getDestinationInitials(trip.destination);

  return (
    <div className='group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-primary/5 hover:border-primary/10'>
      {/* Cover Image Container */}
      <div className='relative h-48 w-full overflow-hidden bg-muted'>
        {trip.coverImageUrl ? (
          <img
            src={trip.coverImageUrl}
            alt={trip.destination}
            className='h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:saturate-110'
          />
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-primary/10 via-secondary/10 to-primary/5'>
            <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary font-bold text-2xl shadow-inner'>
              {destinationInitials}
            </div>
            <span className='mt-3 text-sm font-medium text-muted-foreground'>
              {trip.destination}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-sm ${getStatusColor(trip.status)}`}
        >
          {trip.status.charAt(0) + trip.status.slice(1).toLowerCase()}
        </span>
      </div>

      {/* Content Section */}
      <div className='flex flex-1 flex-col justify-between p-5 space-y-4'>
        <div className='space-y-3'>
          {/* Title and Destination */}
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

          {/* Trip Metadata */}
          <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
            {trip.days && (
              <div className='flex items-center gap-1'>
                <Calendar className='h-3.5 w-3.5' />
                <span>
                  {trip.days} {trip.days === 1 ? 'day' : 'days'}
                </span>
              </div>
            )}

            {trip.groupType && (
              <div className='flex items-center gap-1'>
                <Users className='h-3.5 w-3.5' />
                <span>{getGroupTypeLabel(trip.groupType)}</span>
              </div>
            )}

            {budgetText && (
              <div className='flex items-center gap-1'>
                <Wallet className='h-3.5 w-3.5' />
                <span className='line-clamp-1'>{budgetText}</span>
              </div>
            )}
          </div>

          {/* Last Updated */}
          <div className='text-xs text-muted-foreground/70'>
            Updated {formatRelativeTime(new Date(trip.updatedAt))}
          </div>
        </div>

        {/* Action Buttons Container */}
        <div className='flex gap-2 pt-2 border-t border-border/50'>
          <Link href={`/trips/${trip.id}`} className='flex-1' tabIndex={-1}>
            <Button
              variant='secondary'
              className='w-full rounded-xl bg-linear-to-b from-primary to-secondary shadow-sm font-semibold transition-transform active:scale-95'
            >
              Continue
            </Button>
          </Link>

          {trip.status === 'GENERATED' && trip.itinerary?.mapsEnriched && (
            <Button
              variant='secondary'
              size='icon'
              className='rounded-xl border-primary border bg-white text-primary hover:bg-primary/10 font-medium transition-transform active:scale-95'
              title='Export PDF'
              onClick={() => {
                exportTripPdf({
                  tripId: trip.id,
                  destination: trip.destination,
                });
              }}
            >
              <Download className='h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
