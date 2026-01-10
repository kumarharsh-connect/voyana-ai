'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
      });

      if (!res.ok) {
        console.error('User sync failed');
        return;
      }

      router.replace('/dashboard');
    };
    syncUser();
  }, [router, isLoaded, isSignedIn]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-3'>
      <span className='animate-spin'>✈️</span>
      <p>Preparing your travel workspace…</p>
    </div>
  );
}
