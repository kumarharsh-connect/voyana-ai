'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const syncUser = async () => {
      try {
        await fetch('/api/auth/sync', {
          method: 'POST',
        });

        // After sync go to dashboard
        router.replace('/dashboard');
      } catch (error) {
        console.log('User sync failed', error);
      }
    };
    syncUser();
  }, [router]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-3'>
      <span className='animate-spin'>✈️</span>
      <p>Preparing your travel workspace…</p>
    </div>
  );
}
