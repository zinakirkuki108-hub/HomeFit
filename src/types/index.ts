export type Language = 'en' | 'ku-sorani' | 'ku-kurmanji';

export type MuscleGroup =
  | 'full_body'
  | 'abs'
  | 'chest'
  | 'arms'
  | 'legs'
  | 'glutes'
  | 'cardio'
  | 'stretching';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  nameEn: string;
  nameKu: string;
  nameKm: string;
  muscleGroup: MuscleGroup;
  difficulty: Difficulty;
  animationType:
    | 'pushups'
    | 'squats'
    | 'lunges'
    | 'plank'
    | 'mountain_climbers'
    | 'jumping_jacks'
    | 'burpees'
    | 'situps'
    | 'bicycle_crunches'
    | 'glute_bridge'
    | 'high_knees'
    | 'stretching';
  instructionsEn: string[];
  instructionsKu: string[];
  instructionsKm: string[];
  commonMistakesEn: string[];
  commonMistakesKu: string[];
  commonMistakesKm: string[];
  safetyTipsEn: string[];
  safetyTipsKu: string[];
  safetyTipsKm: string[];
  defaultDurationSec: number;
  defaultReps?: number;
  isRepsBased?: boolean;
  caloriesBurnedPerMin: number;
}

export interface WorkoutPlan {
  id: string;
  titleEn: string;
  titleKu: string;
  titleKm: string;
  subtitleEn: string;
  subtitleKu: string;
  subtitleKm: string;
  level: Difficulty;
  category: MuscleGroup;
  durationMinutes: number;
  calories: number;
  exerciseCount: number;
  isChallenge?: boolean;
  challengeDays?: number;
  isPremium?: boolean;
  exerciseIds: string[];
}

export interface WorkoutSession {
  id: string;
  planId: string;
  planTitle: string;
  completedAt: string; // ISO string
  durationSeconds: number;
  caloriesBurned: number;
  exercisesCompleted: number;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  fitnessGoal: 'lose_weight' | 'build_muscle' | 'stay_fit' | 'improve_strength';
  fitnessLevel: Difficulty;
  dailyCalorieGoal: number;
  isPremium: boolean;
}

export interface AppSettings {
  language: Language;
  theme: 'dark' | 'light';
  soundEffects: boolean;
  voiceGuide: boolean;
  restTimerSeconds: number;
  notificationsEnabled: boolean;
  reminderTime: string; // "08:00"
}
