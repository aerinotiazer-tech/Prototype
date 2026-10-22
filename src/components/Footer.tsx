import React from 'react';
import { BrandLogo } from './BrandLogo';
import { DISPLAY_PHONE, WHATSAPP_PHONE, CONTACT_EMAIL } from '../data/cateringData';
import { Phone, Mail, MapPin, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  return (
    <footer className="bg-[#07242c] text-slate-300 border-t border-slate-800">
      {/* Bandeau d'action rapide */}
      <div className="bg-[#0b343f] border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-white">
              Prêt à sublimer votre prochain banquet ?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Estimez votre événement en 2 minutes ou écrivez directement à notre chef sur WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-[#DFB15B] hover:bg-[#c99a3e] rounded-xl transition-all shadow"
            >
              Simuler mon devis en ligne
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Bonjour Traiteur Laskar, je souhaite échanger au sujet de mon événement à Antananarivo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp : {DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Corps du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Colonne 1 : Brand Logo & Présentation */}
          <div className="space-y-4">
            <BrandLogo variant="dark" size="md" showSubtitle={true} />
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Traiteur événementiel haut de gamme à Antananarivo. Buffets d’abondance, grillades savoureuses au feu de bois et menus gastronomiques pour mariages, banquets et réceptions d'affaires.
            </p>
            <div className="pt-2 text-xs text-[#DFB15B] font-medium">
              ✦ Savoir-faire culinaire & produits frais de Madagascar
            </div>
          </div>

          {/* Colonne 2 : Prestations & Formules */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Prestations & Formules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#prestations" className="hover:text-white transition-colors">Buffets Festifs & Cocktails</a></li>
              <li><a href="#prestations" className="hover:text-white transition-colors">Grillades & Barbecue Zébu</a></li>
              <li><a href="#prestations" className="hover:text-white transition-colors">Menus Servis à l'Assiette</a></li>
              <li><a href="#prestations" className="hover:text-white transition-colors">Mariages & Grands Banquets</a></li>
              <li><a href="#formules" className="hover:text-white transition-colors">Formule Essentielle</a></li>
              <li><a href="#formules" className="hover:text-white transition-colors">Formule Confort (Populaire)</a></li>
              <li><a href="#formules" className="hover:text-white transition-colors">Formule Prestige</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Zone desservie à Antananarivo */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Zone Desservie (Analamanga)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nous intervenons dans toute la province d’Antananarivo avec notre logistique mobile :
            </p>
            <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 pt-1">
              <span>· Centre Tana</span>
              <span>· Ivato & Aéroport</span>
              <span>· Ivandry & Ilafy</span>
              <span>· Ambohimanga</span>
              <span>· Ankorondrano</span>
              <span>· Tanjombato</span>
              <span>· By-pass</span>
              <span>· Talatamaty</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Déplacements en province sur demande spéciale.
            </p>
          </div>

          {/* Colonne 4 : Coordonnées directes */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact Direct
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a
                href={`tel:+${WHATSAPP_PHONE}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#DFB15B] shrink-0" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors text-slate-300"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Pro disponible 7j/7</span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#DFB15B] shrink-0" />
                <span>{CONTACT_EMAIL}</span>
              </a>

              <div className="flex items-center gap-2 pt-1 text-slate-400">
                <MapPin className="w-4 h-4 text-[#DFB15B] shrink-0" />
                <span>Antananarivo 101, Madagascar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne inférieure de copyright et mentions de démonstration */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Traiteur Laskar — Tous droits réservés. Antananarivo, Madagascar.
          </p>
          <p className="text-center sm:text-right text-[11px] text-slate-400">
            Prototype de démonstration commerciale UI/UX pour validation avec la direction de Traiteur Laskar.
          </p>
        </div>
      </div>
    </footer>
  );
};
