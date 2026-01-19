'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Users,
  Gauge,
  MapPin,
  Calendar,
  Wallet,
  Check,
  ChevronDown,
  Briefcase,
  Heart,
  User,
  Palmtree,
  Zap,
  Coffee,
} from 'lucide-react';
import { BackButton } from '@/components/navigation/BackButton';

const GROUP_OPTIONS = [
  { key: 'Solo', icon: User, label: 'Solo' },
  { key: 'Couple', icon: Heart, label: 'Couple' },
  { key: 'Friends', icon: Users, label: 'Friends' },
  { key: 'Family', icon: Briefcase, label: 'Family' },
];

const PACES = [
  { key: 'relaxed', title: 'Relaxed', desc: 'Slow & scenic', icon: Coffee },
  {
    key: 'balanced',
    title: 'Balanced',
    desc: 'Best of everything',
    icon: Palmtree,
  },
  { key: 'fast', title: 'Fast', desc: 'Maximize experiences', icon: Zap },
];

const SUGGESTED_DESTINATIONS = ['Paris', 'Bali', 'Tokyo', 'Goa', 'New York'];

export default function CreateTripPage() {
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(0);
  const [groupType, setGroupType] = useState('Solo');
  const [pace, setPace] = useState('balanced');
  const [currency, setCurrency] = useState('INR');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateTrip = async () => {
    if (!destination) return;

    setLoading(true);

    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination,
        days,
        groupType: groupType.toLowerCase(),
        pace,
        currency,
        minBudget: minBudget ? Number(minBudget) : null,
        maxBudget: maxBudget ? Number(maxBudget) : null,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.tripId) {
      console.error(data);
      throw new Error(data.error ?? 'Trip creation failed');
    }
    router.push(`/trips/${data.tripId}`);
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center px-4 py-8 lg:px-8 font-body'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url('/hero/trips-hero-backdrop.webp')" }}
      />
      <div className='absolute inset-0 bg-white/10 backdrop-blur-[2px]' />

      <div className='relative z-10 w-full max-w-6xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden'>
        <div className='p-8 lg:p-10'>
          <BackButton href='/trips' label='Back to trips' />

          <div className='mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16'>
            {/* Left */}
            <div className='lg:col-span-7 space-y-10'>
              <div className='space-y-2'>
                <h1 className='text-3xl lg:text-4xl font-heading font-bold'>
                  Tell Voyana about your trip
                </h1>
                <p className='text-lg text-muted-foreground'>
                  We'll handle the planning, you handle the packing.
                </p>
              </div>

              <div className='space-y-4'>
                <label className='text-sm font-semibold flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-primary' />
                  Where to?
                </label>

                <div className='relative group'>
                  <MapPin className='absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors' />
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder='Ex: Paris, France'
                    className='w-full h-16 rounded-2xl bg-muted/30 border border-transparent hover:bg-muted/50 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 pl-14 pr-5 text-lg outline-none transition-all'
                  />
                </div>

                <div className='flex flex-wrap gap-2'>
                  {SUGGESTED_DESTINATIONS.map((place) => (
                    <button
                      key={place}
                      onClick={() => setDestination(place)}
                      className='text-sm font-medium px-4 py-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all'
                    >
                      {place}
                    </button>
                  ))}
                </div>
              </div>

              <div className='space-y-4'>
                <label className='text-sm font-semibold flex items-center gap-2'>
                  <Gauge className='h-4 w-4 text-primary' />
                  Travel Style
                </label>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  {PACES.map((p) => {
                    const Icon = p.icon;
                    const selected = pace === p.key;

                    return (
                      <button
                        key={p.key}
                        onClick={() => setPace(p.key)}
                        className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                          selected
                            ? 'border-primary bg-primary/5'
                            : 'border-border/50 bg-card hover:border-primary/50'
                        }`}
                      >
                        {selected && (
                          <Check className='absolute top-3 right-3 h-4 w-4 text-primary' />
                        )}
                        <Icon
                          className={`h-6 w-6 mb-3 ${
                            selected ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        />
                        <div className='font-semibold'>{p.title}</div>
                        <div className='text-xs text-muted-foreground'>
                          {p.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className='lg:col-span-5 space-y-8'>
              <div className='bg-muted/20 rounded-3xl p-6 lg:p-8 space-y-8 border border-border/50'>
                <div className='space-y-3'>
                  <label className='text-sm font-semibold flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-primary' />
                    Duration
                  </label>

                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => setDays(Math.max(0, days - 1))}
                      className='h-14 w-14 rounded-xl border bg-background hover:bg-muted transition'
                    >
                      –
                    </button>

                    <div className='flex-1 h-14 rounded-xl border bg-background flex items-center justify-center gap-2 text-lg font-medium'>
                      <span className='text-primary font-bold'>{days}</span>
                      <span>Days</span>
                    </div>

                    <button
                      onClick={() => setDays(days + 1)}
                      className='h-14 w-14 rounded-xl border bg-background hover:bg-muted transition'
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className='space-y-3'>
                  <label className='text-sm font-semibold flex items-center gap-2'>
                    <Users className='h-4 w-4 text-primary' />
                    Who's going?
                  </label>

                  <div className='grid grid-cols-2 gap-3'>
                    {GROUP_OPTIONS.map((g) => {
                      const Icon = g.icon;
                      const selected = groupType === g.key;

                      return (
                        <button
                          key={g.key}
                          onClick={() => setGroupType(g.key)}
                          className={`flex items-center gap-3 px-4 h-14 rounded-xl border-2 transition ${
                            selected
                              ? 'border-primary bg-primary/5'
                              : 'border-transparent bg-background hover:bg-muted'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              selected
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                          <span className='font-medium'>{g.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className='space-y-3'>
                  <label className='text-sm font-semibold flex items-center gap-2'>
                    <Wallet className='h-4 w-4 text-primary' />
                    Budget
                  </label>

                  <div className='flex items-center h-14 rounded-xl border bg-background px-3 focus-within:ring-2 focus-within:ring-primary/20'>
                    <div className='relative'>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className='appearance-none bg-transparent font-semibold text-sm outline-none pr-6'
                      >
                        <option>INR</option>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                      </select>
                      <ChevronDown className='absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground' />
                    </div>

                    <div className='h-6 w-px bg-border mx-3' />

                    <input
                      placeholder='Min'
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      className='w-full bg-transparent outline-none text-sm'
                    />

                    <span className='px-2 text-muted-foreground'>–</span>

                    <input
                      placeholder='Max'
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      className='w-full bg-transparent outline-none text-sm text-right'
                    />
                  </div>
                </div>
              </div>

              <div className='pt-2'>
                <Button
                  onClick={handleCreateTrip}
                  disabled={loading || !destination || days === 0}
                  className='w-full h-16 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20'
                >
                  {loading ? 'Voyana is planning…' : 'Generate my trip plan'}
                </Button>

                <div className='mt-6 flex justify-center gap-6 text-xs font-medium text-muted-foreground'>
                  <span className='flex items-center gap-1.5'>
                    <Check className='h-3.5 w-3.5 text-green-500' /> AI
                    Optimized
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <Check className='h-3.5 w-3.5 text-green-500' /> Free
                    cancellation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
