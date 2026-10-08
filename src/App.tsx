import React, { useState, useEffect } from 'react';
import { NavTab, Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { PlansScreen } from './components/PlansScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { SettingsModal } from './components/SettingsModal';
import { SafetyDisclaimerModal } from './components/SafetyDisclaimerModal';
import { AdMobModal } from './components/AdMobModal';
import { DeviceFrame } from './components/DeviceFrame';

import {
  AppSettings,
  MuscleGroup,
  UserProfile,
  WorkoutPlan,
  WorkoutSession
} from './types';
import { EXERCISES } from './data/exercises';
import { WORKOUT_PLANS } from './data/plans';
import {
  addWorkoutSession,
  calculateStreakStats,
  getFavorites,
  getStoredHistory,
  getStoredProfile,
  getStoredSettings,
  saveStoredProfile,
  saveStoredSettings,
  toggleFavorite
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [settings, setSettings] = useState<AppSettings>(() => getStoredSettings());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getStoredProfile());
  const [history, setHistory] = useState<WorkoutSession[]>(() => getStoredHistory());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());

  // Active workout player state
  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MuscleGroup | 'all'>('all');

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [adModal, setAdModal] = useState<{
    isOpen: boolean;
    type: 'interstitial' | 'rewarded';
    onReward?: () => void;
  }>({
    isOpen: false,
    type: 'interstitial'
  });

  // Calculate streak stats
  const streakStats = calculateStreakStats(history);
  const todaySession = history[0] || null;

  // Sync theme to DOM
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Sync text direction for Kurdish Sorani (Arabic script RTL)
  const isRtl = settings.language === 'ku-sorani';

  const handleUpdateSettings = (updated: AppSettings) => {
    setSettings(updated);
    saveStoredSettings(updated);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveStoredProfile(updated);
  };

  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const handleTogglePremium = () => {
    const updated = { ...userProfile, isPremium: !userProfile.isPremium };
    setUserProfile(updated);
    saveStoredProfile(updated);
  };

  const handleStartWorkout = (plan: WorkoutPlan) => {
    // If premium plan and not premium, prompt rewarded ad
    if (plan.isPremium && !userProfile.isPremium) {
      setAdModal({
        isOpen: true,
        type: 'rewarded',
        onReward: () => {
          setActiveWorkoutPlan(plan);
        }
      });
      return;
    }
    setActiveWorkoutPlan(plan);
  };

  const handleFinishWorkout = (session: WorkoutSession) => {
    const updatedHistory = addWorkoutSession(session);
    setHistory(updatedHistory);
  };

  const handleCloseWorkoutPlayer = () => {
    setActiveWorkoutPlan(null);
    // Trigger interstitial ad between workouts for non-premium users
    if (!userProfile.isPremium) {
      setAdModal({
        isOpen: true,
        type: 'interstitial'
      });
    }
  };

  const handleSelectCategoryFromHome = (category: MuscleGroup) => {
    setSelectedCategory(category);
    setCurrentTab('plans');
  };

  // Get current plan exercises
  const currentPlanExercises = activeWorkoutPlan
    ? activeWorkoutPlan.exerciseIds
        .map(id => EXERCISES.find(e => e.id === id))
        .filter((e): e is typeof EXERCISES[0] => !!e)
    : [];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'rtl' : ''}>
      <DeviceFrame theme={settings.theme}>
        {/* Render Tab Screens */}
        {currentTab === 'home' && (
          <HomeScreen
            userProfile={userProfile}
            lang={settings.language}
            streakStats={streakStats}
            todaySession={todaySession}
            recommendedPlans={WORKOUT_PLANS}
            onStartPlan={handleStartWorkout}
            onSelectCategory={handleSelectCategoryFromHome}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
            onOpenPremium={handleTogglePremium}
          />
        )}

        {currentTab === 'plans' && (
          <PlansScreen
            plans={WORKOUT_PLANS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            lang={settings.language}
            isPremium={userProfile.isPremium}
            onStartPlan={handleStartWorkout}
            onOpenRewardedAd={plan => {
              setAdModal({
                isOpen: true,
                type: 'rewarded',
                onReward: () => setActiveWorkoutPlan(plan)
              });
            }}
            onOpenPremium={handleTogglePremium}
          />
        )}

        {currentTab === 'library' && (
          <LibraryScreen
            exercises={EXERCISES}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            lang={settings.language}
            isPremium={userProfile.isPremium}
            onOpenPremium={handleTogglePremium}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressScreen
            history={history}
            streakStats={streakStats}
            lang={settings.language}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            profile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            lang={settings.language}
            onOpenPremium={handleTogglePremium}
          />
        )}

        {/* Mobile Thumb Tab Bar */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          lang={settings.language}
        />
      </DeviceFrame>

      {/* FULL-SCREEN ACTIVE WORKOUT PLAYER */}
      {activeWorkoutPlan && currentPlanExercises.length > 0 && (
        <WorkoutPlayer
          plan={activeWorkoutPlan}
          exercises={currentPlanExercises}
          lang={settings.language}
          soundEnabled={settings.soundEffects}
          voiceEnabled={settings.voiceGuide}
          restDurationSec={settings.restTimerSeconds}
          onFinish={handleFinishWorkout}
          onClose={handleCloseWorkoutPlayer}
        />
      )}

      {/* SETTINGS MODAL */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        isPremium={userProfile.isPremium}
        onTogglePremium={handleTogglePremium}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* HEALTH & SAFETY DISCLAIMER MODAL */}
      <SafetyDisclaimerModal
        isOpen={isDisclaimerOpen}
        lang={settings.language}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      {/* GOOGLE ADMOB MODAL (Interstitial & Rewarded Video simulation) */}
      <AdMobModal
        isOpen={adModal.isOpen}
        type={adModal.type}
        lang={settings.language}
        onClose={() => setAdModal({ ...adModal, isOpen: false })}
        onRewardGranted={adModal.onReward}
      />
    </div>
  );
}
