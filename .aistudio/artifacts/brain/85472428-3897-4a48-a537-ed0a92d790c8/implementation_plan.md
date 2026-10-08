# HomeFit: Professional Home Workout Mobile App

A modern, offline-first home workout mobile web application engineered for zero-equipment training. HomeFit delivers tailored workout plans, a full-screen interactive workout player with real-time timers, animated exercise posture loops, audio guidance, Kurdish (Sorani RTL & Kurmanji) and English localization, health metrics (BMI and calorie targets), streak tracking, and realistic Google AdMob integration with a Premium upgrade path.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following recommended architecture choices have been established based on your requirements and mobile UX best practices:

- **Confirmed Localization**: Full bidirectional support for **English** (LTR) and **Kurdish Sorani** (Arabic script, full RTL layout) with an optional **Kurdish Kurmanji** (Latin script) toggle in Settings.
- **Exercise Animations**: Lightweight, fluid vector SVG animation loops showing authentic exercise kinematics (Push-ups, Squats, Planks, Burpees, Mountain Climbers, Lunges, etc.) to ensure instant offline performance without broken external video or GIF dependencies.
- **Audio Feedback Engine**: Zero-asset Web Audio API oscillator beeps paired with the browser's native `SpeechSynthesis` voice guide ("3, 2, 1, Go!", "Rest time", "Halfway there"), ensuring full offline reliability.
- **AdMob Experience & Premium**: Realistic Google AdMob banner units anchored on non-workout screens, non-intrusive interstitials between completed workouts (with quick dismiss), and rewarded ads for bonus workouts. All ads are strictly prohibited during active workout sessions, and can be permanently removed with the built-in Premium toggle.

---

## 1. Overview & Core Concept

HomeFit gives users a gym-quality personal training companion right in their pocket without requiring gym weights or equipment:
- **Zero Equipment Needed**: Every exercise is bodyweight-calibrated with scalable variations from beginner to advanced.
- **Effortless Habit Building**: Daily workout suggestions, active streak counting, progress visualization, and customizable reminder alerts.
- **Culturally & Globally Accessible**: Built from the ground up with bilingual English & Kurdish support, respecting RTL typographic rhythms and numerals.
- **Offline Resilient**: Local storage persistence for workouts, profile parameters, streak history, and preferences.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[ Launch / Home ] ───► [ Daily Recommendation or Category ]
       │                                │
       ▼                                ▼
[ Workout Plans / Details ] ───► [ Full-Screen Workout Player ]
                                        │
                                        ├── 3s Preparation Countdown
                                        ├── Exercise Loop + Audio / Timer / Reps
                                        ├── 10s Rest Screen (Skip or +20s)
                                        └── Completion Celebration & Local Save
                                                │
                                                ▼
[ Progress Dashboard ] ◄─────── [ Save Stats & Update Streak ]
       │
       ├── Interactive Weekly & Monthly Workout Charts
       ├── Calories & Total Active Minutes
       └── Profile & BMI / Calorie Target Re-calculations
```

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Neutral Canvas: Deep obsidian slate (`#0B0F17`) in dark mode; crisp clean snow (`#F8FAFC`) in light mode.
  - Structural Surfaces: Card containers with subtle hairline borders (`#1E293B` dark / `#E2E8F0` light) and 16–24px corner radii.
  - Energy Accents: High-energy electric emerald (`#10B981` / `#059669`) for active progress, energetic coral (`#F43F5E`) for heart rate/calories, and vibrant amber (`#F59E0B`) for streaks.
- **Typography & Hierarchy**:
  - Latin: Modern sans-serif with geometric precision (`Plus Jakarta Sans` or modern system sans) with `tabular-nums` for timers and counters.
  - Kurdish / Arabic: Clean, readable Naskh/modern Arabic typography with appropriate line heights (`leading-relaxed`) and directional layout (`dir="rtl"`).
- **Mobile Ergonomics**:
  - Adheres strictly to the thumb-zone contract with a fixed bottom tab bar (Home, Plans, Library, Progress, Profile), compact 54px top app bar, and full 48px tap targets.
  - Clean responsive frame: on desktop/tablet, presents a simulated sleek mobile device frame with quick toggle to full-bleed desktop mode.

---

## 3. Key Product Decisions & Trade-Offs

