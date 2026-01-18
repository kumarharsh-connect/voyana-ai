import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { getUserTrips } from '@/lib/queries/getUserTrips';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TripGrid from '@/components/dashboard/TripGrid';
import EmptyState from '@/components/dashboard/EmptyState';
import TripsHeader from '@/components/dashboard/TripsHeader';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const trips = await getUserTrips(userId);

  const hasTrips = trips.length > 0;
  return (
    <section className='font-body px-6 py-8 max-w-7xl mx-auto space-y-8'>
      <DashboardHeader showCTA={hasTrips} />

      <section className='space-y-8'>
        <TripsHeader />
        {trips.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <TripGrid trips={trips} />
          </>
        )}
      </section>
    </section>
  );
}
