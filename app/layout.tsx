import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'XPOSURE Events - Evenimente exclusive în orașul tău',
  description: 'Descoperă și cumpără bilete pentru cele mai tari evenimente...',
  keywords: ['evenimente', 'bilete', 'xposure', 'concerte', 'petreceri', 'festivaluri'],

  metadataBase: new URL('https://xposure-events.ro'),

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'XPOSURE Events',
    description: 'Evenimente exclusive în orașul tău',
    type: 'website',
    locale: 'ro_RO',
    images: ['/og-image.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'XPOSURE Events',
    description: 'Evenimente exclusive în orașul tău',
    images: ['/og-image.png'],
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
