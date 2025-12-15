'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  title: string;
  price: string;
  slug: string;
}

interface TicketPurchaseFormProps {
  event: Event;
}

export default function TicketPurchaseForm({ event }: TicketPurchaseFormProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          quantity,
          name,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eroare la procesarea cererii');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
          Număr bilete
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center text-lg font-semibold focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Nume complet
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ion Popescu"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ion.popescu@email.com"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          required
        />
        <p className="text-xs text-gray-500 mt-1.5">
          Biletele vor fi trimise la această adresă
        </p>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Telefon
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+40 700 000 000"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          required
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Total & Submit */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">Total</span>
          <span className="text-2xl font-bold gradient-text">
            {quantity} × {event.price}
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesare...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Cumpără bilete
            </span>
          )}
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Vei fi redirecționat către pagina de plată securizată Stripe
        </p>
      </div>
    </form>
  );
}
