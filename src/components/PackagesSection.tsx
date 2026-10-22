import React from 'react';
import { FORMULAS_DATA, formatPriceMGA, formatPriceEUR, FormulaItem } from '../data/cateringData';
import { Check, Star, ArrowRight, Info } from 'lucide-react';

interface PackagesSectionProps {
  onSelectFormula: (formulaId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectFormula }) => {
  return (
    <section id="formules" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b343f] mb-2">
            <span className="text-[#c99a3e]">✦</span>
            <span>Nos Menus & Formules Traiteur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight text-balance">
            Des formules transparentes et modulables
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Trois bases pensées pour s’adapter à vos envies et à votre budget. Chaque menu est personnalisable avec notre chef selon vos ingrédients préférés.
          </p>

          {/* Mention obligatoire demandée par le client */}
          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs text-left max-w-xl">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Note de démonstration :</strong> Les montants indiqués ci-dessous sont des exemples indicatifs à valider avec Traiteur Laskar selon le menu final et les produits du marché.
            </span>
          </div>
        </div>

        {/* Grille des 3 Formules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {FORMULAS_DATA.map((formula: FormulaItem) => {
            const isHighlighted = formula.id === 'confort';
            return (
              <div
                key={formula.id}
                className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-white border-2 border-[#0b343f] shadow-xl lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Badge en haut pour la formule recommandée */}
                {formula.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#0b343f] rounded-full shadow-sm flex items-center gap-1.5 border border-[#c99a3e]/50">
                      <Star className="w-3 h-3 text-[#DFB15B] fill-[#DFB15B]" />
                      <span>{formula.badge}</span>
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  {/* Header Formule */}
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      {formula.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                      {formula.tagline}
                    </p>

                    {/* Prix indicatif par invité */}
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        Tarif indicatif de démonstration :
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0b343f]">
                          {formatPriceMGA(formula.indicativePricePerPersonMGA)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ convive</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Soit {formatPriceEUR(formula.indicativePricePerPersonMGA)} / pers. · (Sous réserve de validation)
                      </div>
                    </div>
                  </div>

                  {/* Prestations incluses */}
                  <div className="mt-6 flex-1 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Prestations & Inclusions :
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                      {formula.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#365D4E] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Desserts */}
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                        Desserts inclus :
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {formula.desserts.map((dessert, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c99a3e] shrink-0" />
                            <span>{dessert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Adapté pour */}
                    <div className="pt-2 text-xs text-slate-500 italic">
                      Idéal pour : {formula.suitableFor}
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => onSelectFormula(formula.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                        isHighlighted
                          ? 'bg-[#0b343f] text-white hover:bg-[#07242c] shadow-md hover:shadow-lg'
                          : 'bg-slate-100 text-slate-800 hover:bg-[#0b343f] hover:text-white border border-slate-200 hover:border-transparent'
                      }`}
                    >
                      <span>Sélectionner cette formule</span>
                      <ArrowRight className="w-4 h-4 text-[#DFB15B]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
