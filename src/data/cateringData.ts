/**
 * Données de démonstration et configuration pour Traiteur Laskar - Antananarivo
 */

export interface ServiceItem {
  id: string;
  title: string;
  category: 'buffet' | 'grillades' | 'menu_servi' | 'mariage' | 'anniversaire' | 'entreprise';
  shortDesc: string;
  fullDesc: string;
  image: string;
  highlights: string[];
  recommendedGuestRange: string;
  suggestedFormula: string;
}

export interface FormulaItem {
  id: string;
  name: string;
  tagline: string;
  indicativePricePerPersonMGA: number;
  badge?: string;
  description: string;
  inclusions: string[];
  desserts: string[];
  suitableFor: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  priceType: 'per_person' | 'fixed';
  priceMGA: number;
  category: 'boissons' | 'service' | 'art_table' | 'animation';
}

export interface QuoteConfig {
  eventType: string;
  eventDate: string;
  guestCount: number;
  serviceType: string;
  formulaId: string;
  selectedOptions: string[];
  locationInTana: string;
  budgetExpectation: string;
  notes: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

export const WHATSAPP_PHONE = '261341281507';
export const DISPLAY_PHONE = '+261 34 12 815 07';
export const CONTACT_EMAIL = 'contact@traiteur-laskar.mg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'buffet',
    title: 'Buffets Festifs & Cocktails',
    category: 'buffet',
    shortDesc: 'Buffets chauds et froids généreux, assortiments de canapés, verrines fraîches et spécialités gourmandes.',
    fullDesc: 'Une formule conviviale et variée idéale pour satisfaire tous les goûts. Présentation soignée sur présentoirs en bois noble et ardoise avec chauffe-plats professionnels.',
    image: '/assets/images/buffet_traiteur_1792658265909.jpg',
    highlights: ['Verrines et pièces cocktail', 'Chauffe-plats en inox poli', 'Assortiment salades & viandes chaudes', 'Recharge continue du buffet'],
    recommendedGuestRange: '30 à 600 personnes',
    suggestedFormula: 'confort'
  },
  {
    id: 'grillades',
    title: 'Grillades & Barbecue d\'Exception',
    category: 'grillades',
    shortDesc: 'Brochettes de zébu marinées, volailles braisées aux épices douces, méchouis et poissons grillés au feu de bois.',
    fullDesc: 'L’authenticité et la gourmandise du barbecue événementiel. Cuisson maîtrisée en direct par nos maîtres grilladins avec sauces maison (sauce combava, piment vert doux, rougail mangue).',
    image: '/assets/images/grillades_bbq_1792658266867.jpg',
    highlights: ['Zébu tendre mariné au poivre sauvage', 'Poulet fermier braisé au feu de bois', 'Sauces et achards traditionnels', 'Animation cuisson en direct'],
    recommendedGuestRange: '40 à 500 personnes',
    suggestedFormula: 'confort'
  },
  {
    id: 'menu_servi',
    title: 'Menus Servis à l\'Assiette',
    category: 'menu_servi',
    shortDesc: 'Haute gastronomie et service à table élégant en 3 à 5 temps pour vos réceptions les plus prestigieuses.',
    fullDesc: 'Une expérience culinaire d’exception avec dressage minutieux à l’assiette, filets de viande sélectionnés, réductions délicates et accompagnements de saison.',
    image: '/assets/images/menu_servi_gastronomie_1792658266260.jpg',
    highlights: ['Service synchronisé par notre brigade', 'Dressage gastronomique soigné', 'Entrée, plat raffiné, dessert signature', 'Parfait pour dîners de gala'],
    recommendedGuestRange: '20 à 300 personnes',
    suggestedFormula: 'prestige'
  },
  {
    id: 'mariage',
    title: 'Mariages & Réceptions Royales',
    category: 'mariage',
    shortDesc: 'Organisation culinaire complète pour le plus beau jour de votre vie à Antananarivo et ses domaines.',
    fullDesc: 'Du cocktail d’accueil avec canapés jusqu’à la pièce montée nuptiale, nous scénarisons chaque étape gustative de votre mariage avec raffinement et discrétion.',
    image: '/assets/images/reception_mariage_1792658267035.jpg',
    highlights: ['Vin d\'honneur & rafraîchissements', 'Banquet nuptial au choix', 'Service coordonné avec votre timing', 'Pièce montée & fontaine à champagne'],
    recommendedGuestRange: '50 à 800+ personnes',
    suggestedFormula: 'prestige'
  },
  {
    id: 'anniversaire',
    title: 'Anniversaires & Fêtes Privées',
    category: 'anniversaire',
    shortDesc: 'Formules festives et chaleureuses pour célébrer vos grandes dates en famille ou entre amis.',
    fullDesc: 'Des propositions adaptées aux ambiances décontractées comme aux soirées sophistiquées, avec bar à brochettes, desserts gourmands et service attentionné.',
    image: '/assets/images/hero_buffet_event_1792658265445.jpg',
    highlights: ['Buffet dînatoire ou grillades festives', 'Gâteau d\'anniversaire personnalisé', 'Options enfants & ados', 'Logistique complète prise en charge'],
    recommendedGuestRange: '20 à 250 personnes',
    suggestedFormula: 'essentielle'
  },
  {
    id: 'entreprise',
    title: 'Événements Professionnels & Séminaires',
    category: 'entreprise',
    shortDesc: 'Cocktails d\'entreprise, déjeuners de séminaire, lancements de marque et galas annuels.',
    fullDesc: 'Ponctualité rigoureuse, personnel en uniforme impeccable et formules rapides ou assises pour valoriser l’image de marque de votre entreprise.',
    image: '/assets/images/buffet_traiteur_1792658265909.jpg',
    highlights: ['Respect strict des plannings d’entreprise', 'Facturation pro avec justificatifs', 'Pause-café et déjeuners d’affaires', 'Cocktails de fin d’année'],
    recommendedGuestRange: '25 à 500 personnes',
    suggestedFormula: 'confort'
  }
];

