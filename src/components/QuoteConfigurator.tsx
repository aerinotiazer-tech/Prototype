import React, { useState, useMemo } from 'react';
import {
  FORMULAS_DATA,
  EXTRA_OPTIONS,
  formatPriceMGA,
  formatPriceEUR,
  WHATSAPP_PHONE,
  DISPLAY_PHONE,
  CONTACT_EMAIL,
  QuoteConfig
} from '../data/cateringData';
import {
  Calendar,
  Users,
  Utensils,
  Sparkles,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  FileText,
  AlertCircle,
  Copy,
  Share2,
  Check
} from 'lucide-react';

interface QuoteConfiguratorProps {
  initialService?: string;
  initialFormula?: string;
}

export const QuoteConfigurator: React.FC<QuoteConfiguratorProps> = ({
  initialService = 'buffet',
  initialFormula = 'confort'
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedToast, setCopiedToast] = useState(false);

  // Form State
  const [config, setConfig] = useState<QuoteConfig>({
    eventType: 'mariage',
    eventDate: '',
    guestCount: 100,
    serviceType: initialService,
    formulaId: initialFormula,
    selectedOptions: ['boissons_soft', 'service_staff'],
    locationInTana: 'Antananarivo (Centre / Ivandry / Ankorondrano)',
    budgetExpectation: 'standard',
    notes: '',
    clientName: '',
    clientPhone: '',
    clientEmail: ''
  });

  // Mettre à jour l'état si l'utilisateur clique sur une prestation ou une formule depuis une section
  React.useEffect(() => {
    if (initialService) {
      setConfig((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  React.useEffect(() => {
    if (initialFormula) {
      setConfig((prev) => ({ ...prev, formulaId: initialFormula }));
    }
  }, [initialFormula]);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const eventTypes = [
    { id: 'mariage', label: 'Mariage & Banquet', icon: '💍', desc: 'Cocktail nuptial, vin d\'honneur et repas de noce' },
    { id: 'anniversaire', label: 'Anniversaire & Fête', icon: '🎉', desc: 'Soirée festive, retrouvailles, jubilé' },
    { id: 'entreprise', label: 'Événement Professionnel', icon: '💼', desc: 'Séminaire, cocktail d\'entreprise, soirée de gala' },
    { id: 'reception_privee', label: 'Réception Privée / Fiançailles', icon: '🥂', desc: 'Baptême, communion, fiançailles en famille' },
    { id: 'autre', label: 'Autre Célébration', icon: '✨', desc: 'Événement associatif, garden party sur-mesure' }
  ];

  const serviceTypes = [
    { id: 'buffet', label: 'Buffet Festif & Cocktails', desc: 'Chaud & froid en libre accès, chauffe-plats' },
    { id: 'grillades', label: 'Grillades & Barbecue Zébu', desc: 'Brochettes grillées au feu de bois par nos grilladins' },
    { id: 'combinaison', label: 'Combinaison Buffet + Grillades', desc: 'Le choix roi : buffet complet + atelier barbecue direct' },
    { id: 'menu_servi', label: 'Menu Servi à l\'Assiette', desc: 'Gastronomie raffinée en plusieurs services assis' }
  ];

  const tanaLocations = [
    'Antananarivo (Centre-ville, Analakely, Isoraka)',
    'Nord Tana (Ivandry, Ankorondrano, Alarobia, Ilafy)',
    'Zone Aéroport (Ivato, Talatamaty, Ambohidratrimo)',
    'Est Tana (Ambohimanga, Sabotsy Namehana)',
    'Sud Tana (Tanjombato, By-pass, Iavoloha)',
    'Autre commune / Hors agglomération'
  ];

  // Calcul du devis indicatif
  const calculation = useMemo(() => {
    const selectedFormula = FORMULAS_DATA.find((f) => f.id === config.formulaId) || FORMULAS_DATA[1];
    const formulaBasePricePerGuest = selectedFormula.indicativePricePerPersonMGA;

    // Bonus éventuel pour la combinaison buffet + grillades (+10 000 Ar / pers)
    const serviceModifierPerGuest = config.serviceType === 'combinaison' ? 10000 : 0;
    const finalPricePerGuest = formulaBasePricePerGuest + serviceModifierPerGuest;

    const baseMenuTotal = finalPricePerGuest * config.guestCount;

    // Options supplémentaires
    let optionsTotal = 0;
    const optionsDetail: { name: string; cost: number }[] = [];

    config.selectedOptions.forEach((optId) => {
      const opt = EXTRA_OPTIONS.find((o) => o.id === optId);
      if (opt) {
        let optCost = 0;
        if (opt.priceType === 'per_person') {
          optCost = opt.priceMGA * config.guestCount;
        } else {
          optCost = opt.priceMGA;
        }
        optionsTotal += optCost;
        optionsDetail.push({ name: opt.name, cost: optCost });
      }
    });

    const totalEstimateMGA = baseMenuTotal + optionsTotal;
    const totalEstimateEUR = Math.round(totalEstimateMGA / 4900);

    return {
      selectedFormula,
      pricePerGuest: finalPricePerGuest,
      baseMenuTotal,
      optionsTotal,
      optionsDetail,
      totalEstimateMGA,
      totalEstimateEUR
    };
  }, [config]);

  // Validation avant de passer à l'étape suivante
  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 2) {
      if (!config.eventDate) {
        newErrors.eventDate = 'Veuillez sélectionner la date prévue de l\'événement (ou une date indicative).';
      }
    }

    if (step === 3) {
      if (!config.guestCount || config.guestCount < 10) {
        newErrors.guestCount = 'Veuillez indiquer au moins 10 convives pour le service traiteur.';
      }
    }

    if (step === 7) {
      if (!config.clientName.trim()) {
        newErrors.clientName = 'Veuillez renseigner votre nom complet.';
      }
      if (!config.clientPhone.trim() || config.clientPhone.trim().length < 6) {
        newErrors.clientPhone = 'Veuillez indiquer un numéro de téléphone valide (WhatsApp de préférence).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 8)); // Step 8 est la page récapitulative
      window.scrollTo({ top: document.getElementById('devis')?.offsetTop || 400, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleOption = (optionId: string) => {
    setConfig((prev) => {
      const exists = prev.selectedOptions.includes(optionId);
      return {
        ...prev,
        selectedOptions: exists
          ? prev.selectedOptions.filter((id) => id !== optionId)
          : [...prev.selectedOptions, optionId]
      };
    });
  };

  // Génération du texte WhatsApp prérempli
  const buildWhatsAppMessage = (): string => {
    const selectedFormula = FORMULAS_DATA.find((f) => f.id === config.formulaId)?.name || 'Non définie';
    const serviceName = serviceTypes.find((s) => s.id === config.serviceType)?.label || config.serviceType;
    const eventName = eventTypes.find((e) => e.id === config.eventType)?.label || config.eventType;

    const optionsList = config.selectedOptions
      .map((id) => EXTRA_OPTIONS.find((o) => o.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    return `*DEMANDE DE DEVIS — TRAITEUR LASKAR* 🍽️
-----------------------------------
👤 *Client :* ${config.clientName || 'Non renseigné'}
📞 *Téléphone :* ${config.clientPhone || 'Non renseigné'}
${config.clientEmail ? `📧 *Email :* ${config.clientEmail}\n` : ''}
📍 *Lieu :* ${config.locationInTana}
📅 *Date prévue :* ${config.eventDate || 'À préciser'}
👥 *Nombre d'invités :* ${config.guestCount} convives
✨ *Type d'événement :* ${eventName}
🍲 *Prestation :* ${serviceName}
📋 *Formule choisie :* ${selectedFormula}
${optionsList ? `➕ *Options retenues :* ${optionsList}\n` : ''}
💰 *Estimation indicative :* ${formatPriceMGA(calculation.totalEstimateMGA)} (~${calculation.totalEstimateEUR} €)
${config.notes ? `📝 *Précisions du client :* ${config.notes}\n` : ''}
-----------------------------------
_Message généré via le configurateur en ligne de Traiteur Laskar. Merci de me confirmer vos disponibilités et le devis finalisé._`;
  };

  const openWhatsApp = () => {
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const openEmail = () => {
    const subject = encodeURIComponent(`Demande de Devis Événement Traiteur Laskar - ${config.clientName || 'Client'}`);
    const body = encodeURIComponent(buildWhatsAppMessage());
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const copySummaryToClipboard = () => {
    navigator.clipboard.writeText(buildWhatsAppMessage()).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    });
  };

  const stepsLabels = [
    'Événement',
    'Date',
    'Invités',
    'Prestation',
    'Formule & Options',
    'Lieu & Budget',
    'Coordonnées',
    'Récapitulatif'
  ];

  return (
    <section id="devis" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b343f] mb-2">
            <span className="text-[#c99a3e]">✦</span>
            <span>Simulateur & Configurateur en Direct</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight text-balance">
            Estimez le coût de votre événement à Antananarivo
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Personnalisez vos options pas à pas. En fin d’estimation, transmettez votre fiche complète directement au chef sur WhatsApp en un clic.
          </p>
        </div>

        {/* Progression par étapes */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Étape {currentStep} sur 8 : <strong className="text-slate-800">{stepsLabels[currentStep - 1]}</strong></span>
            <span className="text-[#0b343f] font-semibold">{Math.round((currentStep / 8) * 100)}% complété</span>
          </div>
          {/* Barre de progression */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-gradient-to-r from-[#0b343f] to-[#c99a3e] h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Layout Principal : Formulaire d'étape + Résumé en direct */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Formulaire Principal (Gauche) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm min-h-[460px] flex flex-col justify-between">
            {/* ETAPE 1 : Type d'événement */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <span>1. Quel type d’événement organisez-vous ?</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Sélectionnez la nature de votre réception pour adapter nos recommandations.</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {eventTypes.map((type) => {
                    const isSelected = config.eventType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setConfig({ ...config, eventType: type.id })}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-white border-[#0b343f] shadow-md ring-1 ring-[#0b343f]'
                            : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="text-2xl p-2 bg-slate-50 rounded-lg">{type.icon}</span>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-900">{type.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{type.desc}</div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-[#365D4E] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETAPE 2 : Date de l'événement */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#c99a3e]" />
                    <span>2. Quelle est la date prévue de l’événement ?</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Indiquez une date même provisoire pour vérifier le calendrier de disponibilité de notre brigade.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Date de votre réception *
                    </label>
                    <input
                      type="date"
                      value={config.eventDate}
                      onChange={(e) => {
                        setConfig({ ...config, eventDate: e.target.value });
                        if (errors.eventDate) setErrors({ ...errors, eventDate: '' });
                      }}
                      className="w-full px-4 py-3 text-sm text-slate-900 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b343f]"
                    />
                    {errors.eventDate && (
                      <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.eventDate}</span>
                      </p>
                    )}
                  </div>

                  <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900">
                    💡 <strong>Conseil traiteur :</strong> Les samedis de saison sèche (août à novembre) sont les plus sollicités à Antananarivo. Bloquer la date tôt vous assure la disponibilité de nos maîtres grilladins.
                  </div>
                </div>
              </div>
            )}

            {/* ETAPE 3 : Nombre d'invités */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#c99a3e]" />
                    <span>3. Combien de convives attendez-vous ?</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Le nombre d’invités permet d’ajuster les quantités, la brigade de serveurs et les réchauds.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
                  {/* Curseur et grand affichage */}
                  <div className="text-center py-2">
                    <div className="text-4xl font-serif font-bold text-[#0b343f]">
                      {config.guestCount}
                    </div>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                      convives prévus
                    </span>
                  </div>

                  <div>
                    <input
                      type="range"
                      min="20"
                      max="600"
                      step="10"
                      value={config.guestCount}
                      onChange={(e) => setConfig({ ...config, guestCount: parseInt(e.target.value) || 20 })}
                      className="w-full accent-[#0b343f] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>20 pers.</span>
                      <span>150 pers.</span>
                      <span>300 pers.</span>
                      <span>600+ pers.</span>
                    </div>
                  </div>

                  {/* Boutons d'ajustement rapide */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[50, 80, 100, 150, 200, 300, 450].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setConfig({ ...config, guestCount: count })}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          config.guestCount === count
                            ? 'bg-[#0b343f] text-white border-transparent'
                            : 'bg-[#FAF8F5] text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {count} invités
                      </button>
                    ))}
                  </div>

                  {errors.guestCount && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.guestCount}</p>
                  )}
                </div>
              </div>
            )}

            {/* ETAPE 4 : Type de prestation */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-[#c99a3e]" />
                    <span>4. Quel type de prestation culinaire préférez-vous ?</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Choisissez le format du repas le plus adapté à l’ambiance de votre fête.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {serviceTypes.map((service) => {
                    const isSelected = config.serviceType === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setConfig({ ...config, serviceType: service.id })}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-white border-[#0b343f] shadow-md ring-1 ring-[#0b343f]'
                            : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{service.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{service.desc}</div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-[#365D4E] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETAPE 5 : Formule et Options supplémentaires */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#c99a3e]" />
                    <span>5. Formule choisie et options supplémentaires</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Choisissez la formule de base et cochez les extras souhaités.
                  </p>
                </div>

                {/* Sélecteur de formules */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Formule de base :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {FORMULAS_DATA.map((form) => {
                      const isSelected = config.formulaId === form.id;
                      return (
                        <button
                          key={form.id}
                          type="button"
                          onClick={() => setConfig({ ...config, formulaId: form.id })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-white border-[#0b343f] ring-1 ring-[#0b343f] shadow-sm'
                              : 'bg-white/70 border-slate-200 hover:bg-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-900">{form.name}</div>
                          <div className="text-xs font-serif font-semibold text-[#0b343f] mt-1">
                            {formatPriceMGA(form.indicativePricePerPersonMGA)}
                          </div>
                          <div className="text-[10px] text-slate-400">/ convive</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Options supplémentaires */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Options à la carte (facultatif) :
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {EXTRA_OPTIONS.map((opt) => {
                      const isChecked = config.selectedOptions.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-white border-[#365D4E] shadow-sm'
                              : 'bg-white/60 border-slate-200 hover:bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleOption(opt.id)}
                            className="mt-1 w-4 h-4 rounded text-[#0b343f] focus:ring-[#0b343f]"
                          />
                          <div className="flex-1 text-xs">
                            <div className="flex items-center justify-between font-semibold text-slate-900">
                              <span>{opt.name}</span>
                              <span className="text-[#0b343f] font-mono">
                                +{formatPriceMGA(opt.priceMGA)} {opt.priceType === 'per_person' ? '/ pers' : 'forfait'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{opt.description}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ETAPE 6 : Lieu dans Antananarivo et Détails */}
            {currentStep === 6 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#c99a3e]" />
                    <span>6. Lieu de réception et précisions</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Où se déroulera votre fête et quelles sont vos attentes culinaires ?
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Zone géographique de l'événement *
                    </label>
                    <select
                      value={config.locationInTana}
                      onChange={(e) => setConfig({ ...config, locationInTana: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm text-slate-900 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b343f]"
                    >
                      {tanaLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Précisions culinaires ou contraintes particulières (facultatif)
                    </label>
                    <textarea
                      rows={3}
                      value={config.notes}
                      onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                      placeholder="Ex: 5 végétariens parmi les invités, préférence pour brochettes zébu bien cuites, salle avec cuisine disponible..."
                      className="w-full px-4 py-2.5 text-xs text-slate-900 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b343f]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ETAPE 7 : Coordonnées du client */}
            {currentStep === 7 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#c99a3e]" />
                    <span>7. Vos coordonnées pour recevoir le devis</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Ces informations permettront d'éditer la proposition et de vous répondre immédiatement sur WhatsApp.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Ex: Madame / Monsieur Rakoto"
                        value={config.clientName}
                        onChange={(e) => {
                          setConfig({ ...config, clientName: e.target.value });
                          if (errors.clientName) setErrors({ ...errors, clientName: '' });
                        }}
                        className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b343f]"
                      />
                    </div>
                    {errors.clientName && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.clientName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Téléphone portable (avec WhatsApp si possible) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        placeholder="Ex: 034 12 345 67 ou +261 34 ..."
                        value={config.clientPhone}
                        onChange={(e) => {
                          setConfig({ ...config, clientPhone: e.target.value });
                          if (errors.clientPhone) setErrors({ ...errors, clientPhone: '' });
                        }}
                        className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b343f]"
                      />
                    </div>
                    {errors.clientPhone && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.clientPhone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Adresse email (facultatif)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        placeholder="contact@exemple.mg"
                        value={config.clientEmail}
                        onChange={(e) => setConfig({ ...config, clientEmail: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-[#FAF8F5] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b343f]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPE 8 : Page Récapitulative Complète avant envoi */}
            {currentStep === 8 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#365D4E] rounded-md text-xs font-semibold mb-2 border border-emerald-200">
                    <Check className="w-3.5 h-3.5" />
                    <span>Configuration terminée avec succès</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Récapitulatif de votre demande de devis
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Vérifiez vos choix avant d'envoyer votre dossier sur WhatsApp ou par email à Traiteur Laskar.
                  </p>
                </div>

                {/* Carte Fiche Synthèse */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] font-semibold">Organisateur :</span>
                      <p className="font-semibold text-slate-900">{config.clientName || 'Non précisé'}</p>
                      <p className="text-slate-600">{config.clientPhone}</p>
                      {config.clientEmail && <p className="text-slate-500">{config.clientEmail}</p>}
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] font-semibold">Événement & Lieu :</span>
                      <p className="font-semibold text-slate-900">
                        {eventTypes.find((e) => e.id === config.eventType)?.label} · {config.guestCount} convives
                      </p>
                      <p className="text-slate-600">Date : {config.eventDate || 'À confirmer'}</p>
                      <p className="text-slate-500">{config.locationInTana}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pb-3 border-b border-slate-100">
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">Menu & Formule :</span>
                    <p className="font-semibold text-slate-900">
                      {serviceTypes.find((s) => s.id === config.serviceType)?.label} — {calculation.selectedFormula.name}
                    </p>
                    <p className="text-slate-600">
                      Tarif indicatif par personne : {formatPriceMGA(calculation.pricePerGuest)}
                    </p>
                  </div>

                  {calculation.optionsDetail.length > 0 && (
                    <div className="space-y-1 pb-3 border-b border-slate-100">
                      <span className="text-slate-400 uppercase text-[10px] font-semibold">Options retenues :</span>
                      {calculation.optionsDetail.map((opt, i) => (
                        <div key={i} className="flex justify-between text-slate-700">
                          <span>{opt.name}</span>
                          <span className="font-mono text-slate-900">+{formatPriceMGA(opt.cost)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Total estimé */}
                  <div className="pt-1 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Budget total indicatif :</span>
                      <div className="text-[10px] text-slate-400">Exemple de démonstration pour {config.guestCount} personnes</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-bold text-[#0b343f]">
                        {formatPriceMGA(calculation.totalEstimateMGA)}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {formatPriceEUR(calculation.totalEstimateMGA)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boutons d'envoi principaux demandés */}
                <div className="space-y-2.5">
                  <button
                    onClick={openWhatsApp}
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-5 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                    <span>Envoyer ma demande sur WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={openEmail}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors"
                    >
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span>Préparer un e-mail</span>
                    </button>

                    <button
                      onClick={copySummaryToClipboard}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors"
                    >
                      {copiedToast ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                      <span>{copiedToast ? 'Copié dans le presse-papier !' : 'Copier le récapitulatif'}</span>
                    </button>
                  </div>
                </div>

                {/* Avertissement obligatoire demandé */}
                <div className="p-3.5 bg-amber-50/90 border border-amber-200/90 rounded-xl text-xs text-amber-900 leading-relaxed">
                  ⚠️ <strong>Information importante :</strong> Cette simulation de devis en ligne ne vaut pas réservation confirmée. Le traiteur vérifie la disponibilité de la date, affine les plats avec vous et valide le devis officiel contractuel.
                </div>
              </div>
            )}

            {/* Boutons de navigation (Précédent / Continuer) */}
            {currentStep < 8 && (
              <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Précédent</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0b343f] hover:bg-[#07242c] rounded-xl shadow transition-all group"
                >
                  <span>{currentStep === 7 ? 'Voir mon récapitulatif' : 'Continuer'}</span>
                  <ChevronRight className="w-4 h-4 text-[#DFB15B] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Volet Récapitulatif en Direct (Droite - Sticky sur desktop) */}
          <div className="lg:col-span-5 sticky top-24 bg-[#0b343f] text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-[#DFB15B]/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#DFB15B]" />
                <h4 className="text-base font-serif font-bold tracking-wide">
                  Estimation en direct
                </h4>
              </div>
              <span className="text-[11px] font-mono text-[#DFB15B] bg-white/10 px-2 py-0.5 rounded">
                Antananarivo
              </span>
            </div>

            {/* Lignes du récapitulatif */}
            <div className="py-5 space-y-3.5 text-xs border-b border-white/10">
              <div className="flex justify-between items-center text-slate-300">
                <span>Événement :</span>
                <span className="font-semibold text-white">
                  {eventTypes.find((e) => e.id === config.eventType)?.label}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>Date prévue :</span>
                <span className="font-semibold text-white">
                  {config.eventDate ? config.eventDate : 'À définir'}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>Nombre de convives :</span>
                <span className="font-bold text-[#DFB15B] font-mono text-sm">
                  {config.guestCount} personnes
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>Formule :</span>
                <span className="font-semibold text-white">
                  {calculation.selectedFormula.name}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>Base menu / convive :</span>
                <span className="font-mono text-slate-200">
                  {formatPriceMGA(calculation.pricePerGuest)}
                </span>
              </div>

              {config.selectedOptions.length > 0 && (
                <div className="pt-2 border-t border-white/10 space-y-1">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    Options incluses ({config.selectedOptions.length}) :
                  </div>
                  {calculation.optionsDetail.map((opt, i) => (
                    <div key={i} className="flex justify-between text-slate-300 text-[11px]">
                      <span className="truncate max-w-[190px]">{opt.name}</span>
                      <span className="font-mono text-slate-200">+{formatPriceMGA(opt.cost)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Chiffré en grand */}
            <div className="pt-5 pb-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Montant estimatif indicatif :
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#DFB15B]">
                  {formatPriceMGA(calculation.totalEstimateMGA)}
                </div>
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Soit environ <strong className="text-white">{calculation.totalEstimateEUR} €</strong> pour vos convives
              </div>
              <div className="text-[10px] text-slate-400 italic mt-2">
                * Tarif de démonstration à confirmer par Traiteur Laskar selon les disponibilités.
              </div>
            </div>

            {/* Action rapide WhatsApp */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-900 bg-[#DFB15B] hover:bg-[#c99a3e] rounded-xl transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4 text-[#0b343f]" />
                <span>Question rapide sur WhatsApp</span>
              </a>
              <div className="text-center text-[10px] text-slate-400 mt-2">
                Ligne directe : {DISPLAY_PHONE}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
