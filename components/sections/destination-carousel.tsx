'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const destinations = [
  {
    name: 'Paris',
    tag: 'Romance & Culture',
    image: '/destinations/dest-paris.png',
  },
  {
    name: 'Tokyo',
    tag: 'Modern Culture',
    image: '/destinations/dest-tokyo.png',
  },
  {
    name: 'Bali',
    tag: 'Tropical Paradise',
    image: '/destinations/dest-bali.png',
  },
  {
    name: 'Barcelona',
    tag: 'Architecture & Beach',
    image: '/destinations/dest-barcelona.png',
  },
  {
    name: 'Dubai',
    tag: 'Luxury & Desert',
    image: '/destinations/dest-dubai.png',
  },
];

function DestinationCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className='bg-background py-18 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6'>
          {/* Heading */}
          <div className='animate-slideInLeft'>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-2 text-foreground'>
              Explore Destinations
            </h2>
            <p className='text-md text-foreground/70'>
              Curated experiences awaiting you around the world
            </p>
          </div>
          {/* Arrow Buttons */}
          <div className='hidden md:flex gap-2'>
            <button
              onClick={() => scroll('left')}
              className='p-4 text-primary rounded-lg bg-primary/20 hover:bg-primary/30 hover:scale-105 active:scale-95'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
            <button
              onClick={() => scroll('right')}
              className='p-4 text-primary  rounded-lg bg-primary/20 hover:bg-primary/30 hover:scale-105 active:scale-95'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Carousel Items */}
        <div
          ref={scrollRef}
          className='flex gap-6 bg-background overflow-x-auto px-4 -mx-4 py-4 no-scrollbar'
        >
          {destinations.map((dest, idx) => (
            <div
              className='relative w-full sm:w-96 shrink-0 cursor-pointer group rounded-lg animate-fadeInUp overflow-hidden'
              key={idx}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className='relative overflow-hidden rounded-lg'>
                <img
                  src={dest.image}
                  className='h-64 object-cover w-full group-hover:scale-110 transition-transform duration-500 '
                ></img>
                <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent' />
                <div className='absolute bottom-4 left-4'>
                  <h3 className='text-3xl md:text-4xl lg:text-5xl font-heading  font-bold text-primary-foreground'>
                    {dest.name}
                  </h3>
                  <span className='inline-block px-3 py-1 mt-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30 hover:bg-white/30 transition-colors duration-300'>
                    {dest.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationCarousel;
