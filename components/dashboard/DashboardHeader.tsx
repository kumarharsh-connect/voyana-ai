import { currentUser } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type DashboardHeaderProps = {
  showCTA?: Boolean;
};

export default async function DashboardHeader({
  showCTA = true,
}: DashboardHeaderProps) {
  const user = await currentUser();

  return (
    <div className='relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-primary/10 via-background to-secondary/10 p-6 md:p-10 shadow-xl shadow-primary/10'>
      <img
        src='/hero/trips-hero-backdrop.webp'
        className='absolute inset-0 h-full w-full object-cover object-center opacity-40 md:opacity-60'
      />
      <div
        className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl'
        aria-hidden='true'
      />

      <div className='relative z-10 flex flex-col items-start'>
        <h1 className='text-3xl font-bold font-heading md:text-4xl bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent'>
          Plan your next adventure{user?.firstName ? `, ${user.firstName}` : ''}
        </h1>

        <p className='mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed'>
          Your AI-powered itineraries, beautifully crafted and ready to explore.
        </p>

        {showCTA && (
          <div className='mt-8'>
            <Link href='/trips/create'>
              <Button
                size='lg'
                className='rounded-2xl bg-linear-to-r from-primary to-secondary font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30'
              >
                Plan a new trip
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
