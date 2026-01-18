// @ts-ignore
import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Sora } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'Voyana AI',
  description: 'AI-powered travel assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <head />
        <body className={`${sora.variable} ${playfair.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
