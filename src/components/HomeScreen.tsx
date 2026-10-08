import React from 'react';
import { Flame, Play, Clock, Sparkles, Award, ShieldAlert, Settings as SettingsIcon, ChevronRight } from 'lucide-react';
import { Language, MuscleGroup, UserProfile, WorkoutPlan, WorkoutSession } from '../types';
import { getTranslation } from '../localization/translations';
import { CATEGORIES_LIST } from '../data/plans';
import { AdMobBanner } from './AdMobBanner';

interface HomeScreenProps {
  userProfile: UserProfile;
  lang: Language;
  streakStats: {
    currentStreak: number;
    longestStreak: number;
    totalTimeMinutes: number;
    totalCalories: number;
  };
  todaySession: WorkoutSession | null;
  recommendedPlans: WorkoutPlan[];
  onStartPlan: (plan: WorkoutPlan) => void;
  onSelectCategory: (category: MuscleGroup) => void;
  onOpenSettings: () => void;
  onOpenDisclaimer: () => void;
  onOpenPremium: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProfile,
  lang,
  streakStats,
  todaySession,
  recommendedPlans,
  onStartPlan,
  onSelectCategory,
  onOpenSettings,
  onOpenDisclaimer,
  onOpenPremium
}) => {
  const todaysPlan = recommendedPlans[0];
  const dailyGoalPercent = Math.min(
    100,
    Math.round(((todaySession?.caloriesBurned || 120) / (userProfile.dailyCalorieGoal || 350)) * 100)
  );

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-5">
      {/* Top Mobile App Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-500">
            {getTranslation(lang, 'appName')}
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {getTranslation(lang, 'readyToWorkout')}
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenDisclaimer}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
            title="Safety Disclaimer"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Streak & Daily Calorie Hero Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Streak Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 dark:border-amber-500/20 text-slate-900 dark:text-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {getTranslation(lang, 'workoutStreak')}
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500">
              <Flame className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {streakStats.currentStreak}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {getTranslation(lang, 'days')}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            {getTranslation(lang, 'longestStreak')}: {streakStats.longestStreak} {getTranslation(lang, 'days')}
          </p>
        </div>

        {/* Calories & Daily Progress Ring Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 dark:border-emerald-500/20 text-slate-900 dark:text-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {getTranslation(lang, 'dailyProgress')}
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {dailyGoalPercent}%
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {todaySession?.caloriesBurned || 120}/{userProfile.dailyCalorieGoal || 350} {getTranslation(lang, 'kcal')}
            </span>
          </div>
          {/* Progress miniature bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${dailyGoalPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* TODAY'S WORKOUT FEATURED HERO CARD */}
      {todaysPlan && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 text-white p-5 shadow-xl">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider uppercase border border-emerald-500/30">
                {getTranslation(lang, 'todaysWorkout')}
              </span>
              <span className="text-xs font-semibold text-slate-400 capitalize">
                {todaysPlan.level}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-black tracking-tight text-white">
                {lang === 'ku-sorani' ? todaysPlan.titleKu : lang === 'ku-kurmanji' ? todaysPlan.titleKm : todaysPlan.titleEn}
              </h2>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {lang === 'ku-sorani' ? todaysPlan.subtitleKu : lang === 'ku-kurmanji' ? todaysPlan.subtitleKm : todaysPlan.subtitleEn}
              </p>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 text-xs font-medium text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{todaysPlan.durationMinutes} {getTranslation(lang, 'min')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>{todaysPlan.calories} {getTranslation(lang, 'kcal')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{todaysPlan.exerciseCount} {getTranslation(lang, 'exercises')}</span>
              </div>
            </div>

            {/* Quick Start CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onStartPlan(todaysPlan)}
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{getTranslation(lang, 'quickStart')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AdMob Banner (Simulated non-intrusive banner on Home) */}
      <AdMobBanner isPremium={userProfile.isPremium} lang={lang} onOpenPremium={onOpenPremium} />

      {/* CATEGORIES SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {getTranslation(lang, 'categories')}
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {CATEGORIES_LIST.map(cat => {
            const label = getTranslation(lang, cat.key as keyof typeof import('../localization/translations').translations['en']);
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as MuscleGroup)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-center group"
              >
                <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
                  {cat.id === 'full_body' && '⚡'}
                  {cat.id === 'abs' && '🎯'}
                  {cat.id === 'chest' && '🛡️'}
                  {cat.id === 'arms' && '💪'}
                  {cat.id === 'legs' && '🦵'}
                  {cat.id === 'glutes' && '🔥'}
                  {cat.id === 'cardio' && '❤️'}
                  {cat.id === 'stretching' && '🧘'}
                </span>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RECOMMENDED WORKOUTS HORIZONTAL LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {getTranslation(lang, 'recommendedWorkouts')}
          </h3>
        </div>

        <div className="space-y-2.5">
          {recommendedPlans.slice(1, 4).map(plan => {
            const title = lang === 'ku-sorani' ? plan.titleKu : lang === 'ku-kurmanji' ? plan.titleKm : plan.titleEn;
            return (
              <div
                key={plan.id}
                onClick={() => onStartPlan(plan)}
                className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all shadow-sm group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      {plan.level}
                    </span>
                    {plan.isChallenge && (
                      <span className="text-[10px] font-bold text-amber-500">
                        • {plan.challengeDays} {getTranslation(lang, 'days')}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>{plan.durationMinutes} {getTranslation(lang, 'min')}</span>
                    <span>·</span>
                    <span>{plan.calories} {getTranslation(lang, 'kcal')}</span>
                    <span>·</span>
                    <span>{plan.exerciseCount} {getTranslation(lang, 'exercises')}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors text-slate-500 dark:text-slate-400">
                  <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
