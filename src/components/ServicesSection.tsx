import React from 'react';
import { SERVICES_DATA, ServiceItem } from '../data/cateringData';
import { Utensils, Check, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="prestations" className="py-16 md:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b343f] mb-2">
            <span className="text-[#c99a3e]">✦</span>
            <span>Savoir-Faire & Prestations Gastronomiques</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight text-balance">
            Des prestations pensées pour chaque moment fort
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            De la convivialité d’un grand buffet barbecue au prestige d’un service à table gastronomique, Traiteur Laskar sublime vos réceptions privées et professionnelles à Antananarivo.
          </p>
        </div>

        {/* Grille des 6 prestations demandées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="flex flex-col bg-[#FAF8F5] rounded-2xl overflow-hidden border border-slate-200/80 hover:border-[#c99a3e]/60 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Photo du plat / service avec Fallback */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                
                {/* Capacité indicative en haut à droite */}
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-1 rounded-md border border-white/20 font-medium">
                  {service.recommendedGuestRange}
                </div>

                <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 drop-shadow">
                  <Utensils className="w-3.5 h-3.5 text-[#DFB15B]" />
                  <span>Antananarivo & Environs</span>
                </div>
              </div>

              {/* Contenu de la prestation */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#0b343f] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Points forts */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                    {service.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#365D4E] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton de sélection pour le configurateur */}
                <div className="pt-6 mt-4 border-t border-slate-200/60">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#0b343f] bg-white hover:bg-[#0b343f] hover:text-white border border-[#0b343f]/30 hover:border-transparent rounded-xl transition-all shadow-sm group/btn"
                  >
                    <span>Sélectionner dans le devis</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c99a3e] group-hover/btn:translate-x-1 group-hover/btn:text-[#DFB15B] transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
