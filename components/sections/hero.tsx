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
        throw new Error(data.message ?? 'Request failed');
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
    <section className='relative min-h-dvh md:min-h-[85dvh] w-full flex flex-col justify-center items-center overflow-hidden pt-22 md:pt-28'>
      {/* Background */}
      <img
        src='/hero/marketing-hero-backdrop.webp'
        className='absolute inset-0 w-full h-full z-0 object-cover md:object-top contrast-[1.05] brightness-[1.02] '
        alt='Voyana Hero'
      />

      <div className='absolute inset-0 h-full bg-linear-to-t from-[#FFFAF5] via-transparent via-40% md:via-30% to-transparent' />

      {/* Content */}
      <div className='relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 animate-fadeInUp mb-12 space-y-8 md:space-y-0'>
        {/* Badge */}
        <div className=' inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/20 backdrop-blur-sm'>
          <Sparkles className='w-3 h-3 text-primary' />
          <span className='text-xs tracking wide font-medium text-foreground'>
            AI-Powered Trip Planning
          </span>
        </div>

        {/* Headline */}
        <h1 className='md:mt-6 mt-10 font-heading text-5xl md:text-6xl font-extrabold text-foreground leading-tight'>
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
        <div className='w-full max-w-2xl mx-auto mt-8 md:mt-10 px-2 sm:px-0'>
          <div className='relative bg-white/90 backdrop-blur-xl border border-border rounded-2xl shadow-md hover:shadow-lg p-3 md:p-5 transition-all hover:border-primary/40'>
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
              className='w-full  min-h-25 md:min-h-12  bg-transparent outline-none resize-none text-base text-foreground placeholder:text-foreground/50 leading-relaxed pr-14 md:pr-16'
            />

            <button
              className='absolute right-3 bottom-3 md:top-1/2 md:-translate-y-1/2 bg-linear-to-br from-primary to-secondary text-white h-10 w-10 md:h-12 md:w-12 rounded-xl shadow-md hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center transition-all disabled:opacity-50'
              onClick={onSend}
              disabled={loading}
            >
              <Send className='w-4 h-4 md:w-5 md:h-5' />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className='flex justify-center flex-wrap gap-2 md:gap-4 mt-6 md:mt-8'>
            {chips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <button
                  key={idx}
                  className={`flex items-center gap-2 px-3 py-2
                  md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-medium
                  bg-linear-to-br ${chip.color}
                  border border-white/40 backdrop-blur-sm
                  shadow-sm hover:shadow-lg
                  hover:border-primary/40 hover:scale-[1.05]
                  transition-all duration-300
                  text-foreground whitespace-nowrap`}
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
