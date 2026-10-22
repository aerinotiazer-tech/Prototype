import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cateringData';
import { Camera, Eye, X, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Tous les clichés' },
    { id: 'buffet', label: 'Buffets & Cocktails' },
    { id: 'grillades', label: 'Grillades & BBQ' },
    { id: 'menu_servi', label: 'Menus Servis' },
    { id: 'reception', label: 'Réceptions & Tables' }
  ];

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="galerie" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b343f] mb-2">
            <span className="text-[#c99a3e]">✦</span>
            <span>Nos Réalisations Culinaires</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight text-balance">
            La signature visuelle de Traiteur Laskar
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Découvrez nos présentations de réceptions, banquets nuptiaux et ateliers barbecue réalisés à Antananarivo.
          </p>

          {/* Onglets de filtres fonctionnels */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-[#0b343f] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille Galerie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative h-72 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/60"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Bouton loupe au survol */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Légende en bas */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-base font-serif font-bold text-white group-hover:text-[#DFB15B] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note pour le propriétaire du site */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200/90 text-center text-xs text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <Camera className="w-4 h-4 text-[#c99a3e] shrink-0" />
          <span>
            Photos de démonstration facilement remplaçables par les véritables clichés haute définition de l'entreprise Traiteur Laskar.
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-slate-900/60 rounded-full"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-6 bg-slate-900 text-white">
              <h3 className="text-xl font-serif font-bold text-[#DFB15B]">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {activePhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
