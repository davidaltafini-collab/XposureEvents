'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function ScannerPage() {
  const [ticketCode, setTicketCode] = useState('');
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    ticket?: any;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerMode, setScannerMode] = useState<'camera' | 'manual'>('camera');
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerInitialized = useRef(false);

  // Initialize camera scanner
  useEffect(() => {
    if (scannerMode === 'camera' && !scannerInitialized.current) {
      scannerInitialized.current = true;
      
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          // Stop scanner on successful read
          scanner.clear();
          scannerInitialized.current = false;
          setTicketCode(decodedText);
          handleValidation(decodedText);
        },
        (error) => {
          // Ignore errors - they happen constantly while scanning
        }
      );

      scannerRef.current = scanner;

      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear().catch(() => {});
          scannerInitialized.current = false;
        }
      };
    }
  }, [scannerMode]);

  const handleValidation = async (code: string) => {
    if (!code.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    try {
      const response = await fetch('/api/admin/validate-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        setScanResult({
          success: true,
          message: 'Bilet valid! Intrare permisă.',
          ticket: data.ticket,
        });
        
        // Play success sound or vibration
        if ('vibrate' in navigator) {
          navigator.vibrate(200);
        }
      } else {
        setScanResult({
          success: false,
          message: data.error || 'Bilet invalid',
        });
        
        // Play error sound or vibration
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    } catch (error) {
      setScanResult({
        success: false,
        message: 'Eroare la verificarea biletului',
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleValidation(ticketCode);
  };

  const handleReset = () => {
    setScanResult(null);
    setTicketCode('');
    if (scannerMode === 'camera') {
      scannerInitialized.current = false;
      setScannerMode('manual');
      setTimeout(() => setScannerMode('camera'), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoi la Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Scanner Bilete QR</h1>
          <p className="text-gray-400 text-sm">Scanează sau introdu manual codul biletului</p>
        </div>

        {/* Mode Toggle */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/10 flex gap-2 mb-6">
          <button
            onClick={() => {
              setScannerMode('camera');
              setScanResult(null);
              setTicketCode('');
            }}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              scannerMode === 'camera'
                ? 'bg-gradient-to-r from-cyan-500 to-yellow-500 text-gray-900 shadow-lg shadow-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Cameră
            </span>
          </button>
          <button
            onClick={() => {
              setScannerMode('manual');
              setScanResult(null);
            }}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              scannerMode === 'manual'
                ? 'bg-gradient-to-r from-cyan-500 to-yellow-500 text-gray-900 shadow-lg shadow-cyan-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Manual
            </span>
          </button>
        </div>

        {/* Scanner/Manual Input */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          {scannerMode === 'camera' ? (
            <div>
              <div id="qr-reader" className="rounded-xl overflow-hidden"></div>
              <p className="text-sm text-gray-400 text-center mt-4">
                Poziționează codul QR în fața camerei
              </p>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label htmlFor="ticketCode" className="block text-sm font-medium text-gray-300 mb-3">
                  Cod Bilet
                </label>
                <input
                  id="ticketCode"
                  type="text"
                  value={ticketCode}
                  onChange={(e) => setTicketCode(e.target.value)}
                  placeholder="Introdu codul biletului"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  disabled={isScanning}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isScanning || !ticketCode.trim()}
                className="w-full px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-yellow-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Se validează...
                  </span>
                ) : (
                  'Validează Bilet'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div
              className={`p-6 rounded-xl border-2 ${
                scanResult.success
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-red-500/10 border-red-500/50'
              }`}
            >
              <div className="flex items-start gap-4">
                {scanResult.success ? (
                  <svg className="w-12 h-12 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <div className="flex-1">
                  <p className={`text-xl font-bold mb-3 ${
                    scanResult.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {scanResult.message}
                  </p>
                  {scanResult.ticket && (
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Eveniment:</strong> {scanResult.ticket.eventTitle}</p>
                      <p><strong>Nume:</strong> {scanResult.ticket.name}</p>
                      <p><strong>Email:</strong> {scanResult.ticket.email}</p>
                      <p><strong>Cantitate:</strong> {scanResult.ticket.quantity} bilet(e)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleReset}
              className="w-full mt-4 px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              Scanează Următorul Bilet
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 mt-6">
          <p className="text-sm text-gray-400 flex items-start gap-2">
            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Folosește camera pentru a scana codul QR sau introdu manual codul pentru validare.
              Fiecare bilet poate fi scanat o singură dată.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
