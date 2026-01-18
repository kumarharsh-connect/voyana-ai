'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';

export default function AppNavbar() {
  const navOptions = [{ number: 1, name: 'My Trips', path: '/trips' }];

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
      className={`w-full fixed top-0 inset-x-0 z-50 transition-all ease-out duration-500 font-body ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-sm shadow-sm'
          : 'bg-transparent shadow none'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-18 items-center justify-between'>
          {/* Logo */}
          <Link href='/trips' className='flex items-center gap-2'>
            <span className='font-heading font-bold text-4xl'>
              <span className='text-primary'>Voyana </span>AI
            </span>
          </Link>

          {/* Center Nav */}
          <div className='hidden md:flex items-center gap-8'>
            {navOptions.map((option) => (
              <Link href={option.path} key={option.number}>
                <h2 className='text-foreground text-sm lg:text-md hover:cursor-pointer hover:scale-105 hover:text-accent'>
                  {option.name}
                </h2>
              </Link>
            ))}
          </div>

          {/* Actions */}

          <div className='flex items-center gap-4'>
            <Button
              asChild
              className='rounded-xl bg-linear-to-br from-primary to-secondary text-white'
            >
              <Link href='/trips/create'>
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
