'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith('/admin') || pathname.startsWith('/cpanel');

  return (
    <>
      {!hideLayout && <Navbar />}
        {children}
      {!hideLayout && <Footer />}
    </>
  );
}
