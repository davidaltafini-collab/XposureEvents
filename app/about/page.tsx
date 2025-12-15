import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-yellow-500/10 blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block text-white mb-2">Despre</span>
              <span className="block gradient-text text-glow">XPOSURE Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transformăm experiențele în amintiri de neuitat prin tehnologie și pasiune pentru evenimente
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        {/* Mission */}
        <div className="mb-16 md:mb-20">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-yellow-500/20 mb-6">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Misiunea Noastră</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                La XPOSURE Events, ne dedicăm să creăm experiențe memorabile prin simplificarea procesului 
                de ticketing și gestionare evenimente. Credem că fiecare eveniment merită o platformă care 
                pune pe primul plan siguranța, accesibilitatea și inovația.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Valorile Noastre
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Innovation */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inovație</h3>
              <p className="text-gray-300 leading-relaxed">
                Folosim tehnologie de vârf pentru a oferi cele mai bune soluții de ticketing. 
                De la QR codes la plăți securizate prin Stripe, totul este gândit pentru viitor.
              </p>
            </div>

            {/* Security */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 mb-6">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Securitate</h3>
              <p className="text-gray-300 leading-relaxed">
                Datele și plățile tale sunt protejate cu cele mai înalte standarde de securitate. 
                Conformitate GDPR și PCI DSS garantează siguranța informațiilor.
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-yellow-500/10 mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Experiență</h3>
              <p className="text-gray-300 leading-relaxed">
                Fiecare detaliu contează. De la design la funcționalitate, totul este optimizat 
                pentru a-ți oferi cea mai bună experiență posibilă.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Ce Oferim
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                ),
                title: 'Bilete Digitale cu QR Code',
                description: 'Fiecare bilet conține un cod QR unic pentru acces rapid și securizat la eveniment.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                ),
                title: 'Plăți Securizate prin Stripe',
                description: 'Procesăm toate plățile prin Stripe, lider mondial în siguranța tranzacțiilor online.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                ),
                title: 'Mobile-First Design',
                description: 'Platforma este optimizată pentru mobile, oferind o experiență perfectă pe orice dispozitiv.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                ),
                title: 'Livrare Instant prin Email',
                description: 'Primești biletele imediat după achiziție, direct în inbox-ul tău.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: 'Scanare și Validare',
                description: 'Sistem integrat de scanare QR pentru check-in rapid și eficient la evenimente.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
                title: 'Dashboard pentru Organizatori',
                description: 'Administrare completă a evenimentelor, vânzări și participanți dintr-un singur loc.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-yellow-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-gray-800/50 to-yellow-500/10 p-8 md:p-12 border border-cyan-500/20">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Gata să începem?
            </h2>
            <p className="text-lg text-gray-300">
              Indiferent dacă organizezi evenimente sau cauți experiențe noi, suntem aici pentru tine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn-primary inline-block"
              >
                Vezi Evenimente
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
          
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-yellow-500/20 rounded-full blur-3xl -z-0" />
        </div>
      </div>
    </div>
  );
}
