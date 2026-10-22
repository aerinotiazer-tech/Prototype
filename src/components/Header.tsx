import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../data/cateringData';
import { Phone, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Prestations', href: '#prestations' },
    { label: 'Formules', href: '#formules' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Comment ça marche', href: '#comment-ca-marche' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Banner subtile : coordonnées directes pour Antananarivo */}
      <div className="bg-[#0b343f] text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#DFB15B] font-medium">Antananarivo & Grand Tana</span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-300">Mariages · Buffets · Grillades événementielles</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Bonjour Traiteur Laskar, je souhaite des renseignements pour un événement à Antananarivo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#DFB15B] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="font-medium whitespace-nowrap">WhatsApp : {DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Strict 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1 : Brand Wordmark */}
        <a href="#accueil" className="shrink-0 hover:opacity-90 transition-opacity">
          <BrandLogo size="md" showSubtitle={true} />
        </a>

        {/* Zone 2 : 4-5 Clean single-line links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap hover:text-[#0b343f] hover:border-b-2 hover:border-[#c99a3e] py-1 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3 : 1 Primary CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:+${WHATSAPP_PHONE}`}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            title="Appeler directement"
          >
            <Phone className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">Appeler</span>
          </a>
          <button
            onClick={onOpenQuote}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0b343f] hover:bg-[#07242c] rounded-lg shadow-sm transition-all whitespace-nowrap hover:shadow group"
          >
            <span>Estimer mon devis</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DFB15B] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenQuote}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0b343f] rounded-lg"
          >
            Devis
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-medium text-slate-700 hover:text-[#0b343f] border-b border-slate-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#0b343f] rounded-xl shadow-md"
            >
              <span>Configurer mon devis en ligne</span>
              <ArrowRight className="w-4 h-4 text-[#DFB15B]" />
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Bonjour Traiteur Laskar, je souhaite un devis pour mon événement.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-800 bg-[#E8F8EE] border border-[#25D366]/40 rounded-xl"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Contacter sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
