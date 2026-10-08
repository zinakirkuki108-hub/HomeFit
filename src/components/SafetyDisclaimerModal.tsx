import React from 'react';
import { AlertTriangle, Check, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../localization/translations';

interface SafetyDisclaimerModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const SafetyDisclaimerModal: React.FC<SafetyDisclaimerModalProps> = ({
  isOpen,
  lang,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 shadow-2xl space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-white">
            {getTranslation(lang, 'disclaimerTitle')}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50 text-left">
            {getTranslation(lang, 'disclaimerText')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>HomeFit Safety First Policy</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{getTranslation(lang, 'iUnderstand')}</span>
        </button>
      </div>
    </div>
  );
};
