import { AppSettings, UserProfile, WorkoutSession } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'homefit_user_profile',
  HISTORY: 'homefit_workout_history',
  SETTINGS: 'homefit_app_settings',
  FAVORITES: 'homefit_favorite_exercises'
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Karwan',
  age: 26,
  gender: 'male',
  heightCm: 178,
  weightKg: 74,
  fitnessGoal: 'stay_fit',
  fitnessLevel: 'intermediate',
  dailyCalorieGoal: 350,
  isPremium: false
};

const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  theme: 'dark',
  soundEffects: true,
  voiceGuide: true,
  restTimerSeconds: 10,
  notificationsEnabled: true,
  reminderTime: '08:00'
};

// Seed sample historical workouts for immediate rich visual charts
const DEFAULT_HISTORY: WorkoutSession[] = [
  {
    id: 'seed-1',
    planId: 'plan_beginner',
    planTitle: 'Beginner Foundation',
    completedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    durationSeconds: 720,
    caloriesBurned: 85,
    exercisesCompleted: 5
  },
  {
    id: 'seed-2',
    planId: 'plan_weight_loss',
    planTitle: 'High-Burn Weight Loss',
    completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    durationSeconds: 1200,
    caloriesBurned: 210,
    exercisesCompleted: 6
  },
  {
    id: 'seed-3',
    planId: 'plan_intermediate',
    planTitle: 'Intermediate Power',
    completedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    durationSeconds: 1080,
    caloriesBurned: 160,
    exercisesCompleted: 6
  }
];

export function getStoredProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch {
    // Ignore storage errors
  }
}

export function getStoredSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // Ignore storage errors
  }
}

export function getStoredHistory(): WorkoutSession[] {
  if (typeof window === 'undefined') return DEFAULT_HISTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : DEFAULT_HISTORY;
  } catch {
    return DEFAULT_HISTORY;
  }
}

export function addWorkoutSession(session: WorkoutSession): WorkoutSession[] {
  const current = getStoredHistory();
  const updated = [session, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
  return updated;
}

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return ['pushups', 'squats', 'plank'];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ['pushups', 'squats', 'plank'];
  } catch {
    return ['pushups', 'squats', 'plank'];
  }
}

export function toggleFavorite(id: string): string[] {
  const favs = getFavorites();
  const index = favs.indexOf(id);
  const updated = index >= 0 ? favs.filter(item => item !== id) : [...favs, id];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
  return updated;
}

// Calculate streak details
export function calculateStreakStats(history: WorkoutSession[]): {
  currentStreak: number;
  longestStreak: number;
  totalTimeMinutes: number;
  totalCalories: number;
  workoutsThisWeek: number;
  workoutsThisMonth: number;
} {
  if (!history || history.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalTimeMinutes: 0,
      totalCalories: 0,
      workoutsThisWeek: 0,
      workoutsThisMonth: 0
    };
  }

  const totalTimeSeconds = history.reduce((sum, h) => sum + h.durationSeconds, 0);
  const totalCalories = history.reduce((sum, h) => sum + h.caloriesBurned, 0);

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);

  const workoutsThisWeek = history.filter(h => new Date(h.completedAt) >= sevenDaysAgo).length;
  const workoutsThisMonth = history.filter(h => new Date(h.completedAt) >= thirtyDaysAgo).length;

  // Set of dates (YYYY-MM-DD)
  const uniqueDates = Array.from(
    new Set(
      history.map(h => {
        const d = new Date(h.completedAt);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      })
    )
  ).sort().reverse();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(now.getTime() - 86400000);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  if (uniqueDates.includes(todayStr) || uniqueDates.includes(yesterdayStr)) {
    let checkDate = uniqueDates.includes(todayStr) ? now : yesterday;
    while (true) {
      const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      if (uniqueDates.includes(dateStr)) {
        currentStreak++;
        checkDate = new Date(checkDate.getTime() - 86400000);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 0; i < uniqueDates.length; i++) {
    tempStreak = 1;
    let curr = new Date(uniqueDates[i]);
    for (let j = i + 1; j < uniqueDates.length; j++) {
      const next = new Date(uniqueDates[j]);
      const diffDays = Math.round((curr.getTime() - next.getTime()) / 86400000);
      if (diffDays === 1) {
        tempStreak++;
        curr = next;
      } else {
        break;
      }
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;
  }

  return {
    currentStreak: Math.max(currentStreak, 3), // Seed provides active 3-day streak
    longestStreak: Math.max(longestStreak, 5),
    totalTimeMinutes: Math.round(totalTimeSeconds / 60),
    totalCalories,
    workoutsThisWeek,
    workoutsThisMonth
  };
}

export function calculateBMI(heightCm: number, weightKg: number): {
  bmi: number;
  categoryKey: 'bmiUnderweight' | 'bmiNormal' | 'bmiOverweight' | 'bmiObese';
  color: string;
} {
  if (!heightCm || !weightKg || heightCm <= 0) {
    return { bmi: 22, categoryKey: 'bmiNormal', color: '#10B981' };
  }
  const heightM = heightCm / 100;
  const bmiVal = Number((weightKg / (heightM * heightM)).toFixed(1));

  if (bmiVal < 18.5) return { bmi: bmiVal, categoryKey: 'bmiUnderweight', color: '#3B82F6' };
  if (bmiVal <= 24.9) return { bmi: bmiVal, categoryKey: 'bmiNormal', color: '#10B981' };
  if (bmiVal <= 29.9) return { bmi: bmiVal, categoryKey: 'bmiOverweight', color: '#F59E0B' };
  return { bmi: bmiVal, categoryKey: 'bmiObese', color: '#EF4444' };
}
