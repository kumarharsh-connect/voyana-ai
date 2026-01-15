'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';

export default function AppNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out font-body ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent shadow none'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/dashboard' className='flex items-center gap-2'>
            <span className='font-heading font-bold text-4xl'>
              <span className='text-primary'>Voyana </span>AI
            </span>
          </Link>

          {/* Center Nav */}
          <div className='hidden md:flex items-center gap-8'>
            <Link href='/dashboard'>
              <h2 className='text-foreground text-sm lg:text-md hover:cursor-pointer hover:scale-105 hover:text-accent'>
                My Trips
              </h2>
            </Link>
          </div>

          {/* Actions */}

          <div className='flex items-center gap-4'>
            <Button
              asChild
              className='rounded-xl bg-linear-to-br from-primary to-secondary text-white'
            >
              <Link href='/trips/new'>
                <Plus className='mr-1 h-4 w-4' />
                Create Trip
              </Link>
            </Button>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-10 w-10',
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
