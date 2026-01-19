import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className='relative flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-muted-foreground/15 bg-linear-to-b from-muted/20 to-transparent p-12 text-center md:p-24'>
      <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/5 text-primary shadow-inner'>
        <PlaneTakeoff className='h-10 w-10' />
      </div>

      {/* Text Content */}
      <div className='mt-8 space-y-3'>
        <h2 className='text-3xl font-bold font-heading text-foreground sm:text-4xl'>
          Your journey starts here
        </h2>
        <p className='mx-auto max-w-sm text-lg leading-relaxed text-muted-foreground'>
          Your dashboard is a blank canvas. Let Voyana craft your next adventure
          from scratch.
        </p>
      </div>

      {/* Action Button */}
      <Link href='/trips/create' className='mt-10'>
        <Button
          size='lg'
          className='h-12 rounded-2xl px-10 text-base font-semibold bg-linear-to-r from-primary to-secondary shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30'
        >
          Create Trip
        </Button>
      </Link>
    </div>
  );
}
