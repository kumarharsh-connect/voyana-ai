import React from 'react';
import {
  MessageCircle,
  Map,
  Utensils,
  Users,
  Backpack,
  Share2,
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'Natural Chat',
    description:
      'Talk to Voyana like a friend. Chat naturally about your trip preferences and get instant, personalized suggestions.',
    image: '/feature/natural-chat.png',
  },
  {
    icon: Map,
    title: 'Interactive Map',
    description:
      'Visualize your entire journey with location pins, route connections, and real-time distance calculations.',
    image: '/feature/interactive-map.png',
  },
  {
    icon: Utensils,
    title: 'Smart Recommendations',
    description:
      'Discover curated hotels, restaurants, and hidden gems tailored to your budget and travel style.',
    image: '/feature/smart-recommendations.png',
  },
  {
    icon: Users,
    title: 'One-Tap Sharing',
    description:
      'Share your trip as a beautiful link or PDF — perfect for sending to friends and travel partners.',
    image: '/feature/one-tap-sharing.png',
  },
  {
    icon: Backpack,
    title: 'Personalized Preferences',
    description:
      'Tell Voyana your style — budget-friendly, moderate, luxury, or adventure — and it plans the trip around you.',
    image: '/feature/personalized-preferences.png',
  },
  {
    icon: Share2,
    title: 'Export Anywhere',
    description:
      'Download beautiful PDFs, sync to your calendar, or share with a unique link. Works everywhere.',
    image: '/feature/export-anywhere.png',
  },
];

function FeatureGrid() {
  return (
    <section className='py-24 px-4 bg-background'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-20 animate-fadeInUp'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4'>
            Everything You Need
          </h2>
          <p className='text-lg text-foreground/70 max-w-2xl mx-auto'>
            Packed with intelligent features designed to make trip planning
            effortless and enjoyable.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className='card-elegant rounded-xl
                p-0 overflow-hidden flex flex-col border border-border hover:shadow-lg transition-all duration-300 group group-hover:-translate-y-1 animate-fadeInUp'
                style={{ animationDelay: `${idx * 75}ms` }}
              >
                {/* Image */}
                <div className='relative aspect-video bg-linear-to-br from-primary/15 to-secondary/20 overflow-hidden'>
                  <img
                    src={feature.image || '/placeholder.svg'}
                    alt={feature.title}
                    className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
                  />
                </div>

                {/* Content */}
                <div className='p-6 flex flex-col flex-1'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300'>
                      <Icon className='w-5 h-5 text-primary' />
                    </div>
                    <h3 className='text-lg font-heading font-bold text-foreground'>
                      {feature.title}
                    </h3>
                  </div>
                  <p className='text-foreground/70 leading-relaxed flex-1 text-sm'>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureGrid;