export const FORMULAS_DATA: FormulaItem[] = [
  {
    id: 'essentielle',
    name: 'Formule Essentielle',
    tagline: 'L\'efficacité et la générosité pour vos fêtes conviviales',
    indicativePricePerPersonMGA: 40000,
    description: 'Une solution accessible et savoureuse qui garantit l’abondance et la fraîcheur pour tous vos convives.',
    inclusions: [
      '3 variétés d\'entrées fraîches et salades composées',
      '2 plats chauds au choix (viande mijotée ou brochettes zébu + volaille)',
      '2 féculents et légumes sautés de saison (riz safrané, gratin dauphinois)',
      'Pain artisanal et sauces d\'accompagnement traditionnelles',
      'Mise à disposition des chauffe-plats et pinces de service'
    ],
    desserts: [
      'Assortiment de mousses en verrines ou salade de fruits de saison'
    ],
    suitableFor: 'Anniversaires, repas de famille, retrouvailles, déjeuners d\'association'
  },
  {
    id: 'confort',
    name: 'Formule Confort',
    tagline: 'La formule la plus plébiscitée : équilibre, variété et grillades',
    indicativePricePerPersonMGA: 65000,
    badge: 'Recommandée',
    description: 'Le parfait compromis entre raffinement gastronomique, variété de viandes et service professionnel.',
    inclusions: [
      'Vin d\'honneur : 4 pièces cocktail & canapés par invité',
      '4 entrées gourmandes (charcuteries fines, salades composées, terrines)',
      'Grillades mixtes (brochettes zébu tendre, cuisses de poulet braisées, saucisses paysannes)',
      '1 plat de poisson ou fruits de mer en sauce douce',
      '3 accompagnements au choix (riz au jasmin, légumes glacés, pommes grenailles)',
      'Sauces signatures (combava, poivre vert, rougail)'
    ],
    desserts: [
      'Buffet de douceurs : tartelettes gourmandes, verrines exotiques et fruits sculptés'
    ],
    suitableFor: 'Mariages, fiançailles, réceptions privées, cocktails d\'entreprise'
  },
  {
    id: 'prestige',
    name: 'Formule Prestige',
    tagline: 'L\'excellence gastronomique pour vos réceptions d\'exception',
    indicativePricePerPersonMGA: 95000,
    badge: 'Grand Événement',
    description: 'Un voyage culinaire haut de gamme avec des produits nobles, une présentation d\'art et un service à la hauteur.',
    inclusions: [
      'Cocktail prestige : 6 canapés raffinés, samoussas croustillants et verrines foie gras / fruits de mer',
      'Entrée noble : carpaccio de zébu fumé ou nage de crevettes aux agrumes',
      'Duo de plats signatures : filet de zébu poêlé au poivre vert & pavé de mérou ou gambas rôties',
      'Accompagnements gourmets travaillés par notre chef',
      'Personnel de service complet en tenue de gala inclus',
      'Mise en place minutieuse et art de la table complet'
    ],
    desserts: [
      'Pièce montée personnalisée ou gâteau signature + mignardises et café'
    ],
    suitableFor: 'Mariages d\'exception, galas officiels, dîners d\'ambassade, jubilés'
  }
];

