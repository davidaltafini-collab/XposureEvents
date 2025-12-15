import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-cyan-500/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <h3 className="text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105">
                <span className="text-white">XPOSURE</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400 ml-1">
                  Events
                </span>
              </h3>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platforma ta de încredere pentru evenimente exclusive. Experiențe memorabile, bilete securizate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigare
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Evenimente
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal/terms"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Confidențialitate
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Politica Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="mailto:contact@xposure.events"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  contact@xposure.events
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-yellow-500/20 border border-white/10 hover:border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-yellow-500/20 border border-white/10 hover:border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-500 text-center md:text-left">
              © {currentYear} XPOSURE Events. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <span>Plăți securizate prin</span>
              <span className="font-semibold text-white">Stripe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </footer>
  );
}
