'use client';

import { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DraftEmptyState({ tripId }: { tripId: string }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const res = await fetch(`/api/trips/${tripId}/generate`, {
      method: 'POST',
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    window.location.reload();
  };

  return (
    <div className='mx-auto max-w-3xl px-4 py-20'>
      <div className='relative overflow-hidden rounded-[3rem] border border-border bg-linear-to-br from-primary/10 via-background to-secondary/10 p-12 text-center shadow-2xl shadow-primary/10'>
        <div className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl'></div>
        <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl'></div>
        <div className='relative z-10 flex flex-col items-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner'>
            <Sparkles className='h-10 w-10' />
          </div>
          <h2 className='mt-8 text-4xl font-heading font-bold'>
            Ready to design your trip?
          </h2>
          <p className='mt-4 max-w-md text-lg text-muted-foreground leading-relaxed'>
            Your trip is created. Let Voyana generate a personalized itinerary
            tailored to your preferences.
          </p>
          <Button
            size='lg'
            onClick={handleGenerate}
            disabled={loading}
            className='mt-10 h-14 rounded-2xl px-10 text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1'
          >
            <Wand2 className='mr-2 h-5 w-5' />
            {loading ? 'Generating...' : 'Generate Itinerary'}
          </Button>
        </div>
      </div>
    </div>
  );
}
