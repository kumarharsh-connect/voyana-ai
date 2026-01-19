'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, MapPin, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='relative min-h-screen flex items-center justify-center px-6 overflow-hidden'>
      {/* Background */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url('/hero/trips-hero-backdrop.webp')" }}
      />
      <div className='absolute inset-0 bg-background/70 backdrop-blur-sm' />

      {/* Content */}
      <div className='relative z-10 max-w-xl text-center bg-background/90 backdrop-blur-xl border border-border rounded-3xl p-10 shadow-2xl'>
        {/* Icon */}
        <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <Compass className='h-8 w-8' />
        </div>

        {/* Heading */}
        <h1 className='text-3xl font-heading font-bold'>
          You seem a little lost
        </h1>

        <p className='mt-3 text-muted-foreground leading-relaxed'>
          The page you’re looking for doesn’t exist, or the trip may have been
          moved or deleted.
        </p>

        {/* Helpful hints */}
        <div className='mt-6 space-y-2 text-sm text-muted-foreground'>
          <div className='flex items-center justify-center gap-2'>
            <MapPin className='h-4 w-4 text-primary' />
            <span>Check the trip link</span>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <MapPin className='h-4 w-4 text-primary' />
            <span>Or start planning a new adventure</span>
          </div>
        </div>

        {/* Actions */}
        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
          <Link href='/trips'>
            <Button className='w-full sm:w-auto rounded-xl px-6'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Trips
            </Button>
          </Link>

          <Link href='/trips/create'>
            <Button
              variant='secondary'
              className='w-full sm:w-auto rounded-xl px-6'
            >
              Plan a New Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
