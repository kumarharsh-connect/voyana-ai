'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Gauge, Wallet } from 'lucide-react';
import { ChipGroup } from '@/components/trips/ChipGroup';

const GROUP_TYPE = ['solo', 'couple', 'friends', 'family'];
const PACES = ['relaxed', 'balanced', 'fast'];
const BUDGETS = ['budget', 'mid', 'luxury'];

export default function NewTripPage() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [groupType, setGroupType] = useState<string | null>(null);
  const [pace, setPace] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateTrip = async () => {
    if (!destination.trim()) return;

    setLoading(true);

    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'appication/json' },
      body: JSON.stringify({
        destination,
        groupType,
        pace,
        budget,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const trip = await res.json();
    router.push(`/trips/${trip.id}`);
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 font-body'>
      <div className='relative w-full max-w-2xl rounded-[3rem] border border-border bg-linear-to-br from-primary/10 via-background to-secondary/10 p-8 md:p-12 shadow-2xl shadow-primary/10'>
        <div className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl'></div>
        <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl'></div>
        <div className='relative z-10 space-y-10'>
          {/* Header */}
          <div className='text-center space-y-3'>
            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
              <Sparkles className='h-4 w-4' />
              Create a new journey
            </div>

            <h1 className='font-heading text-4xl font-bold'>
              Where do you want to go?
            </h1>
            <p className='text-muted-foreground'>
              Tell us the destination - we'll handle the planning
            </p>
          </div>

          {/* Destination Input  */}
          <div>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder='e.g. Delhi, Paris, Bali'
              className='w-full rounded-2xl border border-border bg-white/70 px-6 py-4 text-lg outline-none backdrop-blur transition focus:border-primary focus:ring-2 focus:ring-primary/20'
            />
          </div>

          {/* Preference Chips */}
          <div className='space-y-6'>
            {/* Group Type */}
            <ChipGroup
              icon={<Users className='h-4 w-4' />}
              label='Group'
              options={GROUP_TYPE}
              value={groupType}
              onChange={setGroupType}
            />
            {/* Pace */}
            <ChipGroup
              icon={<Gauge className='h-4 w-4' />}
              label='Pace'
              options={PACES}
              value={pace}
              onChange={setPace}
            />
          </div>

          {/* CTA */}
          <Button
            size='lg'
            disabled={!destination || loading}
            onClick={handleCreateTrip}
            className='w-full py-2 rounded-2xl text-2xl font-semibold shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5'
          >
            {loading ? 'Creating...' : 'Create Trip'}
          </Button>
        </div>
      </div>
    </div>
  );
}
