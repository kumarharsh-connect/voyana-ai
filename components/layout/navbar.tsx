'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

function Navbar() {
  const navOptions = [
    { number: 1, name: 'Home', path: '/' },
    { number: 2, name: 'Features', path: '/#features' },
    { number: 3, name: 'Pricing', path: '/#pricing' },
    { number: 4, name: 'Contact', path: '/#contact' },
  ];

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
      className={`w-full fixed top-0 right-0 left-0 z-50 font-body transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-sm shadow-xl'
          : 'bg-transparent shadow-none'
      } `}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-18 '>
          {/* Logo  */}
          <div className='flex items-center'>
            <h2 className='font-heading font-bold text-4xl'>
              <span className='text-primary'>Voyana</span> AI
            </h2>
          </div>
          {/* Nav Links */}
          <div className='flex items-center gap-6'>
            {navOptions.map((options) => (
              <Link href={options.path} key={options.number}>
                <h2 className='text-foreground text-sm lg:text-md hover:cursor-pointer hover:scale-105 hover:text-accent'>
                  {options.name}
                </h2>
              </Link>
            ))}
          </div>
          <div className='flex items-center gap-6 '>
            {/* Logged In */}
            <SignedOut>
              <SignInButton mode='modal'>
                <Button className='bg-linear-to-br from-primary to-secondary text-white rounded-xl'>
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>

            {/* Logged Out */}
            <SignedIn>
              <div className='flex items-center gap-4'>
                <Link href='/trips'>
                  <Button
                    variant='secondary'
                    className='rounded-xl font-medium'
                  >
                    My Trips
                  </Button>
                </Link>

                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        'h-10 w-10 rounded-full ring-2 ring-primary/20',
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
