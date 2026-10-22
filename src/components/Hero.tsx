import React from 'react';
import { ArrowRight, UtensilsCrossed, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

interface HeroProps {
  onConfigureQuote: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onConfigureQuote,
  onExploreServices
}) => {
  return (
    <section id="accueil" className="relative overflow-hidden bg-[#FAF7F2] border-b border-slate-200/60">
      {/* Texture subtile en arrière-plan */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0b343f_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Colonne Gauche : Titre et Argumentaire */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Kicker typographique sans pilule */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b343f]">
              <span className="text-[#c99a3e]">✦</span>
              <span>Traiteur Événementiel · Antananarivo, Madagascar</span>
            </div>

            {/* Titre Principal avec text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-slate-900 leading-[1.15] text-balance">
              Le goût de vos <span className="text-[#0b343f] italic underline decoration-[#DFB15B]/50 decoration-2">plus beaux événements</span>
            </h1>

            {/* Sous-titre officiel */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              Buffets, grillades et menus servis pour vos mariages, réceptions et événements professionnels à Antananarivo.
            </p>

            {/* Avantages immédiats / Réassurance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#365D4E] shrink-0" />
                <span>Simulateur de devis instantané & gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#c99a3e] shrink-0" />
                <span>Grillades au feu de bois & zébu tendre</span>
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-[#365D4E] shrink-0" />
                <span>Mise en place complète & brigade de service</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c99a3e] shrink-0" />
                <span>Réponse personnalisée directe sur WhatsApp</span>
              </div>
            </div>

            {/* Boutons d'action principaux */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <button
                onClick={onConfigureQuote}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#0b343f] hover:bg-[#07242c] rounded-xl shadow-md hover:shadow-lg transition-all group"
              >
                <span>Configurer mon devis</span>
                <ArrowRight className="w-4 h-4 text-[#DFB15B] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-sm"
              >
                <span>Découvrir nos prestations</span>
              </button>
            </div>

            {/* Note d'information pour le visiteur */}
            <p className="text-xs text-slate-500 pt-1">
              * Configurez vos invités et options en 2 minutes pour recevoir une estimation claire transmise directement au chef sur WhatsApp.
            </p>
          </div>

          {/* Colonne Droite : Grande photographie culinaire de réception */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 group">
              <img
                src="/assets/images/hero_buffet_event_1792658265445.jpg"
                alt="Buffet de mariage et banquet traiteur somptueux à Antananarivo"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Encart incrusté de réassurance gastronomique */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-white/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-serif font-bold text-[#0b343f]">Excellence Culinaire Malgache & Française</div>
                    <div className="text-[11px] text-slate-600">Buffets copieux · Brochettes marinées · Menus 3 temps</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block text-xs font-semibold text-[#c99a3e] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#c99a3e]/30">
                      Tana & Banlieue
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Poinçon décoratif discret */}
            <div className="hidden sm:flex absolute -top-4 -right-4 w-20 h-20 bg-[#DFB15B]/20 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