- **Vector SVG Kinematics vs Heavy Video/GIF Files**:
  - *Chosen Approach*: Dynamic SVG bodyweight animation models with CSS keyframe skeletal motions.
  - *Why*: Instant 60fps rendering, zero network lag, negligible payload size (<50KB), dark/light mode stroke adaptability, and 100% offline reliability.
- **Client-Side Audio Synthesis vs External MP3s**:
  - *Chosen Approach*: Web Audio API synthesized tones (synthesized high/low pitch beeps) + `window.speechSynthesis`.
  - *Why*: Guarantees crisp sound cues without network buffering, respects silent mode, and supports both Kurdish/English vocalization where available.
- **AdMob Monetization Flow**:
  - *Chosen Approach*: Simulated authentic Google AdMob banners on the Home and Library screens, a rewarded video ad simulation to unlock "Pro Shred 14-Day Challenge", and an interstitial ad when finishing a workout.
  - *Safety Rule*: AdMob is completely disabled during active exercise screens and countdowns. A 1-click "HomeFit Pro" in-app purchase removes all ads permanently.

---

## 4. Technical Architecture & Data Strategy

### Component & State Architecture

```
┌────────────────────────────────────────────────────────┐
│                   HomeFit App Shell                    │
│   (Language Context, Theme Context, User Profile)      │
└──────────────────────────┬─────────────────────────────┘
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐    ┌──────────────┐
│  Home View   │   │  Plans View  │    │ Library View │
│ - Quick Start│   │ - 8 Plans    │    │ - 20+ Moves  │
│ - Categories │   │ - Day Tracks │    │ - Muscle Map │
│ - Streaks    │   │ - Difficulty │    │ - Detail Box │
└──────┬───────┘   └──────┬───────┘    └──────┬───────┘
       │                  │                   │
       └──────────────────┼───────────────────┘
                          │ (Launch Workout)
                          ▼
             ┌─────────────────────────┐
             │  Workout Player Modal   │
             │ - 3s Ready Countdown    │
             │ - Vector Motion Player  │
             │ - Timer & Audio Cues    │
             │ - 10s Rest Controller   │
             │ - Finish & Confetti     │
             └────────────┬────────────┘
                          │ (Save Record)
                          ▼
             ┌─────────────────────────┐
             │   Local Storage Store   │
             │ - Workout Logs & History│
             │ - Streak & Calories     │
             │ - User Goals & Profile  │
             │ - Custom Settings       │
             └─────────────────────────┘
```

### Core Data Models
1. **Exercise**: `id`, `nameEn`, `nameKu`, `muscleGroup`, `difficulty`, `animationType`, `instructionsEn`, `instructionsKu`, `commonMistakesEn`, `commonMistakesKu`, `safetyTipsEn`, `safetyTipsKu`, `defaultDuration`, `defaultReps`, `caloriesPerMin`.
2. **WorkoutPlan**: `id`, `titleEn`, `titleKu`, `level`, `durationMinutes`, `calories`, `exerciseCount`, `isChallenge`, `isPremium`, `exercises[]`.
3. **WorkoutSession**: `id`, `planId`, `completedAt`, `durationSeconds`, `caloriesBurned`, `exercisesCompleted`.
4. **UserProfile**: `name`, `age`, `gender`, `heightCm`, `weightKg`, `fitnessGoal`, `fitnessLevel`, `dailyCalorieGoal`, `isPremium`.
5. **AppSettings**: `language` (`'en' | 'ku-sorani' | 'ku-kurmanji'`), `theme` (`'dark' | 'light'`), `soundEffects` (boolean), `voiceGuide` (boolean), `restDuration` (seconds), `remindersEnabled` (boolean), `reminderTime` (string).

---

## Verification & Execution Steps

1. Verify dependencies and styling setup (Tailwind CSS, Lucide icons, Motion).
2. Build core state stores (Localization dictionaries with accurate Kurdish & English translations, Exercise Library catalog, and LocalStorage persistence).
3. Implement the dynamic SVG animated exercise figures with muscle focus overlays.
4. Build the Full-Screen Workout Player with audio countdown, rest timer, pause/resume, and finish summary.
5. Build Home, Plans, Library, Progress charts, Profile & BMI calculator, and Settings views.
6. Build AdMob banner/interstitial/rewarded components with Pro upgrade switch.
7. Run `compile_applet` and test offline capabilities, language switching, RTL layout, and responsive controls.
