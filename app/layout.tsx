import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'XPOSURE Events - Evenimente exclusive în orașul tău',
  description: 'Descoperă și cumpără bilete pentru cele mai tari evenimente. Platformă sigură cu QR code tickets și plăți prin Stripe.',
  keywords: ['evenimente', 'bilete', 'xposure', 'concerte', 'petreceri', 'festivaluri'],
  openGraph: {
    title: 'XPOSURE Events',
    description: 'Evenimente exclusive în orașul tău',
    type: 'website',
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XPOSURE Events',
    description: 'Evenimente exclusive în orașul tău',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen flex flex-col bg-gray-950">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
