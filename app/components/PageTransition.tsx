'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    // Add loading class to body when component mounts
    document.body.classList.add('loading');

    // Remove loading class after a short delay
    const timeout = setTimeout(() => {
      document.body.classList.remove('loading');
    }, 300);

    return () => {
      clearTimeout(timeout);
      document.body.classList.remove('loading');
    };
  }, [pathname]);

  return null;
} 