import Hero from '@/components/sections/hero';
import DestinationCarousel from '@/components/sections/destination-carousel';
import HowItWorks from '@/components/sections/how-it-works';
import FeatureGrid from '@/components/sections/feature-grid';
import DemoVideo from '@/components/sections/demo-video';
import ContactForm from '@/components/sections/contact-form';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <main className='min-h-screen bg-background text-foreground font-body scroll-smooth'>
      <div id='home'>
        <Hero />
      </div>

      <DestinationCarousel />
      <HowItWorks />
      <div id='features'>
        <FeatureGrid />
      </div>

      <DemoVideo />

      <div id='contact'>
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}
