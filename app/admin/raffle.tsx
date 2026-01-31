'use client';

import { useState, useEffect } from 'react';

interface Participant {
  name: string;
  email: string;
  phone: string;
  quantity: number;
  ticketCode: string;
  eventName: string;
  purchasedAt: string;
}

interface EventOption {
  id: string;
  title: string;
}

export default function GlobalRafflePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [events, setEvents] = useState<EventOption[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  
  const [winner, setWinner] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  // 1. Încărcăm lista de evenimente pentru dropdown
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/admin/events'); // Presupun că ai un endpoint care returnează toate evenimentele
        const json = await res.json();
        // Verificăm structura răspunsului (adaptează dacă endpointul tău returnează altfel)
        if (Array.isArray(json)) setEvents(json);
        else if (json.events) setEvents(json.events);
      } catch (e) {
        console.error("Nu am putut încărca evenimentele", e);
      }
    }
    loadEvents();
  }, []);

  // 2. Încărcăm participanții când se schimbă filtrul
  useEffect(() => {
    fetchParticipants();
  }, [selectedEventId]);

  const fetchParticipants = async () => {
    setLoadingList(true);
    setWinner(null); // Resetăm câștigătorul când schimbăm filtrul
    try {
      const res = await fetch('/api/admin/raffle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: selectedEventId, action: 'list' }),
      });
      const json = await res.json();
      setParticipants(json.data || []);
    } catch (error) {
      console.error('Error fetching participants', error);
      setParticipants([]);
    } finally {
      setLoadingList(false);
    }
  };

  const runRaffle = async (action: 'random' | 'top_buyer') => {
    setLoading(true);
    setWinner(null);
    try {
      const res = await fetch('/api/admin/raffle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: selectedEventId, action }),
      });
      const json = await res.json();
      if(json.data) {
          setWinner({ type: action, data: json.data });
      } else {
          alert("Nu există date pentru extragere.");
      }
    } catch (error) {
      alert('Eroare la extragere');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-800">🎱 Tombolă Centrală</h1>
           <p className="text-gray-500 mt-1">Gestionează extragerile pentru toate evenimentele sau individual.</p>
        </div>
        
        {/* FILTRU SELECT */}
        <div className="bg-white p-2 rounded-lg shadow border border-gray-200 flex items-center gap-2">
            <span className="text-gray-600 font-medium px-2">Sursă Participanți:</span>
            <select 
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 min-w-[250px]"
            >
                <option value="all">🌍 Toate Evenimentele (Global)</option>
                <option disabled>──────────</option>
                {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                ))}
            </select>
        </div>
      </div>

      {/* Panou Statistici Rapide */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
              <span className="block text-3xl font-bold text-indigo-600">{participants.length}</span>
              <span className="text-sm text-indigo-800">Participanți în listă</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
               {/* Calculăm suma biletelor */}
              <span className="block text-3xl font-bold text-green-600">
                  {participants.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
              <span className="text-sm text-green-800">Total Bilete Vândute</span>
          </div>
      </div>

      {/* Butoane Acțiune */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <button 
            onClick={() => runRaffle('random')}
            disabled={loading || participants.length === 0}
            className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg text-white hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
        >
            <span className="text-2xl mb-2">🎲 Extrage Câștigător Random</span>
            <span className="opacity-80 text-sm">Alege aleatoriu dintre toți cei afișați mai jos</span>
        </button>

        <button 
            onClick={() => runRaffle('top_buyer')}
            disabled={loading || participants.length === 0}
            className="flex flex-col items-center justify-center p-8 bg-white border-2 border-indigo-100 rounded-2xl shadow-sm text-indigo-700 hover:bg-indigo-50 transition-colors disabled:opacity-50"
        >
             <span className="text-2xl mb-2">🏆 Cel Mai Fidel Client</span>
             <span className="opacity-80 text-sm">Vezi cine a cumpărat cele mai multe bilete (cumulat)</span>
        </button>
      </div>

      {/* Afișare Câștigător */}
      {winner && winner.data && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8 mb-10 text-center shadow-xl animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
          <h2 className="text-3xl font-bold text-yellow-800 mb-6 uppercase tracking-wider">
            {winner.type === 'random' ? '🎉 Avem un Câștigător! 🎉' : '👑 Top Cumpărător 👑'}
          </h2>
          
          <div className="text-xl space-y-2">
            <p className="font-bold text-4xl mb-4 text-gray-900">{winner.data.name}</p>
            <p className="text-gray-600">{winner.data.email}</p>
            <p className="text-gray-600">{winner.data.phone}</p>
            <div className="mt-4 pt-4 border-t border-yellow-200 inline-block">
                <p className="text-sm text-gray-500">Proveniență:</p>
                <p className="font-semibold text-indigo-700">{winner.data.eventName}</p>
                <p className="text-xs bg-white px-2 py-1 rounded border mt-2 mx-auto w-fit">
                    Cod: {winner.data.code || winner.data.ticketCode}
                </p>
                {winner.type === 'top_buyer' && (
                    <p className="mt-2 font-bold text-green-600 text-lg">Total bilete: {winner.data.quantity}</p>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
             <h3 className="font-bold text-gray-700">Lista Completă ({participants.length})</h3>
        </div>
        
        {loadingList ? (
          <div className="p-10 text-center text-gray-500">Se procesează datele...</div>
        ) : (
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Eveniment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bilete</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dată</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participants.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                        {p.eventName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{p.email}</div>
                        <div className="text-xs text-gray-400">{p.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{p.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(p.purchasedAt).toLocaleDateString('ro-RO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}