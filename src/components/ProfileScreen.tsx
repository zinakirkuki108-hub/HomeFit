import React, { useState } from 'react';
import { User, Activity, Target, Sparkles, Check, Heart, Shield } from 'lucide-react';
import { Difficulty, Language, UserProfile } from '../types';
import { getTranslation } from '../localization/translations';
import { calculateBMI } from '../utils/storage';

interface ProfileScreenProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  lang: Language;
  onOpenPremium: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  lang,
  onOpenPremium
}) => {
  const [form, setForm] = useState<UserProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const { bmi, categoryKey, color } = calculateBMI(form.heightCm, form.weightKg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Recommended workout level derived from age & fitness level
  const getRecommendedPlan = () => {
    if (form.fitnessLevel === 'advanced') return lang === 'ku-sorani' ? 'تەقینەوەی پێشکەوتوو' : 'Advanced Athlete Shred';
    if (form.fitnessLevel === 'intermediate') return lang === 'ku-sorani' ? 'هێزی ناوەند' : 'Intermediate Power';
    return lang === 'ku-sorani' ? 'بناغەی سەرەتایی' : 'Beginner Foundation';
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-md mx-auto space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {getTranslation(lang, 'profile')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {getTranslation(lang, 'editProfile')}
        </p>
      </div>

      {/* HEALTH CALCULATOR HIGHLIGHT CARD (BMI & Calorie Target) */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {getTranslation(lang, 'bmi')}
            </span>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}25`, color }}
          >
            {getTranslation(lang, categoryKey)}
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-4xl font-black font-mono tracking-tight text-white">
              {bmi}
            </span>
            <span className="text-xs text-slate-400 ml-1.5 font-medium">kg/m²</span>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">
              {getTranslation(lang, 'dailyCalorieGoal')}
            </p>
            <p className="text-lg font-bold font-mono text-emerald-400">
              {form.dailyCalorieGoal} {getTranslation(lang, 'kcal')}
            </p>
          </div>
        </div>

        {/* Visual BMI Gauge Range Bar */}
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-slate-800 flex overflow-hidden">
            <div className="h-full w-1/4 bg-blue-500/60" title="Underweight <18.5" />
            <div className="h-full w-2/5 bg-emerald-500" title="Normal 18.5-24.9" />
            <div className="h-full w-1/5 bg-amber-500" title="Overweight 25-29.9" />
            <div className="h-full w-1/6 bg-rose-500" title="Obese >30" />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>16</span>
            <span>18.5</span>
            <span>25</span>
            <span>30+</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs flex items-center justify-between">
          <span className="text-slate-400">{getTranslation(lang, 'recommendedLevel')}:</span>
          <span className="font-bold text-emerald-400">{getRecommendedPlan()}</span>
        </div>
      </div>

      {/* Pro Membership Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              {form.isPremium ? getTranslation(lang, 'premiumActive') : getTranslation(lang, 'monetizationTitle')}
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {form.isPremium ? 'All workouts unlocked & 100% ad-free' : getTranslation(lang, 'removeAds')}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPremium}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm"
        >
          {form.isPremium ? 'PRO' : 'Upgrade'}
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Name & Age */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {getTranslation(lang, 'name')}
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/50 outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {getTranslation(lang, 'age')}
            </label>
            <input
              type="number"
              min="12"
              max="99"
              value={form.age}
              onChange={e => setForm({ ...form, age: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/50 outline-none"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {getTranslation(lang, 'gender')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['male', 'female', 'other'] as const).map(g => (
              <button
                type="button"
                key={g}
                onClick={() => setForm({ ...form, gender: g })}
                className={`py-2 text-xs font-semibold rounded-xl capitalize transition-all ${
                  form.gender === g
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {getTranslation(lang, g)}
              </button>
            ))}
          </div>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {getTranslation(lang, 'height')} (cm)
            </label>
            <input
              type="number"
              min="100"
              max="240"
              value={form.heightCm}
              onChange={e => setForm({ ...form, heightCm: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono font-medium focus:ring-2 focus:ring-emerald-500/50 outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {getTranslation(lang, 'weight')} (kg)
            </label>
            <input
              type="number"
              min="30"
              max="220"
              value={form.weightKg}
              onChange={e => setForm({ ...form, weightKg: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono font-medium focus:ring-2 focus:ring-emerald-500/50 outline-none"
              required
            />
          </div>
        </div>

        {/* Fitness Goal */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {getTranslation(lang, 'fitnessGoal')}
          </label>
          <select
            value={form.fitnessGoal}
            onChange={e => setForm({ ...form, fitnessGoal: e.target.value as any })}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/50 outline-none"
          >
            <option value="lose_weight">{getTranslation(lang, 'loseWeight')}</option>
            <option value="build_muscle">{getTranslation(lang, 'buildMuscle')}</option>
            <option value="stay_fit">{getTranslation(lang, 'stayFit')}</option>
            <option value="improve_strength">{getTranslation(lang, 'improveStrength')}</option>
          </select>
        </div>

        {/* Fitness Level */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {getTranslation(lang, 'fitnessLevel')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['beginner', 'intermediate', 'advanced'] as const).map(lvl => (
              <button
                type="button"
                key={lvl}
                onClick={() => setForm({ ...form, fitnessLevel: lvl })}
                className={`py-2 text-xs font-semibold rounded-xl capitalize transition-all ${
                  form.fitnessLevel === lvl
                    ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {getTranslation(lang, lvl)}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Calorie Goal Slider */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {getTranslation(lang, 'dailyCalorieGoal')}
            </span>
            <span className="font-mono font-bold text-emerald-500">
              {form.dailyCalorieGoal} {getTranslation(lang, 'kcal')}
            </span>
          </div>
          <input
            type="range"
            min="150"
            max="800"
            step="25"
            value={form.dailyCalorieGoal}
            onChange={e => setForm({ ...form, dailyCalorieGoal: Number(e.target.value) })}
            className="w-full accent-emerald-500"
          />
        </div>

        {/* Save CTA */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved!</span>
            </>
          ) : (
            <span>{getTranslation(lang, 'saveProfile')}</span>
          )}
        </button>
      </form>
    </div>
  );
};
