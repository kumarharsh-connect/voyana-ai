'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const navOptions = [
    { number: 1, name: 'Home', path: '/' },
    { number: 2, name: 'Features', path: '/#features' },
    { number: 3, name: 'Explore', path: '/#explore' },
    { number: 4, name: 'Contact', path: '/#contact' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [isScrolled]);

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
          <div className='hidden md:flex items-center gap-6'>
            {navOptions.map((option) => (
              <Link href={option.path} key={option.number}>
                <h2 className='text-foreground text-sm lg:text-md hover:cursor-pointer hover:scale-105 hover:text-accent'>
                  {option.name}
                </h2>
              </Link>
            ))}
          </div>
          <div className='hidden md:flex items-center gap-4 '>
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
                <Link href='/onboarding'>
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

          {/* Mobile Menu Button  */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-muted transition'
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className='md:hidden bg-background/95 backdrop-blur-lg border-t border-border'>
          <div className='px-4 py-6 space-y-6'>
            {navOptions.map((option) => (
              <Link
                key={option.number}
                href={option.path}
                onClick={() => setMenuOpen(false)}
                className='block text-lg font-medium text-foreground'
              >
                {option.name}
              </Link>
            ))}

            <div className='pt-4 border-t border-border space-y-4'>
              <SignedOut>
                <SignInButton mode='modal'>
                  <Button className='w-full rounded-xl bg-linear-to-br from-primary to-secondary text-white'>
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href='/onboarding' onClick={() => setMenuOpen(false)}>
                  <Button variant='secondary' className='w-full rounded-xl'>
                    My Trips
                  </Button>
                </Link>
                <div className='flex justify-center pt-2'>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
