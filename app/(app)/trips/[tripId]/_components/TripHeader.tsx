import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  MapPin,
  Download,
  Calendar,
  Users,
  Wallet,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';

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
        alert('Failed to export PDF.');
      },
    });
  };

  return (
    <header className='relative bg-background group'>
      {/* --- HERO SECTION --- */}
      <div className='relative h-64 md:h-88 w-full overflow-hidden'>
        {trip.coverImageUrl ? (
          <img
            src={trip.coverImageUrl}
            alt={trip.destination}
            className='h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5'>
            <div className='flex h-24 w-24 items-center justify-center rounded-3xl bg-background/50 backdrop-blur-md border border-white/20 text-primary font-bold text-4xl shadow-xl'>
              {initials}
            </div>
          </div>
        )}

        <div className='absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-90' />

        <div className='absolute top-6 left-0 right-0 px-6 max-w-7xl mx-auto flex items-center justify-between z-20'>
          <Link
            href='/trips'
            className='flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-md border border-white/20 text-sm font-medium hover:bg-background/90 transition-colors'
          >
            <ChevronLeft className='h-4 w-4' />
            Back to trips
          </Link>

          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border shadow-sm ${getStatusColor(trip.status)}`}
          >
            {trip.status}
          </span>
        </div>
      </div>

      <div className='relative z-10 -mt-24 max-w-7xl mx-auto px-4 sm:px-6 pb-12'>
        <div className='rounded-3xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-12'>
            {/* LEFT COLUMN */}
            <div className='p-6 md:p-10 lg:col-span-7 flex flex-col justify-center space-y-6'>
              {/* Title Block */}
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-primary font-bold tracking-wide text-xs uppercase'>
                  <MapPin className='h-3.5 w-3.5' />
                  {trip.destination}
                </div>
                <h1 className='font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground'>
                  {trip.title}
                </h1>
              </div>

              {/* Summary Text */}
              {trip.itinerary?.content?.overview?.summary && (
                <p className='text-base md:text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4'>
                  {trip.itinerary.content.overview.summary}
                </p>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className='bg-muted/30 border-t lg:border-t-0 lg:border-l border-border/60 lg:col-span-5 p-6 md:p-10 flex flex-col justify-between gap-8'>
              {/* Stats Grid */}
              <div className='grid grid-cols-2 gap-4'>
                {/* Duration */}
                <div className='bg-background rounded-2xl p-4 border border-border shadow-sm'>
                  <div className='flex items-center gap-2 text-muted-foreground mb-2'>
                    <Calendar className='h-4 w-4 text-primary' />
                    <span className='text-xs font-semibold uppercase'>
                      Duration
                    </span>
                  </div>
                  <div className='font-heading text-xl font-extrabold'>
                    {trip.days}{' '}
                    <span className='text-lg font-semibold text-foreground'>
                      Days
                    </span>
                  </div>
                </div>

                {/* Travelers */}
                <div className='bg-background rounded-2xl p-4 border border-border shadow-sm'>
                  <div className='flex items-center gap-2 text-muted-foreground mb-2'>
                    <Users className='h-4 w-4 text-primary' />
                    <span className='text-xs font-semibold uppercase'>
                      Group
                    </span>
                  </div>
                  <div className='font-heading text-xl font-bold capitalize'>
                    {trip.groupType || 'Solo'}
                  </div>
                </div>

                {/* Budget */}
                <div className='col-span-2 bg-background rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Wallet className='h-4 w-4 text-primary' />
                    <span className='text-xs font-semibold uppercase'>
                      Est. Budget
                    </span>
                  </div>
                  <div className='font-heading text-xl font-bold text-foreground'>
                    {budgetText || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Actions Area */}
              <div className='flex flex-col gap-3'>
                {trip.status === 'GENERATED' && trip.itinerary && (
                  <Button
                    disabled={exporting}
                    onClick={handleExportPdf}
                    className='w-full h-14 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group/btn'
                  >
                    {exporting ? (
                      <span className='flex items-center gap-2'>
                        <span className='h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                        Generating PDF...
                      </span>
                    ) : (
                      <>
                        <Download className='h-4 w-4 mr-2' />
                        Download Trip PDF
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
