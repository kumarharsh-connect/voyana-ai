'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Sparkles, Send, Globe, Plane, Landmark, Mountain } from 'lucide-react';
import { useRouter } from 'next/navigation';

const chips = [
  {
    icon: Globe,
    label: 'Start a New Journey',
    color: 'from-blue-500/20 to-blue-500/10',
  },
  {
    icon: Plane,
    label: 'Find Your Next Escape',
    color: 'from-green-500/20 to-green-500/10',
  },
  {
    icon: Landmark,
    label: 'Find Unique Experiences',
    color: 'from-orange-500/20 to-orange-500/10',
  },
  {
    icon: Mountain,
    label: 'Explore Adventure Routes',
    color: 'from-amber-600/20 to-amber-600/10',
  },
];

export default function Hero() {
  const { user } = useUser();
  const router = useRouter();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const onSend = async () => {
    if (!input.trim()) return;

    if (!user) {
      router.push('/sign-in');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/trips/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? 'REquest failed');
      }

      if (data.mode === 'GENERATED') {
        if (!data.tripId) {
          throw new Error('Trip ID missing from response');
        }
        router.push(`/trips/${data.tripId}`);
        return;
      }

      if (data.mode === 'CREATE') {
        router.push(data.redirect);
        return;
      }

      if (data.mode === 'ERROR') {
        console.warn(data.message);
      }
    } catch (error) {
      console.error('Hero intent failed: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='relative min-h-[85vh] w-full flex flex-col justify-center items-center overflow-hidden pt-25'>
      {/* Background */}
      <img
        src='/hero/marketing-hero-backdrop.webp'
        className='absolute inset-0 w-full h-full z-0 object-cover object-top contrast-[1.05] brightness-[1.02] '
        alt='Voyana Hero'
      />

      <div className='absolute inset-0 h-screen bg-linear-to-t from-[#FFFAF5] via-transparent via-30% to-transparent' />

      {/* Content */}
      <div className='relative z-10 max-w-5xl mx-auto text-center px-4 animate-fadeInUp mb-12'>
        {/* Badge */}
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/20 backdrop-blur-sm'>
          <Sparkles className='w-3 h-3 text-primary' />
          <span className='text-xs tracking wide font-medium text-foreground'>
            AI-Powered Trip Planning
          </span>
        </div>

        {/* Headline */}
        <h1 className='mt-6 font-heading text-5xl md:text-6xl font-extrabold text-foreground leading-tight'>
          Your Next Trip,
          <span className='block text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-secondary'>
            Designed in Seconds
          </span>
        </h1>

        {/* Subheadline */}
        <p className='mt-4 text-md md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed '>
          Describe your dream adventure and let Voyana instantly craft a
          beautifully personalized travel plan for you.
        </p>

        {/* Query Box */}
        <div className='w-full max-w-[700px] mx-auto mt-10'>
          <div className='relative bg-white/90 backdrop-blur-xl border border-border rounded-2xl shadow-md hover:shadow-lg p-5 transition-all hover:border-primary/40'>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              disabled={loading}
              placeholder="Tell Voyana your plan… e.g. 'Plan a 5-day trip to Paris for a family'"
              className='w-full min-h-12 bg-transparent outline-none resize-none text-base text-foreground placeholder:text-foreground/50 leading-relaxed '
            />

            <button
              className='absolute right-5 top-1/2 -translate-y-1/2 bg-linear-to-br from-primary to-secondary text-white h-12 w-12 rounded-xl shadow-md hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center transition-all'
              onClick={onSend}
              disabled={loading}
            >
              <Send className='w-5 h-5' />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className='flex justify-center flex-wrap gap-4 mt-8'>
            {chips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <button
                  key={idx}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium
                  bg-linear-to-br ${chip.color}
                  border border-white/40 backdrop-blur-sm
                  shadow-sm hover:shadow-lg
                  opacity-100
                  hover:border-primary/40 hover:scale-[1.05]
                  transition-all duration-300
                  text-foreground`}
                >
                  <Icon className='w-3 h-3 shrink-0 opacity-70 group-hover:opacity-100' />
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
