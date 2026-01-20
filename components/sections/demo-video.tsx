'use client';
import VoyanaTutorial from '@/videos/voyana-ai.mp4';
import NextVideo from 'next-video';

export default function DemoVideo() {
  return (
    <section className='py-16 px-4 bg-background relative overflow-hidden'>
      <div className='max-w-5xl mx-auto'>
        <div className='text-center mb-20 animate-fadeInUp'>
          <h2 className='text-4xl md:text-5xl font-heading font-bold text-foreground mb-4'>
            See It In Action
          </h2>
          <p className='text-lg text-foreground/60'>
            Experience Voyana AI in 60 seconds
          </p>
        </div>

        <div
          className='rounded-4xl overflow-hidden flex justify-center animate-fadeInUp max-w-[90vw] md:max-w-[50vw] mx-auto'
          style={{ animationDelay: '150ms' }}
        >
          <NextVideo
            src={VoyanaTutorial}
            controls
            autoplay
            loop
            className=''
          ></NextVideo>
        </div>

        <div className='mt-20 grid grid-cols-1 md:grid-cols-4 gap-8'>
          {['Ask', 'Generate', 'Visualize', 'Export'].map((step, idx) => (
            <div
              key={idx}
              className='text-center animate-slideUpStaggered'
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <div className='w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary font-serif font-bold hover:bg-primary/30 transition-colors duration-300'>
                {idx + 1}
              </div>
              <p className='font-semibold text-foreground'>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='section-divider mt-20' />
    </section>
  );
}
