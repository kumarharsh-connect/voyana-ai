'use client';

const steps = [
  {
    number: 1,
    title: 'Tell Voyana Your Vision',
    description:
      'Chat naturally about your dream trip. Share your destination, dates, budget, and travel style. Voyana learns your preferences in real-time.',
    image: '/steps/vision.png',
  },
  {
    number: 2,
    title: 'AI Creates Your Itinerary',
    description:
      'Watch Voyana craft a personalized day-by-day itinerary with hotels, restaurants, and hidden gems. Edit with a single message.',
    image: '/steps/itenary.png',
  },
  {
    number: 3,
    title: 'Explore & Share',
    description:
      'Visualize your trip on an interactive map, sync to your calendar, or share with companions. Export as PDF or shareable link.',
    image: '/steps/explore.png',
  },
];

export default function HowItWorks() {
  return (
    <section className='relative bg-background pt-20 pb-24 px-4' id='explore'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-20'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-heading font-bold'>
            How Voyana Works
          </h2>
          <p className='text-lg text-foreground/70 max-w-xl mx-auto mt-4'>
            Planning a trip has never been this effortless. Follow three
            intuitive steps.
          </p>
        </div>

        <div className='relative'>
          {/* Timeline Line */}
          <div className='hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-primary/20'></div>

          <div className='space-y-32'>
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className='relative grid grid-cols-1 md:grid-cols-2 items-center gap-10'
                >
                  {/* Dot */}
                  <div className='hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border border-primary'></div>

                  {/* Text */}
                  <div
                    className={`${
                      isLeft
                        ? 'md:pr-12 md:text-right'
                        : 'md:order-last md:pl-12 md:text-left'
                    }`}
                  >
                    <div className='inline-flex items-center justify-center md:justify-start mb-4'>
                      <div className='w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center'>
                        <span className='text-primary font-heading text-xl font-bold'>
                          {step.number}
                        </span>
                      </div>
                    </div>

                    <h3 className='text-3xl md:text-4xl font-heading font-bold mb-3'>
                      {step.title}
                    </h3>
                    <p className='text-lg text-foreground/70 leading-relaxed'>
                      {step.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div
                    className={`${
                      isLeft ? 'md:pl-12' : 'md:pr-12 md:order-first'
                    }`}
                  >
                    <div className='relative rounded-xl overflow-hidden shadow-lg group h-64'>
                      <img
                        src={step.image}
                        alt={step.title}
                        className='h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
                      />
                      <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
