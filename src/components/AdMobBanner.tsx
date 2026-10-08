import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../localization/translations';

interface AdMobBannerProps {
  isPremium: boolean;
  lang: Language;
  onOpenPremium: () => void;
  className?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({
  isPremium,
  lang,
  onOpenPremium,
  className = ''
}) => {
  if (isPremium) {
    return null; // Premium removes all ads permanently
  }

  return (
    <div
      className={`relative mx-auto my-3 w-full max-w-md overflow-hidden rounded-xl border border-slate-700/60 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-2.5 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* AdMob Tag & Sponsor visual */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">
            Ad
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
              <span>Google AdMob</span>
              <span>·</span>
              <span className="text-emerald-400">Sponsored</span>
            </div>
            <p className="truncate text-xs font-semibold text-slate-200">
              {lang === 'ku-sorani'
                ? 'پێڵاوی وەرزشی نایاب — داشکاندنی ٣٠٪'
                : 'Performance Pro Fit Shoes — 30% Off'}
            </p>
          </div>
        </div>

        {/* Upgrade Pill */}
        <button
          onClick={onOpenPremium}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[10px] font-semibold text-emerald-300 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>PRO</span>
        </button>
      </div>
    </div>
  );
};
