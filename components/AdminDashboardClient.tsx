'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  imagePath: string;
  capacity: number;
  soldCount: number;
  price: string;
  locationName: string;
  stripePaymentLink: string | null;  // FĂRĂ "?" - Prisma returnează null, nu undefined
  description: string | null;         // FĂRĂ "?" - consistență cu Prisma
  locationLink: string | null;        // FĂRĂ "?" - consistență cu Prisma
  published: boolean;
}

interface AdminDashboardClientProps {
  events: Event[];
}

export default function AdminDashboardClient({ events }: AdminDashboardClientProps) {
  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Header cu Quick Actions */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <Link
            href="/admin/scanner"
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Scanner Bilete</h3>
              <p className="text-sm text-gray-400">Scanează QR code-uri</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/admin/create-event"
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Eveniment Nou</h3>
              <p className="text-sm text-gray-400">Creează un eveniment</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Lista Evenimente */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-6 lg:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">Lista Evenimente</h2>
          <div className="text-sm text-gray-400">
            Total: {events.length} evenimente
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {events.map((event) => {
            const isSoldOut = event.soldCount >= event.capacity;
            const availableTickets = event.capacity - event.soldCount;
            const occupancyRate = (event.soldCount / event.capacity) * 100;

            return (
              <div
                key={event.id}
                className="bg-white/5 rounded-xl p-4 md:p-5 lg:p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="relative w-full sm:w-24 md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={event.imagePath}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-start gap-2 mb-1 flex-wrap">
                          <h3 className="text-base md:text-lg font-bold text-white">
                            {event.title}
                          </h3>
                          <span className={`flex-shrink-0 px-2 py-1 rounded-md text-xs font-medium ${
                            event.published
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {event.published ? 'Publicat' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-400">
                          {new Date(event.date).toLocaleDateString('ro-RO', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })} • {event.locationName}
                        </p>
                      </div>
                      <span className="text-base md:text-lg font-bold gradient-text flex-shrink-0">
                        {event.price}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-gray-400">
                          {event.soldCount} / {event.capacity} bilete
                        </span>
                        <span className={`font-semibold ${
                          isSoldOut ? 'text-red-400' : 'text-cyan-400'
                        }`}>
                          {occupancyRate.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isSoldOut
                              ? 'bg-red-500'
                              : occupancyRate > 80
                              ? 'bg-orange-500'
                              : 'bg-gradient-to-r from-cyan-500 to-yellow-500'
                          }`}
                          style={{ width: `${occupancyRate}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/event/${event.slug}`}
                        className="flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
                      >
                        Vezi detalii
                      </Link>
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
                      >
                        Editează
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {events.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium">Nu există evenimente</p>
                <p className="text-sm mt-2">Creează primul eveniment pentru a începe</p>
              </div>
              <Link
                href="/admin/create-event"
                className="inline-block px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-yellow-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                + Eveniment Nou
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}