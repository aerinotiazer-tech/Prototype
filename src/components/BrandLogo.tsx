import React, { useState } from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  showSubtitle = true
}) => {
  const isDark = variant === 'dark';
  const [imgError, setImgError] = useState(false);

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Logo Officiel Traiteur Laskar fourni par l'utilisateur */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-full flex items-center justify-center relative overflow-hidden transition-transform duration-200 shadow-md ring-2 ring-[#DFB15B]/50 bg-[#097ba0]`}
      >
        {!imgError ? (
          <img
            src="/assets/aistudio/logo-traiteur-laskar-extrait_a1a1b96a.png"
            alt="Logo officiel Traiteur Laskar"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0b343f] text-[#DFB15B] font-serif font-bold text-xs">
            TL
          </div>
        )}
      </div>

      <div className="flex flex-col leading-tight">
        <span
          className={`font-serif tracking-wider font-semibold uppercase ${titleSizes[size]} ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Traiteur <span className="text-[#c99a3e]">Laskar</span>
        </span>
        {showSubtitle && (
          <span
            className={`text-[10px] tracking-widest uppercase font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Antananarivo · Madagascar
          </span>
        )}
      </div>
    </div>
  );
};

