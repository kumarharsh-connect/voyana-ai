'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only sync once the user is fully loaded and signed in
    if (!isLoaded || !isSignedIn) return;

    fetch('/api/auth/sync', { method: 'POST' }).catch(console.error);
  }, [isLoaded, isSignedIn]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6 bg-linear-to-b from-background to-muted/20'>
      <div className='max-w-xl text-center space-y-8 animate-in fade-in zoom-in duration-500'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <Sparkles className='h-8 w-8' />
        </div>

        <div className='space-y-3'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Welcome to Voyana
          </h1>
          <p className='text-muted-foreground text-lg leading-relaxed'>
            Your AI-powered travel assistant is ready. Let&apos;s craft your
            first personalized itinerary together.
          </p>
        </div>

        <Button
          size='lg'
          className='bg-linear-to-b from-primary to-secondary h-14 rounded-2xl px-8 text-base font-semibold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-2xl'
          onClick={() => router.push('/trips/create')}
        >
          Create Your First Trip
        </Button>
      </div>
    </div>
  );
}
