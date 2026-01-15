import AppNavbar from '@/components/layout/app-navbar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <main className='pt-20'>{children}</main>
    </>
  );
}
