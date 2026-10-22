import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { QuoteConfigurator } from './components/QuoteConfigurator';
import { GallerySection } from './components/GallerySection';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('buffet');
  const [selectedFormula, setSelectedFormula] = useState<string>('confort');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceId: string) => {
    setSelectedService(serviceId);
    scrollToSection('devis');
  };

  const handleSelectFormulaFromCard = (formulaId: string) => {
    setSelectedFormula(formulaId);
    scrollToSection('devis');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 selection:bg-[#0b343f] selection:text-[#DFB15B]">
      {/* Navigation conforme au Top Bar Contract */}
      <Header onOpenQuote={() => scrollToSection('devis')} />

      {/* Contenu Principal */}
      <main className="flex-1">
        {/* Hero avec grande photo événementielle */}
        <Hero
          onConfigureQuote={() => scrollToSection('devis')}
          onExploreServices={() => scrollToSection('prestations')}
        />

        {/* Section Prestations (6 types demandés avec photos) */}
        <ServicesSection onSelectService={handleSelectServiceFromCard} />

        {/* Section Formules (Essentielle, Confort, Prestige) */}
        <PackagesSection onSelectFormula={handleSelectFormulaFromCard} />

        {/* Parcours Comment ça marche ? */}
        <HowItWorks onStartConfig={() => scrollToSection('devis')} />

        {/* Cœur du prototype : Le Configurateur de devis interactif avec récapitulatif & WhatsApp */}
        <QuoteConfigurator
          initialService={selectedService}
          initialFormula={selectedFormula}
        />

        {/* Galerie photos avec filtres & zoom */}
        <GallerySection />

        {/* FAQ pour réduire les échanges répétitifs sur WhatsApp */}
        <FaqSection />
      </main>

      {/* Pied de page complet */}
      <Footer onOpenQuote={() => scrollToSection('devis')} />

      {/* Bouton d'action rapide flottant WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
