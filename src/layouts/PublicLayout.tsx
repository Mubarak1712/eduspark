import { type ReactNode } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
      <Footer />
    </div>
  );
}
