export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            Termeni și Condiții
          </h1>
          <p className="text-gray-400">
            Ultima actualizare: Decembrie 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              1. Acceptarea Termenilor
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Prin accesarea și utilizarea platformei XPOSURE Events, confirmați că ați citit, înțeles și acceptat 
                să fiți legat de acești Termeni și Condiții. Dacă nu sunteți de acord cu acești termeni, 
                vă rugăm să nu utilizați platforma noastră.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              2. Cumpărarea Biletelor
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">2.1 Proces de achiziție:</strong> Toate achizițiile de bilete se procesează 
                prin intermediul platformei Stripe, un furnizor de plăți securizat de nivel mondial.
              </p>
              <p>
                <strong className="text-white">2.2 Prețuri:</strong> Prețurile afișate sunt finale și includ toate taxele 
                aplicabile, dacă nu este specificat altfel.
              </p>
              <p>
                <strong className="text-white">2.3 Confirmare:</strong> După finalizarea plății, veți primi un email de 
                confirmare cu biletul în format PDF, care conține un cod QR unic pentru fiecare bilet achiziționat.
              </p>
              <p>
                <strong className="text-white">2.4 Validitate:</strong> Fiecare bilet este valabil doar pentru evenimentul 
                și data specificate. Biletele nu pot fi transferate între evenimente diferite.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              3. Politica de Rambursare
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">3.1 Anulare de către organizator:</strong> În cazul în care un eveniment 
                este anulat de organizator, veți primi o rambursare completă în termen de 14 zile lucrătoare.
              </p>
              <p>
                <strong className="text-white">3.2 Cereri de rambursare:</strong> Cererile de rambursare din partea 
                participanților trebuie să fie făcute cu minimum 7 zile înainte de eveniment și sunt supuse unei taxe 
                de procesare de 10%.
              </p>
              <p>
                <strong className="text-white">3.3 Evenimente sold-out:</strong> Pentru evenimente complet vândute, 
                rambursările nu sunt permise cu mai puțin de 7 zile înainte de eveniment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              4. Acces la Evenimente
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">4.1 Cod QR:</strong> Pentru a accesa evenimentul, trebuie să prezentați 
                codul QR din biletul dumneavoastră. Acest cod va fi scanat la intrare pentru validare.
              </p>
              <p>
                <strong className="text-white">4.2 Utilizare unică:</strong> Fiecare cod QR poate fi scanat o singură 
                dată. După scanare, biletul este considerat utilizat și nu mai poate fi folosit din nou.
              </p>
              <p>
                <strong className="text-white">4.3 Identitate:</strong> Organizatorii își rezervă dreptul de a solicita 
                dovada identității la intrare.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              5. Responsabilități
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">5.1 Limitarea răspunderii:</strong> XPOSURE Events acționează ca 
                platformă de vânzare bilete. Responsabilitatea pentru organizarea și desfășurarea evenimentului 
                revine în totalitate organizatorului.
              </p>
              <p>
                <strong className="text-white">5.2 Modificări ale evenimentului:</strong> Organizatorii își rezervă 
                dreptul de a modifica detaliile evenimentului (locație, oră, artiști) cu notificare prealabilă.
              </p>
              <p>
                <strong className="text-white">5.3 Comportament:</strong> Participanții sunt responsabili pentru 
                comportamentul lor. Organizatorii pot refuza intrarea sau pot solicita părăsirea evenimentului 
                fără rambursare în cazul comportamentului inadecvat.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              6. Protecția Datelor
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Informațiile dumneavoastră personale sunt procesate conform cu Regulamentul General privind Protecția 
                Datelor (GDPR) și Politica noastră de Confidențialitate. Pentru detalii complete, consultați 
                <a href="/legal/privacy" className="text-cyan-400 hover:text-cyan-300 ml-1 underline">
                  Politica de Confidențialitate
                </a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              7. Contact
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Pentru întrebări sau nelămuriri legate de acești Termeni și Condiții, ne puteți contacta la:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20 mt-4">
                <p className="font-medium text-white mb-2">{process.env.COMPANY_NAME || 'XPOSURE Events'}</p>
                <p>Email: {process.env.COMPANY_EMAIL || 'contact@xposure-events.ro'}</p>
                <p>Telefon: {process.env.COMPANY_PHONE || '+40 XXX XXX XXX'}</p>
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500 text-center">
              Acești Termeni și Condiții sunt guvernați de legile din România. 
              Orice dispută va fi rezolvată de instanțele competente din România.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
