import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TicketPurchaseForm from '@/components/TicketPurchaseForm';

export const dynamic = 'force-dynamic';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  if (!event) {
    notFound();
  }

  const isSoldOut = event.soldCount >= event.capacity;
  const availableTickets = event.capacity - event.soldCount;
  const isLowStock = !isSoldOut && availableTickets <= 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section with Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <Image
            src={event.imagePath}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/60" />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-950" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <div className="max-w-4xl">
              {/* Status Badge */}
              {isSoldOut ? (
                <span className="inline-block px-6 py-2 rounded-full font-bold text-sm bg-red-500 text-white shadow-lg mb-4">
                  SOLD OUT
                </span>
              ) : isLowStock ? (
                <span className="inline-block px-6 py-2 rounded-full font-semibold text-sm bg-orange-500 text-white shadow-lg mb-4 animate-pulse">
                  Ultimele {availableTickets} locuri!
                </span>
              ) : null}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow">
                {event.title}
              </h1>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString('ro-RO', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">
                    {new Date(event.date).toLocaleTimeString('ro-RO', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Location */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Locație
              </h2>
              <p className="text-lg text-white font-medium mb-2">{event.locationName}</p>
              <p className="text-gray-400">{event.locationAddress}</p>
              
              {event.locationMapsUrl && (
                <a
                  href={event.locationMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Vezi pe hartă
                </a>
              )}
            </div>

            {/* Description */}
            {event.description && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">Despre eveniment</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Informații importante</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Biletele includ cod QR pentru acces rapid la eveniment</span>
                </li>
                {/* Afișăm info despre plată doar dacă NU e extern */}
                {!event.isExternal && (
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Plata securizată prin Stripe</span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Biletul va fi trimis instant prin email după finalizarea plății</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Ticket Purchase */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                {/* Price */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Preț bilet</p>
                  <p className="text-4xl md:text-5xl font-bold gradient-text text-glow">
                    {event.price} RON
                  </p>
                </div>

                {/* Availability */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Disponibilitate</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                      isSoldOut
                        ? 'bg-red-900/30 text-red-400 border border-red-500/50'
                        : isLowStock
                        ? 'bg-orange-900/30 text-orange-400 border border-orange-500/50'
                        : 'bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {isSoldOut ? 'Sold Out' : `${availableTickets} locuri`}
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-yellow-500 transition-all duration-500"
                      style={{ width: `${(event.soldCount / event.capacity) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {event.soldCount} / {event.capacity} bilete vândute
                  </p>
                </div>

                {/* Purchase Area */}
                {isSoldOut ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-xl font-bold text-white mb-2">Sold Out</p>
                    <p className="text-gray-400 mb-6">Toate biletele au fost vândute</p>
                    <Link
                      href="/"
                      className="inline-block px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                    >
                      Vezi alte evenimente
                    </Link>
                  </div>
                ) : (
                  // --- AICI ESTE MODIFICAREA PRINCIPALA ---
                  event.isExternal && event.externalUrl ? (
                    // 1. Varianta LINK EXTERN (Google Forms)
                    <div className="text-center">
                      <p className="text-gray-400 mb-6 text-sm">
                        Înscrie-te la acest eveniment 
                      </p>
                      <a
                        href={event.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:scale-[1.02]"
                      >
                        <span className="mr-2">📝</span>
                        Completează Formularul
                      </a>
                    </div>
                  ) : (
                    // 2. Varianta STANDARD (Stripe)
                    <TicketPurchaseForm event={event} />
                  )
                  // ----------------------------------------
                )}
              </div>

              {/* Trust badges - le afisam doar daca NU e extern */}
              {!event.isExternal && (
                <div className="mt-6 p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Plăți securizate prin Stripe</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}