export const EXTRA_OPTIONS: ExtraOption[] = [
  {
    id: 'boissons_soft',
    name: 'Pack Boissons Soft & Jus Frais',
    description: 'Eaux minérales de Madagascar, sodas et jus de fruits frais locaux (corossol, mangue, passion).',
    priceType: 'per_person',
    priceMGA: 8000,
    category: 'boissons'
  },
  {
    id: 'cocktails_bar',
    name: 'Bar à Cocktails & Vin d\'Honneur',
    description: 'Cocktails signature avec et sans alcool, punch traditionnel malgache et barman dédié pour l\'accueil.',
    priceType: 'per_person',
    priceMGA: 15000,
    category: 'boissons'
  },
  {
    id: 'service_staff',
    name: 'Brigade de Serveurs en Salle',
    description: 'Équipe de serveurs professionnels en uniforme pour le service à table, le débarrassage et la tenue de salle (1 serveur / 25 invités).',
    priceType: 'per_person',
    priceMGA: 6000,
    category: 'service'
  },
  {
    id: 'art_de_la_table',
    name: 'Art de la Table & Nappage Prestige',
    description: 'Nappes en tissu blanc repassé, chemins de table, serviettes coordonnées, assiettes en porcelaine et verres à pied.',
    priceType: 'per_person',
    priceMGA: 7000,
    category: 'art_table'
  },
  {
    id: 'piece_montee',
    name: 'Pièce Montée Nuptiale / Gâteau Création',
    description: 'Création pâtissière sur-mesure selon votre thème avec cascades de choux caramélisés ou wedding cake garni.',
    priceType: 'fixed',
    priceMGA: 350000,
    category: 'animation'
  },
  {
    id: 'cafe_mignardises',
    name: 'Stand Café & Mignardises d\'Antananarivo',
    description: 'Café de Madagascar filtre ou expresso, thés parfumés et mignardises traditionnelles (koba revisités, financiers vanille Bourbon).',
    priceType: 'per_person',
    priceMGA: 5000,
    category: 'boissons'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Buffet Réception Nuptiale',
    category: 'buffet',
    image: '/assets/images/hero_buffet_event_1792658265445.jpg',
    desc: 'Grand buffet d\'accueil pour 250 convives au domaine de Tanjombato.'
  },
  {
    id: 'gal-2',
    title: 'Barbecue et Brochettes Zébu',
    category: 'grillades',
    image: '/assets/images/grillades_bbq_1792658266867.jpg',
    desc: 'Atelier de découpe et grillades en direct au feu de bois pour un anniversaire.'
  },
  {
    id: 'gal-3',
    title: 'Dressage Assiette Dîner de Gala',
    category: 'menu_servi',
    image: '/assets/images/menu_servi_gastronomie_1792658266260.jpg',
    desc: 'Filet de bœuf rôti au poivre sauvage pour une soirée d\'entreprise à Ivato.'
  },
  {
    id: 'gal-4',
    title: 'Assortiment Salé & Canapés Froids',
    category: 'buffet',
    image: '/assets/images/buffet_traiteur_1792658265909.jpg',
    desc: 'Verrines colorées, mini-burgers gourmets et canapés sur ardoise.'
  },
  {
    id: 'gal-5',
    title: 'Mise en Place Romantique sous Pergola',
    category: 'reception',
    image: '/assets/images/reception_mariage_1792658267035.jpg',
    desc: 'Ambiance guinguette chic et tables dorées sur les hauteurs d\'Ilafy.'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Combien de temps à l’avance faut-il réserver Traiteur Laskar ?',
    answer: 'Pour les mariages en haute saison (juillet à décembre), nous conseillons de bloquer votre date 2 à 4 mois à l’avance. Pour les anniversaires, séminaires ou réceptions privées, un délai de 2 à 3 semaines est généralement suffisant selon notre calendrier de disponibilité.'
  },
  {
    question: 'Dans quelles zones d\'Antananarivo intervenez-vous ?',
    answer: 'Nous couvrons l\'ensemble de l\'agglomération d\'Antananarivo (Centre-ville, Ankorondrano, Ivandry, Ilafy, Ambohimanga, Ivato, By-pass, Tanjombato, Talatamaty). Des déplacements en dehors de la province d’Analamanga sont également possibles sur devis spécifique.'
  },
  {
    question: 'Les prix affichés sur ce site sont-ils définitifs ?',
    answer: 'Ce simulateur fournit une estimation indicative de démonstration pour vous aider à budgétiser votre événement. Le tarif final est confirmé par Traiteur Laskar après avoir validé avec vous les choix précis de viandes, entrées, accompagnements et la logistique du lieu.'
  },
  {
    question: 'Est-il possible de faire une séance de dégustation avant le mariage ?',
    answer: 'Absolument ! Pour les mariages et réceptions importantes à partir de 80 invités, une séance de dégustation des plats sélectionnés peut être programmée une fois le premier acompte validé afin d\'ajuster les assaisonnements selon vos souhaits.'
  },
  {
    question: 'Fournissez-vous la vaisselle, les chauffe-plats et les serveurs ?',
    answer: 'Oui. Selon la formule choisie, nous fournissons les réchauds (chafing dishes) professionnels, pinces, corbeilles et nous proposons en option ou en formule Prestige la vaisselle complète (assiettes porcelaine, verres, couverts) ainsi qu\'une brigade de service en uniforme.'
  }
];

export function formatPriceMGA(val: number): string {
  return new Intl.NumberFormat('fr-MG').format(val) + ' Ar';
}

export function formatPriceEUR(valMGA: number): string {
  // Conversion approximative indicative (~1 EUR = 4900 MGA) utile pour la diaspora
  const euros = Math.round(valMGA / 4900);
  return `~${euros} €`;
}
