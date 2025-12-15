import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plată Finalizată! 🎉
          </h1>

          {/* Description */}
          <div className="space-y-4 text-gray-300 mb-8">
            <p className="text-lg">
              Mulțumim pentru achiziție! Plata ta a fost procesată cu succes.
            </p>
            
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-start gap-3 text-left">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-white mb-2">Verifică emailul</p>
                  <p className="text-sm">
                    Biletele tale au fost trimise la adresa de email furnizată. 
                    Vei primi un email cu codul QR în câteva momente.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-start gap-3 text-left">
                <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-white mb-2">La eveniment</p>
                  <p className="text-sm">
                    Prezintă codul QR din email la intrarea în eveniment. 
                    Fiecare cod poate fi scanat o singură dată.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary inline-block"
            >
              Înapoi la Evenimente
            </Link>
            <a
              href="mailto:contact@xposure-events.ro"
              className="px-8 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
            >
              Contactează Suport
            </a>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 mt-8">
            Nu ai primit emailul? Verifică folder-ul spam sau contactează-ne.
          </p>
        </div>
      </div>
    </div>
  );
}
