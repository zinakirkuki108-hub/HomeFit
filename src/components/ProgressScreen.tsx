import React, { useState } from 'react';
import { Flame, Clock, Calendar, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Language, WorkoutSession } from '../types';
import { getTranslation } from '../localization/translations';

interface ProgressScreenProps {
  history: WorkoutSession[];
  streakStats: {
    currentStreak: number;
    longestStreak: number;
    totalTimeMinutes: number;
    totalCalories: number;
    workoutsThisWeek: number;
    workoutsThisMonth: number;
  };
  lang: Language;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  history,
  streakStats,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  // Days of week data for bar chart
  const weekDays = [
    { label: 'Mon', ku: 'دووشەممە', value: 45, full: 'Monday' },
    { label: 'Tue', ku: 'سێشەممە', value: 90, full: 'Tuesday' },
    { label: 'Wed', ku: 'چوارشەممە', value: 65, full: 'Wednesday' },
    { label: 'Thu', ku: 'پێنجشەممە', value: 120, full: 'Thursday' },
    { label: 'Fri', ku: 'هەینی', value: 30, full: 'Friday' },
    { label: 'Sat', ku: 'شەممە', value: 160, full: 'Saturday' },
    { label: 'Sun', ku: 'یەکشەممە', value: 210, full: 'Sunday', active: true }
  ];

  const maxVal = Math.max(...weekDays.map(w => w.value));

  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} ${getTranslation(lang, 'min')}`;
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(lang === 'ku-sorani' ? 'ar-IQ' : 'en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {getTranslation(lang, 'progress')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {getTranslation(lang, 'weeklyActivity')}
        </p>
      </div>

      {/* Primary KPI Metric Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Calories Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              {getTranslation(lang, 'caloriesBurned')}
            </span>
            <div className="p-1 rounded-lg bg-rose-500/10 text-rose-500">
              <Flame className="w-4 h-4 fill-current" />
            </div>
          </div>
          <p className="text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
            {streakStats.totalCalories}
          </p>
          <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18% this week</span>
          </p>
        </div>

        {/* Total Time Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              {getTranslation(lang, 'totalWorkoutTime')}
            </span>
            <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
            {streakStats.totalTimeMinutes} <span className="text-sm font-normal text-slate-400">{getTranslation(lang, 'min')}</span>
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            {streakStats.workoutsThisMonth} sessions completed
          </p>
        </div>
      </div>

      {/* Streaks Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {getTranslation(lang, 'currentStreak')}: <span className="text-amber-500 font-bold">{streakStats.currentStreak} {getTranslation(lang, 'days')}</span>
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {getTranslation(lang, 'longestStreak')}: {streakStats.longestStreak} {getTranslation(lang, 'days')}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
          ON FIRE
        </span>
      </div>

      {/* WEEKLY ACTIVITY BAR CHART */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {getTranslation(lang, 'weeklyActivity')}
          </h3>
          <span className="text-xs font-semibold text-emerald-500">
            {streakStats.workoutsThisWeek} {getTranslation(lang, 'exercises')} this week
          </span>
        </div>

        {/* Bar visual representation */}
        <div className="flex items-end justify-between gap-2 h-36 pt-4 px-1">
          {weekDays.map(day => {
            const heightPercent = Math.max(15, Math.round((day.value / maxVal) * 100));
            return (
              <div key={day.label} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.value}k
                </span>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-24 flex items-end overflow-hidden p-0.5">
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      day.active
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'bg-slate-300 dark:bg-slate-700 hover:bg-emerald-500/50'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold ${
                    day.active ? 'text-emerald-500 font-bold' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT WORKOUT HISTORY LOG */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {getTranslation(lang, 'history')}
        </h3>

        {history.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-4">
            {getTranslation(lang, 'noHistoryYet')}
          </p>
        ) : (
          <div className="space-y-2">
            {history.slice(0, 5).map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {session.planTitle}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {formatDate(session.completedAt)} · {session.exercisesCompleted} {getTranslation(lang, 'exercises')}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold font-mono text-emerald-500">
                    {session.caloriesBurned} {getTranslation(lang, 'kcal')}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {formatSessionTime(session.durationSeconds)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
