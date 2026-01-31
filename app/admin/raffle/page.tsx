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

  // 1. Încărcăm lista de evenimente
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/admin/events');
        const json = await res.json();
        if (Array.isArray(json)) setEvents(json);
        else if (json.events) setEvents(json.events);
      } catch (e) {
        console.error("Nu am putut încărca evenimentele", e);
      }
    }
    loadEvents();
  }, []);

  // 2. Încărcăm participanții
  useEffect(() => {
    fetchParticipants();
  }, [selectedEventId]);

  const fetchParticipants = async () => {
    setLoadingList(true);
    setWinner(null);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & FILTRE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b border-white/10 pb-6">
          <div>
             <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                🎱 Tombolă Centrală
             </h1>
             <p className="text-gray-400 mt-2 text-sm">
                Gestionează extragerile pentru toate evenimentele.
             </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-gray-300 font-medium text-sm px-2">Sursă:</span>
              <select 
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 min-w-[200px]"
              >
                  <option value="all">🌍 Toate Evenimentele</option>
                  <option disabled>──────────</option>
                  {events.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
              </select>
          </div>
        </div>

        {/* STATISTICI SIMPLE (Doar nr participanți) */}
        <div className="mb-8">
            <div className="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20 backdrop-blur-md flex items-center gap-4 max-w-xs">
                <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-300 text-2xl">
                    👥
                </div>
                <div>
                    <span className="block text-3xl font-bold text-white">{participants.length}</span>
                    <span className="text-sm text-indigo-200">Participanți calificați</span>
                </div>
            </div>
        </div>

        {/* BUTOANE ACȚIUNE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <button 
              onClick={() => runRaffle('random')}
              disabled={loading || participants.length === 0}
              className="group relative overflow-hidden p-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:scale-100 text-left"
          >
              <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl group-hover:scale-110 transition-transform">🎲</div>
              <span className="block text-2xl font-bold mb-2">Extragere Random</span>
              <span className="text-indigo-100 text-sm">Alege aleatoriu un câștigător dintre toți cei afișați.</span>
          </button>

          <button 
              onClick={() => runRaffle('top_buyer')}
              disabled={loading || participants.length === 0}
              className="group relative overflow-hidden p-8 bg-gray-800/50 rounded-2xl border border-white/10 hover:bg-gray-800 transition-all hover:border-indigo-500/50 disabled:opacity-50 text-left"
          >
               <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl text-white group-hover:scale-110 transition-transform">🏆</div>
               <span className="block text-2xl font-bold text-white mb-2">Cel Mai Fidel Client</span>
               <span className="text-gray-400 text-sm">Vezi cine a cumpărat cele mai multe bilete (cumulat).</span>
          </button>
        </div>

        {/* AFIȘARE CÂȘTIGĂTOR */}
        {winner && winner.data && (
          <div className="bg-gradient-to-b from-yellow-500/20 to-orange-600/10 border border-yellow-500/30 rounded-2xl p-8 mb-10 text-center shadow-2xl animate-fade-in relative backdrop-blur-md">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 uppercase tracking-wider glow-text">
              {winner.type === 'random' ? '🎉 Câștigătorul Tombolei 🎉' : '👑 Top Cumpărător 👑'}
            </h2>
            
            <div className="space-y-3">
              <p className="font-bold text-4xl md:text-5xl text-white mb-6">{winner.data.name}</p>
              
              <div className="inline-grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-black/20 p-6 rounded-xl border border-white/5 mx-auto max-w-2xl">
                  <div>
                      <p className="text-xs text-gray-400 uppercase">Email</p>
                      <p className="text-lg text-white">{winner.data.email}</p>
                  </div>
                  <div>
                      <p className="text-xs text-gray-400 uppercase">Telefon</p>
                      <p className="text-lg text-white">{winner.data.phone}</p>
                  </div>
                  <div>
                      <p className="text-xs text-gray-400 uppercase">Proveniență</p>
                      <p className="text-indigo-300 font-semibold">{winner.data.eventName}</p>
                  </div>
                  <div>
                      <p className="text-xs text-gray-400 uppercase">Cod Bilet</p>
                      <p className="font-mono text-yellow-200">{winner.data.code || winner.data.ticketCode}</p>
                  </div>
                  {winner.type === 'top_buyer' && (
                     <div className="col-span-2 border-t border-white/10 pt-3 mt-1">
                        <p className="text-center font-bold text-green-400 text-xl">Total bilete cumpărate: {winner.data.quantity}</p>
                     </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* TABEL PARTICIPANȚI */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
               <h3 className="font-bold text-white">Lista Participanți Calificați</h3>
          </div>
          
          {loadingList ? (
            <div className="p-10 text-center text-gray-400 animate-pulse">Se procesează datele...</div>
          ) : (
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
              <table className="min-w-full text-left text-sm text-gray-300">
                <thead className="bg-black/20 text-xs uppercase font-medium text-gray-400 sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Nume</th>
                    <th className="px-6 py-4">Eveniment</th>
                    <th className="px-6 py-4">Email / Telefon</th>
                    <th className="px-6 py-4 text-center">Bilete</th>
                    <th className="px-6 py-4 text-right">Dată</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {participants.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-500">{idx + 1}</td>
                      <td className="px-6 py-4 font-medium text-white text-base">{p.name}</td>
                      <td className="px-6 py-4 text-indigo-300">
                          {p.eventName}
                      </td>
                      <td className="px-6 py-4">
                          <div className="text-white">{p.email}</div>
                          <div className="text-xs text-gray-500">{p.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-white">{p.quantity}</td>
                      <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">
                        {new Date(p.purchasedAt).toLocaleDateString('ro-RO')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {participants.length === 0 && (
                  <div className="p-8 text-center text-gray-500">Niciun participant găsit pentru criteriile selectate.</div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}