import React from 'react';
import { Home, Layers, Dumbbell, BarChart3, User } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../localization/translations';

export type NavTab = 'home' | 'plans' | 'library' | 'progress' | 'profile';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  lang: Language;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, lang }) => {
  const tabs = [
    { id: 'home' as NavTab, labelKey: 'tabHome' as const, icon: Home },
    { id: 'plans' as NavTab, labelKey: 'tabPlans' as const, icon: Layers },
    { id: 'library' as NavTab, labelKey: 'tabLibrary' as const, icon: Dumbbell },
    { id: 'progress' as NavTab, labelKey: 'tabProgress' as const, icon: BarChart3 },
    { id: 'profile' as NavTab, labelKey: 'tabProfile' as const, icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          const label = getTranslation(lang, tab.labelKey);

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="group flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-all relative"
              aria-label={label}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-400 scale-105'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 transition-colors ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
