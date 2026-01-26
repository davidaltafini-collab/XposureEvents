import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    where: {
      date: {
        gte: new Date(),
      },
      published: true,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-yellow-500/10 blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-white mb-2">Evenimente</span>
              <span className="block gradient-text text-glow">Exclusive</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Descoperă cele mai tari evenimente din oraș. Plăți securizate, bilete cu QR code, experiențe memorabile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                href="#events"
                className="btn-primary inline-block w-full sm:w-auto text-center"
              >
                Vezi Evenimente
              </a>
              <Link
                href="/about"
                className="px-8 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Află Mai Multe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div id="events" className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Evenimente Disponibile
            </h2>
            <p className="text-gray-400">
              {events.length} {events.length === 1 ? 'eveniment' : 'evenimente'} viitoare
            </p>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/10 to-yellow-500/10 mb-6">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Nu există evenimente momentan
            </h3>
            <p className="text-gray-400 mb-6">
              Verifică din nou în curând pentru evenimente noi
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
            >
              Contactează-ne
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event) => {
              const isSoldOut = event.soldCount >= event.capacity;
              const availableTickets = event.capacity - event.soldCount;
              const isLowStock = !isSoldOut && availableTickets <= 10;

              return (
                <Link
                  key={event.id}
                  href={`/event/${event.slug}`}
                  className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 card-hover"
                >
                  {/* Image */}
                  <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <Image
                      src={event.imagePath}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Status badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {isSoldOut && (
                        <span className="px-4 py-2 rounded-full font-bold text-sm bg-red-500 text-white shadow-lg backdrop-blur-sm">
                          SOLD OUT
                        </span>
                      )}
                      {isLowStock && (
                        <span className="px-4 py-2 rounded-full font-semibold text-sm bg-orange-500 text-white shadow-lg backdrop-blur-sm animate-pulse">
                          Ultimele {availableTickets} locuri!
                        </span>
                      )}
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {new Date(event.date).toLocaleDateString('ro-RO', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {new Date(event.date).toLocaleTimeString('ro-RO', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{event.locationName}</span>
                      </div>
                    </div>

                    {/* Price & Availability */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-2xl font-bold gradient-text">
                        {event.price} RON
                      </span>
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                        isSoldOut
                          ? 'bg-red-900/30 text-red-400 border border-red-500/50'
                          : 'bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {isSoldOut ? 'Sold Out' : `${availableTickets} locuri`}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-gray-800/50 to-yellow-500/10 p-8 md:p-12 border border-cyan-500/20">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Organizezi un eveniment?
            </h2>
            <p className="text-lg text-gray-300">
              Platforma noastră oferă totul pentru gestionarea biletelor: plăți securizate, QR codes, check-in digital și mult mai mult.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-block"
            >
              Contactează-ne
            </Link>
          </div>
          
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-yellow-500/20 rounded-full blur-3xl -z-0" />
        </div>
      </div>
    </div>
  );
}
