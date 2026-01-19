'use client';

export default function Footer() {
  return (
    <footer className='relative'>
      <div className='h-12 bg-linear-to-b from-background to-foreground opacity-5' />

      <div className='bg-foreground text-background py-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Main Grid */}
          <div className='grid grid-cols-1 md:grid-cols-5 gap-12 mb-12'>
            {/* Brand */}
            <div className='animate-fadeInUp'>
              <h3 className='text-2xl font-serif font-bold mb-4'>Voyana AI</h3>
              <p className='text-background/70 text-sm leading-relaxed'>
                AI-powered trip planning designed to feel personal, handcrafted,
                and unforgettable.
              </p>
            </div>

            {/* Product */}
            <div
              className='animate-fadeInUp'
              style={{ animationDelay: '50ms' }}
            >
              <h4 className='font-semibold text-background mb-4 uppercase tracking-wide text-xs'>
                Product
              </h4>
              <ul className='space-y-2.5 text-sm text-background/70'>
                <li>
                  <a
                    href='#features'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#pricing'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div
              className='animate-fadeInUp'
              style={{ animationDelay: '100ms' }}
            >
              <h4 className='font-semibold text-background mb-4 uppercase tracking-wide text-xs'>
                Company
              </h4>
              <ul className='space-y-2.5 text-sm text-background/70'>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href='#contact'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div
              className='animate-fadeInUp'
              style={{ animationDelay: '150ms' }}
            >
              <h4 className='font-semibold text-background mb-4 uppercase tracking-wide text-xs'>
                Legal
              </h4>
              <ul className='space-y-2.5 text-sm text-background/70'>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div
              className='animate-fadeInUp'
              style={{ animationDelay: '200ms' }}
            >
              <h4 className='font-semibold text-background mb-4 uppercase tracking-wide text-xs'>
                Follow
              </h4>
              <ul className='space-y-2.5 text-sm text-background/70'>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-background transition-colors duration-200'
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-background/20 pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-background/70'>
            <p>&copy; 2026 Voyana AI. All rights reserved.</p>
            <p>Crafted by Harsh with love</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
