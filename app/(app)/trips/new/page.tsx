'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Gauge, Wallet } from 'lucide-react';
import { ChipGroup } from '@/components/trips/ChipGroup';

const GROUP_TYPE = ['solo', 'couple', 'friends', 'family'];
const PACES = ['relaxed', 'balanced', 'fast'];

export default function NewTripPage() {
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [groupType, setGroupType] = useState<string>('solo');
  const [pace, setPace] = useState<string>('balanced');
  const [minBudget, setMinBudget] = useState<number | ''>('');
  const [maxBudget, setMaxBudget] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleCreateTrip = async () => {
    if (!destination || days < 1) return;

    try {
      setLoading(true);

      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          groupType,
          pace,
          minBudget: minBudget || null,
          maxBudget: maxBudget || null,
        }),
      });

      if (!res.ok) throw new Error('Trip creation failed');

      const { tripId } = await res.json();
      router.push(`/trips/${tripId}`);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full rounded-[3rem] border p-10 space-y-8'>
        <div className='text-center space-y-2'>
          <Sparkles className='mx-auto' />
          <h1 className='text-4xl font-bold'>Plan a new trip</h1>
        </div>

        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder='Destination'
          className='w-full rounded-xl border px-4 py-3'
        />

        <input
          type='number'
          min={1}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className='w-full rounded-xl border px-4 py-3'
          placeholder='Number of days'
        />

        <ChipGroup
          icon={<Users />}
          label='Group'
          options={GROUP_TYPE}
          value={groupType}
          onChange={setGroupType}
        />

        <ChipGroup
          icon={<Gauge />}
          label='Pace'
          options={PACES}
          value={pace}
          onChange={setPace}
        />

        <div className='grid grid-cols-2 gap-4'>
          <input
            type='number'
            placeholder='Min budget'
            value={minBudget}
            onChange={(e) => setMinBudget(Number(e.target.value))}
            className='rounded-xl border px-4 py-3'
          />
          <input
            type='number'
            placeholder='Max budget'
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className='rounded-xl border px-4 py-3'
          />
        </div>

        <Button onClick={handleCreateTrip} disabled={loading}>
          {loading ? 'Creating trip...' : 'Create Trip'}
        </Button>
      </div>
    </div>
  );
}
