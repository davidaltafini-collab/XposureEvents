'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  date: string;
  imagePath: string;
  price: string;
  capacity: number;
  soldCount: number;
  locationName: string;
  locationAddress: string;
  locationMapsUrl: string | null;
  // FIX 1: Acceptăm null aici
  stripePaymentLink: string | null;
  published: boolean;
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [event, setEvent] = useState<Event | null>(null);
  
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
    published: false
  });

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/admin/events/${params.id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        const evt = data.event;
        setEvent(evt);

        // Parse date and time
        const eventDate = new Date(evt.date);
        const dateStr = eventDate.toISOString().split('T')[0];
        const timeStr = eventDate.toTimeString().slice(0, 5);

        setFormData({
          title: evt.title,
          description: evt.description || '',
          date: dateStr,
          time: timeStr,
          price: evt.price,
          capacity: evt.capacity.toString(),
          locationName: evt.locationName,
          locationAddress: evt.locationAddress,
          locationMapsUrl: evt.locationMapsUrl || '',
          imagePath: evt.imagePath,
          // FIX 2: Dacă e null, punem ghilimele goale ca să nu crape input-ul
          stripePaymentLink: evt.stripePaymentLink || '',
          published: evt.published
        });
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (!formData.imagePath) {
        throw new Error('Te rog încarcă o imagine sau las-o pe cea veche.');
      }

      const dateTime = `${formData.date}T${formData.time}:00`;
      const eventDate = new Date(dateTime);

      const response = await fetch(`/api/admin/events/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
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
          stripePaymentLink: formData.stripePaymentLink,
          published: formData.published
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update event');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Ești sigur că vrei să ștergi acest eveniment? Această acțiune nu poate fi anulată.')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/events/${params.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete event');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Se încarcă...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Evenimentul nu a fost găsit</div>
      </div>
    );
  }

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
          <h1 className="text-3xl md:text-4xl font-bold text-white">Editează Eveniment</h1>
          <p className="text-gray-400 mt-2">
            {event.soldCount} / {event.capacity} bilete vândute
          </p>
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
              />
              <p className="text-xs text-gray-500 mt-1">
                Slug actual: {event.slug}
              </p>
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
                  Preț *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
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
                  min={event.soldCount}
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                {event.soldCount > 0 && (
                  <p className="text-xs text-yellow-400 mt-1">
                    Capacitatea nu poate fi mai mică decât biletele vândute ({event.soldCount})
                  </p>
                )}
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
                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Imaginea este obligatorie')}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
              />
            </div>

            {/* Stripe Payment Link */}
            <div>
              <label htmlFor="stripePaymentLink" className="block text-sm font-medium text-gray-300 mb-2">
                Link Plată Stripe *
              </label>
              <input
                id="stripePaymentLink"
                type="url"
                required
                value={formData.stripePaymentLink}
                onChange={(e) => setFormData({ ...formData, stripePaymentLink: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
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
                Eveniment publicat (vizibil pentru public)
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-yellow-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Se salvează...' : 'Salvează Modificări'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting || event.soldCount > 0}
                className="px-6 py-3 rounded-xl font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? 'Se șterge...' : 'Șterge Eveniment'}
              </button>
              <Link
                href="/admin"
                className="px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                Anulează
              </Link>
            </div>

            {event.soldCount > 0 && (
              <p className="text-sm text-yellow-400">
                * Evenimentul nu poate fi șters deoarece are bilete vândute
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}