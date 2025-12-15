export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            Politica de Confidențialitate
          </h1>
          <p className="text-gray-400">
            Ultima actualizare: Decembrie 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 space-y-8">
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
            <p className="text-gray-300 leading-relaxed">
              XPOSURE Events respectă confidențialitatea dumneavoastră și se angajează să protejeze datele 
              personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR - Regulamentul UE 2016/679).
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              1. Operator de Date
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">Operator:</strong> {process.env.COMPANY_NAME || 'XPOSURE Events'}<br />
                <strong className="text-white">Email contact:</strong> {process.env.COMPANY_EMAIL || 'contact@xposure-events.ro'}<br />
                <strong className="text-white">Telefon:</strong> {process.env.COMPANY_PHONE || '+40 XXX XXX XXX'}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              2. Date Personale Colectate
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Colectăm următoarele categorii de date personale atunci când achiziționați bilete:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Date de identificare:</strong> Nume complet</li>
                <li><strong className="text-white">Date de contact:</strong> Adresă de email, număr de telefon</li>
                <li><strong className="text-white">Date de tranzacție:</strong> Detalii despre achiziție (eveniment, cantitate, preț)</li>
                <li><strong className="text-white">Date tehnice:</strong> Adresă IP, tip browser, sistem de operare</li>
              </ul>
              <p className="pt-3">
                <strong className="text-white">Importante:</strong> Nu stocăm informații despre cardurile de credit/debit. 
                Toate plățile sunt procesate în siguranță prin Stripe, care este certificat PCI DSS Level 1.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              3. Scopul Prelucrării Datelor
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Prelucrăm datele dumneavoastră personale în următoarele scopuri:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Procesarea comenzilor și emiterea biletelor</li>
                <li>Trimiterea biletelor electronice prin email</li>
                <li>Verificarea identității la intrarea în eveniment</li>
                <li>Comunicarea informațiilor importante despre eveniment</li>
                <li>Prevenirea fraudelor și asigurarea securității</li>
                <li>Respectarea obligațiilor legale</li>
                <li>Îmbunătățirea serviciilor noastre</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              4. Temeiul Legal al Prelucrării
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Prelucrăm datele dumneavoastră pe baza următoarelor temeiuri legale:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Executarea contractului:</strong> Pentru a procesa achiziția de bilete</li>
                <li><strong className="text-white">Obligație legală:</strong> Pentru conformarea cu cerințele fiscale și legale</li>
                <li><strong className="text-white">Consimțământ:</strong> Pentru comunicări de marketing (doar dacă ați acordat consimțământul)</li>
                <li><strong className="text-white">Interese legitime:</strong> Pentru îmbunătățirea serviciilor și prevenirea fraudelor</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              5. Partajarea Datelor
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Partajăm datele dumneavoastră doar cu următorii parteneri de încredere:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Stripe:</strong> Procesarea plăților (conform cu PCI DSS)</li>
                <li><strong className="text-white">Furnizori de email:</strong> Pentru trimiterea biletelor și comunicărilor</li>
                <li><strong className="text-white">Organizatori de evenimente:</strong> Pentru verificarea intrării și gestionarea evenimentului</li>
              </ul>
              <p className="pt-3">
                <strong className="text-white">Nu vindem sau închiriem</strong> datele dumneavoastră personale către terți 
                pentru scopuri de marketing.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              6. Perioada de Stocare
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Păstrăm datele dumneavoastră personale pentru următoarele perioade:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Date de tranzacție:</strong> 5 ani (conform cerințelor fiscale)</li>
                <li><strong className="text-white">Date de contact:</strong> Până la retragerea consimțământului pentru marketing</li>
                <li><strong className="text-white">Date tehnice:</strong> Maximum 2 ani</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              7. Drepturile Dumneavoastră GDPR
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                În conformitate cu GDPR, aveți următoarele drepturi:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Dreptul de acces:</strong> Puteți solicita o copie a datelor personale</li>
                <li><strong className="text-white">Dreptul la rectificare:</strong> Puteți corecta datele inexacte</li>
                <li><strong className="text-white">Dreptul la ștergere:</strong> Puteți solicita ștergerea datelor ("dreptul de a fi uitat")</li>
                <li><strong className="text-white">Dreptul la restricționare:</strong> Puteți restricționa prelucrarea</li>
                <li><strong className="text-white">Dreptul la portabilitate:</strong> Puteți primi datele într-un formatStructurat</li>
                <li><strong className="text-white">Dreptul la opoziție:</strong> Puteți refuza prelucrarea pentru marketing</li>
                <li><strong className="text-white">Dreptul de a depune plângere:</strong> La Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</li>
              </ul>
              <p className="pt-4">
                Pentru a vă exercita aceste drepturi, contactați-ne la:{' '}
                <a href="mailto:gdpr@xposure-events.ro" className="text-cyan-400 hover:text-cyan-300 underline">
                  gdpr@xposure-events.ro
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              8. Securitatea Datelor
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Implementăm măsuri tehnice și organizatorice corespunzătoare pentru a proteja datele dumneavoastră:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Criptare SSL/TLS pentru toate transmisiile de date</li>
                <li>Stocarea securizată în baze de date protejate</li>
                <li>Acces restricționat doar pentru personalul autorizat</li>
                <li>Monitorizare și auditare regulată a sistemelor</li>
                <li>Planuri de răspuns la incidente de securitate</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              9. Cookies
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Utilizăm cookies pentru a îmbunătăți experiența dumneavoastră pe platformă. 
                Pentru mai multe informații, consultați{' '}
                <a href="/legal/cookies" className="text-cyan-400 hover:text-cyan-300 underline">
                  Politica de Cookies
                </a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-yellow-500 rounded-full" />
              10. Modificări ale Politicii
            </h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                Ne rezervăm dreptul de a actualiza această Politică de Confidențialitate. Orice modificare 
                va fi publicată pe această pagină cu data actualizării. Vă recomandăm să verificați periodic 
                această pagină pentru a fi la curent cu eventualele modificări.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-white/10">
            <div className="bg-white/5 rounded-xl p-6 border border-cyan-500/20">
              <p className="text-sm text-gray-400 mb-3">
                <strong className="text-white block mb-2">Contact pentru Protecția Datelor:</strong>
              </p>
              <p className="text-gray-300">
                Email: <a href={`mailto:${process.env.COMPANY_EMAIL || 'gdpr@xposure-events.ro'}`} className="text-cyan-400 hover:text-cyan-300 underline">{process.env.COMPANY_EMAIL || 'gdpr@xposure-events.ro'}</a><br />
                Adresă: {process.env.COMPANY_ADDRESS || '[Adresa completă a companiei]'}<br />
                Telefon: {process.env.COMPANY_PHONE || '+40 XXX XXX XXX'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
