'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function BackButton({
  href,
  label = 'Back',
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className='inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground transition'
    >
      <ChevronLeft className='h-4 w-4' />
      {label}
    </Link>
  );
}
