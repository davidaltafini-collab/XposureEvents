export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            Politica de Cookies
          </h1>
          <p className="text-gray-400">
            Ultima actualizare: Decembrie 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 space-y-8">
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
            <p className="text-gray-300 leading-relaxed">
              Această Politică de Cookies explică ce sunt cookies, cum le folosim pe platforma XPOSURE Events, 
              și cum puteți controla utilizarea acestora.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              1. Ce Sunt Cookies?
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Cookies sunt fișiere text mici care sunt stocate pe dispozitivul dumneavoastră (computer, tabletă 
                sau telefon mobil) atunci când vizitați un site web. Acestea permit site-ului să vă recunoască 
                și să memoreze preferințele dumneavoastră.
              </p>
              <p>
                Cookies pot fi:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Cookies de sesiune:</strong> Sunt șterse când închideți browserul</li>
                <li><strong className="text-white">Cookies persistente:</strong> Rămân pe dispozitiv pentru o perioadă determinată</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              2. Cum Folosim Cookies
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Folosim cookies pentru următoarele scopuri:
              </p>
            </div>
          </section>

          {/* Essential Cookies */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              2.1 Cookies Esențiale (Strict Necesare)
            </h3>
            <p className="text-gray-300 mb-3">
              Aceste cookies sunt necesare pentru funcționarea corectă a platformei și nu pot fi dezactivate.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Cookie</th>
                  <th className="text-left py-2 text-white">Scop</th>
                  <th className="text-left py-2 text-white">Durată</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="py-2">session_id</td>
                  <td className="py-2">Menține sesiunea utilizatorului</td>
                  <td className="py-2">Sesiune</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">csrf_token</td>
                  <td className="py-2">Protecție împotriva atacurilor CSRF</td>
                  <td className="py-2">Sesiune</td>
                </tr>
                <tr>
                  <td className="py-2">cookie_consent</td>
                  <td className="py-2">Stochează preferințele de cookies</td>
                  <td className="py-2">1 an</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Functional Cookies */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              2.2 Cookies Funcționale
            </h3>
            <p className="text-gray-300 mb-3">
              Aceste cookies permit memorarea preferințelor și îmbunătățesc experiența utilizatorului.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Cookie</th>
                  <th className="text-left py-2 text-white">Scop</th>
                  <th className="text-left py-2 text-white">Durată</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="py-2">language_pref</td>
                  <td className="py-2">Memorează limba preferată</td>
                  <td className="py-2">6 luni</td>
                </tr>
                <tr>
                  <td className="py-2">cart_items</td>
                  <td className="py-2">Stochează biletele în coș</td>
                  <td className="py-2">1 săptămână</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Analytics Cookies */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              2.3 Cookies Analitice
            </h3>
            <p className="text-gray-300 mb-3">
              Acestea ne ajută să înțelegem cum vizitatorii interacționează cu platforma noastră.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Cookie</th>
                  <th className="text-left py-2 text-white">Scop</th>
                  <th className="text-left py-2 text-white">Durată</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="py-2">_ga</td>
                  <td className="py-2">Google Analytics - identificare vizitatori</td>
                  <td className="py-2">2 ani</td>
                </tr>
                <tr>
                  <td className="py-2">_gid</td>
                  <td className="py-2">Google Analytics - statistici utilizare</td>
                  <td className="py-2">24 ore</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-400 mt-3">
              * Cookies analitice necesită consimțământul dumneavoastră
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              3. Cookies de la Terți
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Unele servicii pe care le folosim pot seta propriile cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Stripe:</strong> Pentru procesarea plăților securizate 
                  (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Politica de confidențialitate Stripe</a>)
                </li>
                <li>
                  <strong className="text-white">Google Analytics:</strong> Pentru analiza traficului 
                  (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Politica de confidențialitate Google</a>)
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              4. Controlul Cookies
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Aveți control complet asupra cookies prin:
              </p>

              <div className="bg-white/5 rounded-xl p-6 border border-yellow-500/20 mt-4">
                <h3 className="text-lg font-bold text-white mb-3">4.1 Setările Browserului</h3>
                <p className="mb-3">
                  Majoritatea browserelor permit controlul cookies prin setări. Consultați ghidurile:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/ro/kb/cookies" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                      Safari
                    </a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/ro-ro/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-yellow-500/20 mt-4">
                <h3 className="text-lg font-bold text-white mb-3">4.2 Panoul de Preferințe Cookies</h3>
                <p className="mb-3">
                  Puteți gestiona preferințele de cookies direct pe site-ul nostru prin banner-ul de consimțământ 
                  care apare la prima vizită.
                </p>
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Notă:</strong> Dezactivarea unor cookies poate afecta funcționalitatea 
                  platformei.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              5. Actualizări ale Politicii
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Ne rezervăm dreptul de a actualiza această Politică de Cookies. Orice modificare va fi publicată 
                pe această pagină cu data actualizării.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              6. Contact
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Pentru întrebări despre utilizarea cookies, contactați-ne:
              </p>
              <div className="bg-white/5 rounded-xl p-6 border border-cyan-500/20 mt-4">
                <p className="text-white font-medium mb-2">{process.env.COMPANY_NAME || 'XPOSURE Events'}</p>
                <p>Email: <a href={`mailto:${process.env.COMPANY_EMAIL || 'contact@xposure-events.ro'}`} className="text-cyan-400 hover:text-cyan-300 underline">{process.env.COMPANY_EMAIL || 'contact@xposure-events.ro'}</a></p>
                <p>Telefon: {process.env.COMPANY_PHONE || '+40 XXX XXX XXX'}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
