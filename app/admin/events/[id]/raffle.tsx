'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Participant {
  name: string;
  email: string;
  phone: string;
  quantity: number;
  ticketCode: string;
  purchasedAt: string;
}

export default function RafflePage() {
  const params = useParams();
  const eventId = params.id as string;
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  // 1. Încarcă lista de participanți la intrarea pe pagină
  useEffect(() => {
    fetchParticipants();
  }, [eventId]);

  const fetchParticipants = async () => {
    try {
      const res = await fetch('/api/admin/raffle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, action: 'list' }),
      });
      const json = await res.json();
      if (json.data) {
        setParticipants(json.data);
      }
    } catch (error) {
      console.error('Error fetching participants', error);
    } finally {
      setLoadingList(false);
    }
  };

  // 2. Funcția generică pentru acțiunile tombolei
  const runRaffle = async (action: 'random' | 'first' | 'top_buyer') => {
    setLoading(true);
    setWinner(null);
    try {
      const res = await fetch('/api/admin/raffle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, action }),
      });
      const json = await res.json();
      setWinner({ type: action, data: json.data });
    } catch (error) {
      alert('Eroare la extragere');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Sistem Tombolă & Statistici</h1>

      {/* Zona de Control */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card 
          title="Extragere Aleatorie" 
          description="Alege un câștigător random dintre toți plătitorii."
          buttonText="Extrage Câștigător"
          onClick={() => runRaffle('random')}
          loading={loading}
        />
        <Card 
          title="Primul Venit" 
          description="Vezi cine a cumpărat primul bilet la acest eveniment."
          buttonText="Vezi Primul Client"
          onClick={() => runRaffle('first')}
          loading={loading}
        />
        <Card 
          title="Cel mai mare fan" 
          description="Persoana care a cumpărat cele mai multe bilete."
          buttonText="Vezi Top Cumpărător"
          onClick={() => runRaffle('top_buyer')}
          loading={loading}
        />
      </div>

      {/* Afișare Câștigător / Rezultat */}
      {winner && winner.data && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            {winner.type === 'random' && '🎉 Câștigătorul Tombolei 🎉'}
            {winner.type === 'first' && '🥇 Primul Client 🥇'}
            {winner.type === 'top_buyer' && '🏆 Cel mai mare cumpărător 🏆'}
          </h2>
          <div className="flex flex-col items-center text-lg">
            <p className="font-bold text-xl">{winner.data.name}</p>
            <p className="text-gray-600">{winner.data.email}</p>
            <p className="text-gray-600">{winner.data.phone}</p>
            <p className="mt-2 text-sm bg-white px-3 py-1 rounded border">
              Cod Bilet: <span className="font-mono">{winner.data.code || winner.data.ticketCode}</span>
            </p>
            {winner.type === 'top_buyer' && (
              <p className="mt-2 font-bold text-green-600">Total bilete cumpărate: {winner.data.quantity}</p>
            )}
          </div>
        </div>
      )}

      {/* Tabel Participanți */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Participanți Confirmați ({participants.length})
          </h3>
          <button 
            onClick={fetchParticipants}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reîmprospătează lista
          </button>
        </div>
        
        {loadingList ? (
          <div className="p-6 text-center text-gray-500">Se încarcă lista...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bilete</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participants.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(p.purchasedAt).toLocaleDateString('ro-RO')} {new Date(p.purchasedAt).toLocaleTimeString('ro-RO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {participants.length === 0 && (
              <div className="p-6 text-center text-gray-500">Niciun bilet plătit găsit pentru acest eveniment.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Componentă mică pentru Carduri UI
function Card({ title, description, buttonText, onClick, loading }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4 min-h-[40px]">{description}</p>
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 font-medium"
      >
        {loading ? 'Se procesează...' : buttonText}
      </button>
    </div>
  );
}