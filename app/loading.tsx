'use client';

import { useState, useEffect } from 'react';

const MESSAGES = [
  { main: 'Voyana AI is preparing', sub: 'Personalizing your experience' },
  { main: 'Voyana AI is thinking', sub: 'Optimizing your travel routes' },
  { main: 'Voyana AI is syncing', sub: 'Securing your preferences' },
  { main: 'Voyana AI is ready', sub: 'Finishing the final touches' },
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2200); // Slightly slower than 2s for better readability
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md'>
      <div className='flex flex-col items-center gap-8'>
        {/* Modern Minimalist Spinner */}
        <div className='relative h-12 w-12'>
          {/* Subtle outer glow */}
          <div className='absolute inset-0 rounded-full border-2 border-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.1)]' />
          {/* Main spinner */}
          <div className='absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin' />
        </div>

        {/* Branded Text Content */}
        <div className='text-center flex flex-col gap-1'>
          <div className='h-6 overflow-hidden'>
            <p
              key={`main-${index}`}
              className='text-sm font-semibold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-forwards'
            >
              {MESSAGES[index].main}
            </p>
          </div>

          <div className='h-5 overflow-hidden'>
            <p
              key={`sub-${index}`}
              className='text-xs font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700 delay-75 fill-mode-forwards'
            >
              {MESSAGES[index].sub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
