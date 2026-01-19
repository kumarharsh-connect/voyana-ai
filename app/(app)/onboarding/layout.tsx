import AppNavbar from '@/components/layout/app-navbar';
import React from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <main className='pt-18'>{children}</main>
    </>
  );
}
