'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function OnboardingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      try {
        await fetch('/api/auth/sync', { method: 'POST' });
        router.replace('/trips/');
      } catch (error) {
        console.error('Sync failed:', error);
        router.replace('/trips/');
      } finally {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6 bg-linear-to-b from-background to-muted/20'>
      <div className='max-w-xl text-center space-y-8 animate-in fade-in zoom-in duration-500'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <Sparkles className='h-8 w-8' />
        </div>

        <div className='space-y-3'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Setting up your account...
          </h1>
          <p className='text-muted-foreground text-lg leading-relaxed flex items-center justify-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            Preparing your travel dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
