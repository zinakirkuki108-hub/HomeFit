import React, { useState } from 'react';
import { X, Globe, Moon, Sun, Bell, Volume2, Clock, Shield, Sparkles, Check, Info } from 'lucide-react';
import { AppSettings, Language } from '../types';
import { getTranslation } from '../localization/translations';

interface SettingsModalProps {
  isOpen: boolean;
  settings: AppSettings;
  onUpdateSettings: (updated: AppSettings) => void;
  isPremium: boolean;
  onTogglePremium: () => void;
  onOpenDisclaimer: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onUpdateSettings,
  isPremium,
  onTogglePremium,
  onOpenDisclaimer,
  onClose
}) => {
  const [notificationSent, setNotificationSent] = useState(false);

  if (!isOpen) return null;

  const handleTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('HomeFit Reminder', {
        body: getTranslation(settings.language, 'reminderPrompt'),
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('HomeFit Reminder', {
            body: getTranslation(settings.language, 'reminderPrompt')
          });
        }
      });
    }
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 space-y-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">
            {getTranslation(settings.language, 'settings')}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. LANGUAGE SELECTOR */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{getTranslation(settings.language, 'language')}</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'en' as Language, label: 'English' },
              { id: 'ku-sorani' as Language, label: 'کوردی (سۆرانی)' },
              { id: 'ku-kurmanji' as Language, label: 'Kurdî' }
            ].map(l => (
              <button
                key={l.id}
                onClick={() => onUpdateSettings({ ...settings, language: l.id })}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                  settings.language === l.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. THEME SWITCHER */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-400" />
            <span>{getTranslation(settings.language, 'theme')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdateSettings({ ...settings, theme: 'dark' })}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                settings.theme === 'dark'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>{getTranslation(settings.language, 'dark')}</span>
            </button>
            <button
              onClick={() => onUpdateSettings({ ...settings, theme: 'light' })}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                settings.theme === 'light'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{getTranslation(settings.language, 'light')}</span>
            </button>
          </div>
        </div>

        {/* 3. SOUND EFFECTS & VOICE CUES */}
        <div className="space-y-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">
                {getTranslation(settings.language, 'soundEffects')}
              </span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, soundEffects: !settings.soundEffects })}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.soundEffects ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.soundEffects ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-slate-700/60 pt-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">
                {getTranslation(settings.language, 'voiceGuide')}
              </span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, voiceGuide: !settings.voiceGuide })}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.voiceGuide ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.voiceGuide ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. REST TIMER SETTING */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{getTranslation(settings.language, 'restTimerSetting')}</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[10, 15, 30].map(sec => (
              <button
                key={sec}
                onClick={() => onUpdateSettings({ ...settings, restTimerSeconds: sec })}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                  settings.restTimerSeconds === sec
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {sec} {getTranslation(settings.language, 'sec')}
              </button>
            ))}
          </div>
        </div>

        {/* 5. WORKOUT NOTIFICATIONS & REMINDERS */}
        <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">
                {getTranslation(settings.language, 'workoutReminders')}
              </span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, notificationsEnabled: !settings.notificationsEnabled })}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.notificationsEnabled ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {settings.notificationsEnabled && (
            <div className="space-y-2 pt-1 border-t border-slate-700/60">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{getTranslation(settings.language, 'reminderTime')}</span>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={e => onUpdateSettings({ ...settings, reminderTime: e.target.value })}
                  className="bg-slate-700 px-2 py-1 rounded-lg text-white font-mono text-xs outline-none"
                />
              </div>

              <button
                onClick={handleTestNotification}
                className="w-full py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {notificationSent ? 'Notification Triggered! 💪' : 'Test Reminder Alert'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* 6. PRO UPGRADE SIMULATOR */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isPremium ? getTranslation(settings.language, 'premiumActive') : getTranslation(settings.language, 'monetizationTitle')}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isPremium ? 'Ads disabled · All 30-Day challenges unlocked' : getTranslation(settings.language, 'removeAds')}
            </p>
          </div>

          <button
            onClick={onTogglePremium}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isPremium
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
            }`}
          >
            {isPremium ? 'Active' : 'Get PRO'}
          </button>
        </div>

        {/* 7. HEALTH DISCLAIMER & PRIVACY */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenDisclaimer();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{getTranslation(settings.language, 'disclaimerTitle')}</span>
            </div>
            <span className="text-[10px] text-slate-400">View</span>
          </button>

          <div className="p-3 rounded-xl bg-slate-800/40 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1 text-slate-300 font-semibold">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>{getTranslation(settings.language, 'about')}</span>
            </div>
            <p>{getTranslation(settings.language, 'aboutText')}</p>
            <p className="pt-1 text-[10px] text-slate-500">{getTranslation(settings.language, 'privacyText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
