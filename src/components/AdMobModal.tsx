import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../localization/translations';

interface AdMobModalProps {
  isOpen: boolean;
  type: 'interstitial' | 'rewarded';
  lang: Language;
  onClose: () => void;
  onRewardGranted?: () => void;
}

export const AdMobModal: React.FC<AdMobModalProps> = ({
  isOpen,
  type,
  lang,
  onClose,
  onRewardGranted
}) => {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setCanSkip(false);
      setRewardClaimed(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaimReward = () => {
    if (onRewardGranted) {
      onRewardGranted();
      setRewardClaimed(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl p-6">
        {/* Ad Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-black text-[10px] tracking-wider uppercase border border-amber-500/30">
              Ad
            </span>
            <span className="text-xs font-semibold text-slate-400">Google AdMob Network</span>
          </div>

          {canSkip ? (
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1 rounded-full transition-colors"
            >
              <span>{getTranslation(lang, 'closeAd')}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
              {getTranslation(lang, 'closeAdIn').replace('{seconds}', String(countdown))}
            </span>
          )}
        </div>

        {/* Sponsor Content Body */}
        <div className="space-y-4 text-center my-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-10 h-10 text-slate-950" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              {type === 'rewarded' ? getTranslation(lang, 'rewardedTitle') : getTranslation(lang, 'interstitialTitle')}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {type === 'rewarded' ? getTranslation(lang, 'rewardedSub') : getTranslation(lang, 'interstitialSub')}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 text-left space-y-1">
            <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Hydration Smart Tracker</p>
            <p className="text-xs text-slate-300">Boost metabolism by 20% with intelligent daily hydration reminders.</p>
          </div>
        </div>

        {/* Action Button */}
        {type === 'rewarded' && (
          <div className="mt-6">
            <button
              onClick={handleClaimReward}
              disabled={!canSkip || rewardClaimed}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              {rewardClaimed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{getTranslation(lang, 'unlocked')}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{getTranslation(lang, 'watchReward')}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
