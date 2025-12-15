'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    price: '',
    capacity: '',
    locationName: '',
    locationAddress: '',
    locationMapsUrl: '',
    imagePath: '',
    stripePaymentLink: '',
    published: false,
    // --- CAMPURI NOI ---
    isExternal: false,
    externalUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validare simplă pentru imagine
      if (!formData.imagePath) {
        throw new Error('Te rog încarcă o imagine pentru eveniment.');
      }

      // --- VALIDARE NOUA ---
      if (formData.isExternal) {
        if (!formData.externalUrl) throw new Error('Te rog introdu link-ul extern (ex: Google Forms).');
      } else {
        if (!formData.stripePaymentLink) throw new Error('Te rog introdu link-ul de plată Stripe.');
      }

      // Combinăm data și ora
      const dateTimeString = `${formData.date}T${formData.time}:00`;
      const eventDate = new Date(dateTimeString);

      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: eventDate.toISOString(),
          price: parseFloat(formData.price),
          capacity: parseInt(formData.capacity),
          locationName: formData.locationName,
          locationAddress: formData.locationAddress,
          locationMapsUrl: formData.locationMapsUrl || null,
          imagePath: formData.imagePath,
          stripePaymentLink: formData.stripePaymentLink || null,
          published: formData.published,
          // --- TRIMITEM NOILE DATE ---
          isExternal: formData.isExternal,
          externalUrl: formData.externalUrl || null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      // Redirect la dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi la Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Creează Eveniment Nou</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Titlu Eveniment *
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="Ex: Concert Live - Artist Name"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Descriere
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                placeholder="Descrie evenimentul..."
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  Data *
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                  Ora *
                </label>
                <input
                  id="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            {/* Price and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                  Preț (RON) *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Ex: 150"
                />
              </div>
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-2">
                  Capacitate *
                </label>
                <input
                  id="capacity"
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Ex: 500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="locationName" className="block text-sm font-medium text-gray-300 mb-2">
                Nume Locație *
              </label>
              <input
                id="locationName"
                type="text"
                required
                value={formData.locationName}
                onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="Ex: Arena Națională"
              />
            </div>

            <div>
              <label htmlFor="locationAddress" className="block text-sm font-medium text-gray-300 mb-2">
                Adresă Locație *
              </label>
              <input
                id="locationAddress"
                type="text"
                required
                value={formData.locationAddress}
                onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="Ex: Str. Basarabia nr. 37-39, București"
              />
            </div>

            <div>
              <label htmlFor="locationMapsUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Link Google Maps
              </label>
              <input
                id="locationMapsUrl"
                type="url"
                value={formData.locationMapsUrl}
                onChange={(e) => setFormData({ ...formData, locationMapsUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="http://googleusercontent.com/maps.google.com/..."
              />
            </div>

            {/* Image Upload Component */}
            <div>
              <ImageUpload 
                onUploadComplete={(url) => setFormData(prev => ({ ...prev, imagePath: url }))}
                existingImage={formData.imagePath}
              />
              <input 
                type="text" 
                required 
                value={formData.imagePath} 
                onChange={() => {}} 
                className="sr-only" 
                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Te rog încarcă o imagine')}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
              />
            </div>

            {/* --- SECTIUNE NOUA: TIP EVENIMENT (STRIPE vs EXTERN) --- */}
            <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl space-y-4">
              <h3 className="text-white font-bold text-lg">Setări Înscriere / Plată</h3>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isExternal"
                  checked={formData.isExternal}
                  onChange={(e) => setFormData({ ...formData, isExternal: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/5 border-white/20 text-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
                />
                <label htmlFor="isExternal" className="text-white cursor-pointer select-none">
                  Folosește <b>Link Extern</b> (ex: Google Forms)
                  <span className="block text-xs text-gray-400 font-normal">
                    Dacă bifezi asta, plata Stripe va fi dezactivată.
                  </span>
                </label>
              </div>

              {/* Arătăm Input-ul în funcție de ce e bifat */}
              {formData.isExternal ? (
                // INPUT PENTRU GOOGLE FORMS
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label htmlFor="externalUrl" className="block text-sm font-medium text-cyan-400 mb-2">
                    Link Extern (Google Forms, etc.) *
                  </label>
                  <input
                    id="externalUrl"
                    type="url"
                    required={formData.isExternal}
                    value={formData.externalUrl}
                    onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="https://docs.google.com/forms/..."
                  />
                </div>
              ) : (
                // INPUT PENTRU STRIPE (STANDARD)
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label htmlFor="stripePaymentLink" className="block text-sm font-medium text-gray-300 mb-2">
                    Link Plată Stripe *
                  </label>
                  <input
                    id="stripePaymentLink"
                    type="url"
                    required={!formData.isExternal}
                    value={formData.stripePaymentLink}
                    onChange={(e) => setFormData({ ...formData, stripePaymentLink: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="https://buy.stripe.com/..."
                  />
                </div>
              )}
            </div>

            {/* Published Status */}
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
              <input
                id="published"
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded bg-white/5 border-white/20 text-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-300 cursor-pointer select-none">
                Publică evenimentul imediat
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Se creează...
                  </span>
                ) : (
                  'Creează Eveniment'
                )}
              </button>
              <Link
                href="/admin"
                className="px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                Anulează
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}