'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Evenimente' },
    { href: '/about', label: 'Despre' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-tight transition-all duration-300 hover:scale-105"
          >
            <span className="text-white">XPOSURE</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400 ml-1">
              Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  isActive(link.href)
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-yellow-400 transition-all duration-300 ${
                    isActive(link.href)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="px-5 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-cyan-500 to-yellow-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

     {/* Mobile Menu */}
<div
  className={`md:hidden fixed left-0 right-0 top-16 z-50 transition-all duration-200 ${
    isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
  }`}
>
  {/* Overlay */}
  <div
    onClick={() => setIsMobileMenuOpen(false)}
    className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${
      isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
    }`}
  />

  {/* Panel */}
  <div
    className={`relative mx-4 mt-3 rounded-2xl bg-gray-900/98 backdrop-blur-xl border border-cyan-500/10 transform transition-all duration-200 ${
      isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-[0.98]'
    }`}
  >
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              isActive(link.href)
                ? 'bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/admin/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-4 py-3 rounded-xl font-medium text-center bg-gradient-to-r from-cyan-500 to-yellow-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200"
        >
          Admin Login
        </Link>
      </div>
    </div>
  </div>
</div>

    </nav>
  );
}
