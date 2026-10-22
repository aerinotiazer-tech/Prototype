import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_PHONE, DISPLAY_PHONE } from '../data/cateringData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="Assistance WhatsApp" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 group">
      {/* Message d'appel discret */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 text-xs text-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span>Besoin d'un renseignement rapide ?</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Fermer bulle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bouton Rond WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Bonjour Traiteur Laskar, je souhaite des informations sur vos prestations traiteur à Antananarivo.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="hidden sm:inline font-semibold text-xs tracking-wide">
          Discuter sur WhatsApp
        </span>
      </a>
    </aside>
  );
};
