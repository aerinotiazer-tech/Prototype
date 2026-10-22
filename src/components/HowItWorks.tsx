import React from 'react';
import { Sliders, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartConfig: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartConfig }) => {
  const steps = [
    {
      number: '01',
      title: 'Configurez votre événement en ligne',
      desc: 'Sélectionnez votre nombre d’invités, le type de prestation (buffet, grillades ou menu servi), votre formule et vos options en quelques clics.',
      icon: Sliders
    },
    {
      number: '02',
      title: 'Envoyez votre fiche complète sur WhatsApp',
      desc: 'En un clic, un message parfaitement détaillé et structuré est envoyé sur le WhatsApp de Traiteur Laskar, éliminant les allers-retours interminables.',
      icon: Send
    },
    {
      number: '03',
      title: 'Le traiteur valide et affine votre devis',
      desc: 'Notre chef vérifie la disponibilité de la date à Antananarivo, discute avec vous des ajustements de plats et confirme votre devis officiel.',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="comment-ca-marche" className="py-16 md:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b343f] mb-2">
            <span className="text-[#c99a3e]">✦</span>
            <span>Simplicité & Rapidité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight text-balance">
            Comment ça marche ?
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Un processus clair et sans friction pour organiser le banquet de votre vie sans perdre des heures sur WhatsApp.
          </p>
        </div>

        {/* 3 Cartes Étape avec numérotation éditoriale soignée */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-[#FAF8F5] p-8 rounded-2xl border border-slate-200/80 hover:border-[#c99a3e]/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#c99a3e]">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0b343f] shadow-sm border border-slate-200/60">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA en bas du parcours */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartConfig}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0b343f] hover:bg-[#07242c] rounded-xl shadow-md transition-all"
          >
            <span>Démarrer ma configuration maintenant</span>
            <ArrowRight className="w-4 h-4 text-[#DFB15B]" />
          </button>
        </div>
      </div>
    </section>
  );
};
