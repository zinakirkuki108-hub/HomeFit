import React, { useState } from 'react';
import { Search, Heart, AlertTriangle, ShieldCheck, CheckCircle, X, Dumbbell } from 'lucide-react';
import { Exercise, Language, MuscleGroup } from '../types';
import { getTranslation } from '../localization/translations';
import { ExerciseAnimation } from './ExerciseAnimation';
import { AdMobBanner } from './AdMobBanner';

interface LibraryScreenProps {
  exercises: Exercise[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  lang: Language;
  isPremium: boolean;
  onOpenPremium: () => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  exercises,
  favorites,
  onToggleFavorite,
  lang,
  isPremium,
  onOpenPremium
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | 'all'>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filtered = exercises.filter(ex => {
    const name = (lang === 'ku-sorani' ? ex.nameKu : lang === 'ku-kurmanji' ? ex.nameKm : ex.nameEn).toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || name.includes(query) || ex.nameEn.toLowerCase().includes(query) || ex.muscleGroup.includes(query);
    const matchesMuscle = muscleFilter === 'all' || ex.muscleGroup === muscleFilter;
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {getTranslation(lang, 'tabLibrary')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {getTranslation(lang, 'allExercises')}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={getTranslation(lang, 'searchExercises')}
          className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Muscle Filter Tabs Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {(['all', 'abs', 'chest', 'legs', 'cardio', 'glutes', 'stretching'] as const).map(muscle => (
          <button
            key={muscle}
            onClick={() => setMuscleFilter(muscle)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-all shrink-0 ${
              muscleFilter === muscle
                ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {muscle === 'all' ? getTranslation(lang, 'all') : muscle}
          </button>
        ))}
      </div>

      {/* Exercises List Cards */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(ex => {
          const isFav = favorites.includes(ex.id);
          const name = lang === 'ku-sorani' ? ex.nameKu : lang === 'ku-kurmanji' ? ex.nameKm : ex.nameEn;

          return (
            <div
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 cursor-pointer shadow-sm group transition-all"
            >
              {/* Mini animated preview box */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                <ExerciseAnimation type={ex.animationType} muscleGroup={ex.muscleGroup} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                    {ex.muscleGroup}
                  </span>
                  <span className="text-[10px] text-slate-400">·</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                    {getTranslation(lang, ex.difficulty)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-500 transition-colors">
                  {name}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {ex.isRepsBased
                    ? `${ex.defaultReps} ${getTranslation(lang, 'repBased')}`
                    : `${ex.defaultDurationSec} ${getTranslation(lang, 'sec')}`}
                </p>
              </div>

              {/* Bookmark Favorite Button */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  onToggleFavorite(ex.id);
                }}
                className={`p-2 rounded-xl transition-colors ${
                  isFav
                    ? 'text-rose-500 bg-rose-500/10'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                aria-label="Toggle favorite"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* AdMob Banner */}
      <AdMobBanner isPremium={isPremium} lang={lang} onOpenPremium={onOpenPremium} />

      {/* EXERCISE DETAIL MODAL */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Top Close Button & Title */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {selectedExercise.muscleGroup}
                </span>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'ku-sorani'
                    ? selectedExercise.nameKu
                    : lang === 'ku-kurmanji'
                    ? selectedExercise.nameKm
                    : selectedExercise.nameEn}
                </h2>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Kinetic Animation */}
            <div className="w-full">
              <ExerciseAnimation
                type={selectedExercise.animationType}
                muscleGroup={selectedExercise.muscleGroup}
              />
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{getTranslation(lang, 'instructions')}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(lang === 'ku-sorani'
                  ? selectedExercise.instructionsKu
                  : lang === 'ku-kurmanji'
                  ? selectedExercise.instructionsKm
                  : selectedExercise.instructionsEn
                ).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{getTranslation(lang, 'commonMistakes')}</span>
              </h4>
              <ul className="space-y-1 text-xs text-amber-200/90 list-disc list-inside">
                {(lang === 'ku-sorani'
                  ? selectedExercise.commonMistakesKu
                  : lang === 'ku-kurmanji'
                  ? selectedExercise.commonMistakesKm
                  : selectedExercise.commonMistakesEn
                ).map((m, idx) => (
                  <li key={idx} className="leading-relaxed">{m}</li>
                ))}
              </ul>
            </div>

            {/* Safety Tips */}
            <div className="space-y-2 p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{getTranslation(lang, 'safetyTips')}</span>
              </h4>
              <ul className="space-y-1 text-xs text-teal-200/90 list-disc list-inside">
                {(lang === 'ku-sorani'
                  ? selectedExercise.safetyTipsKu
                  : lang === 'ku-kurmanji'
                  ? selectedExercise.safetyTipsKm
                  : selectedExercise.safetyTipsEn
                ).map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
