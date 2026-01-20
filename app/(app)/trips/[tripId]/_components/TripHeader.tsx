import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { MapPin, Download, Calendar, Users, Wallet } from 'lucide-react';

import { formatBudget } from '@/lib/format/budget';
import { getDestinationInitials } from '@/lib/format/text';
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
      <div className='relative h-64 md:h-80 w-full overflow-hidden'>
        {trip.coverImageUrl ? (
          <img
            src={trip.coverImageUrl}
            alt={trip.destination}
            className='w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5'>
            <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-background/50 backdrop-blur-md border border-white/20 text-primary font-bold text-3xl shadow-xl'>
              {initials}
            </div>
          </div>
        )}
        <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background' />
      </div>

      <div className='relative z-10 -mt-20 max-w-7xl mx-auto px-4 sm:px-6 pb-12'>
        <div className='rounded-3xl border border-border/60 bg-background shadow-2xl overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-12'>
            <div className='p-6 md:p-10 lg:col-span-7 flex flex-col justify-center space-y-6'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-primary font-bold tracking-wide text-xs uppercase'>
                  <MapPin className='h-3.5 w-3.5' />
                  {trip.destination}
                </div>
                <h1 className='font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
                  {trip.title}
                </h1>
              </div>

              {trip.itinerary?.content?.overview?.summary && (
                <p className='text-base md:text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4'>
                  {trip.itinerary.content.overview.summary}
                </p>
              )}
            </div>

            <div className='bg-muted/30 border-t lg:border-t-0 lg:border-l border-border/60 lg:col-span-5 p-6 md:p-10 flex flex-col justify-between gap-8'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-background rounded-2xl p-4 border border-border shadow-sm'>
                  <div className='flex items-center gap-2 text-muted-foreground mb-2'>
                    <Calendar className='h-4 w-4 text-primary' />
                    <span className='text-[10px] font-bold uppercase'>
                      Duration
                    </span>
                  </div>
                  <div className='text-xl font-semibold'>
                    {trip.days}{' '}
                    <span className='text-sm text-muted-foreground'>Days</span>
                  </div>
                </div>

                <div className='bg-background rounded-2xl p-4 border border-border shadow-sm'>
                  <div className='flex items-center gap-2 text-muted-foreground mb-2'>
                    <Users className='h-4 w-4 text-primary' />
                    <span className='text-[10px] font-bold uppercase'>
                      Group
                    </span>
                  </div>
                  <div className='text-xl font-semibold capitalize'>
                    {trip.groupType || 'Solo'}
                  </div>
                </div>

                <div className='col-span-2 bg-background rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Wallet className='h-4 w-4 text-primary' />
                    <span className='text-[10px] font-bold uppercase'>
                      Budget
                    </span>
                  </div>
                  <div className='text-lg md:text-xl font-bold text-foreground'>
                    {budgetText || 'Balanced'}
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                {trip.status === 'GENERATED' && trip.itinerary && (
                  <Button
                    disabled={exporting}
                    onClick={handleExportPdf}
                    className='w-full h-14 rounded-xl text-lg font-semibold shadow-lg hover:opacity-90 transition-all'
                  >
                    {exporting ? (
                      <span className='flex items-center gap-2'>
                        <span className='h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                        Exporting...
                      </span>
                    ) : (
                      <>
                        <Download className='h-4 w-4 mr-2' />
                        Download PDF
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
