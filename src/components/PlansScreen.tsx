import React, { useState } from 'react';
import { Play, Clock, Flame, Dumbbell, Lock, Sparkles } from 'lucide-react';
import { Difficulty, Language, MuscleGroup, WorkoutPlan } from '../types';
import { getTranslation } from '../localization/translations';

interface PlansScreenProps {
  plans: WorkoutPlan[];
  selectedCategory: MuscleGroup | 'all';
  onSelectCategory: (cat: MuscleGroup | 'all') => void;
  lang: Language;
  isPremium: boolean;
  onStartPlan: (plan: WorkoutPlan) => void;
  onOpenRewardedAd: (plan: WorkoutPlan) => void;
  onOpenPremium: () => void;
}

export const PlansScreen: React.FC<PlansScreenProps> = ({
  plans,
  selectedCategory,
  onSelectCategory,
  lang,
  isPremium,
  onStartPlan,
  onOpenRewardedAd,
  onOpenPremium
}) => {
  const [levelFilter, setLevelFilter] = useState<Difficulty | 'all'>('all');

  const filteredPlans = plans.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesLevel = levelFilter === 'all' || p.level === levelFilter;
    return matchesCategory && matchesLevel;
  });

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'beginner':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'intermediate':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'advanced':
        return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-4">
      {/* Screen Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {getTranslation(lang, 'tabPlans')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {getTranslation(lang, 'tagline')}
        </p>
      </div>

      {/* Difficulty Level Segmented Filter */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(lvl => (
          <button
            key={lvl}
            onClick={() => setLevelFilter(lvl)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
              levelFilter === lvl
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {lvl === 'all' ? getTranslation(lang, 'all') : getTranslation(lang, lvl)}
          </button>
        ))}
      </div>

      {/* Plans List */}
      <div className="space-y-3 pt-1">
        {filteredPlans.map(plan => {
          const isLocked = plan.isPremium && !isPremium;
          const title = lang === 'ku-sorani' ? plan.titleKu : lang === 'ku-kurmanji' ? plan.titleKm : plan.titleEn;
          const subtitle = lang === 'ku-sorani' ? plan.subtitleKu : lang === 'ku-kurmanji' ? plan.subtitleKm : plan.subtitleEn;

          return (
            <div
              key={plan.id}
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3 transition-all hover:border-emerald-500/50"
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColor(
                      plan.level
                    )}`}
                  >
                    {getTranslation(lang, plan.level)}
                  </span>
                  {plan.isChallenge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20">
                      {plan.challengeDays} {getTranslation(lang, 'days')}
                    </span>
                  )}
                </div>

                {isLocked && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                    <Lock className="w-3 h-3" />
                    <span>{getTranslation(lang, 'proBadge')}</span>
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{plan.durationMinutes} {getTranslation(lang, 'min')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>{plan.calories} {getTranslation(lang, 'kcal')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-teal-500" />
                  <span>{plan.exerciseCount} {getTranslation(lang, 'exercises')}</span>
                </div>
              </div>

              {/* Start CTA Button */}
              <div>
                {isLocked ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenRewardedAd(plan)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{getTranslation(lang, 'watchReward')}</span>
                    </button>
                    <button
                      onClick={onOpenPremium}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
                    >
                      {getTranslation(lang, 'removeAds')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onStartPlan(plan)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{getTranslation(lang, 'startWorkout')}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
