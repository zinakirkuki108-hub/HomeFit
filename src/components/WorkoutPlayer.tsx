import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, SkipForward, SkipBack, X, Volume2, VolumeX, CheckCircle2, Flame, Clock, Award } from 'lucide-react';
import { Exercise, Language, WorkoutPlan, WorkoutSession } from '../types';
import { getTranslation } from '../localization/translations';
import { ExerciseAnimation } from './ExerciseAnimation';
import { sound } from '../utils/audio';

interface WorkoutPlayerProps {
  plan: WorkoutPlan;
  exercises: Exercise[];
  lang: Language;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  restDurationSec: number;
  onFinish: (session: WorkoutSession) => void;
  onClose: () => void;
}

type PlayerPhase = 'prep' | 'active' | 'rest' | 'completed';

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  plan,
  exercises,
  lang,
  soundEnabled,
  voiceEnabled,
  restDurationSec,
  onFinish,
  onClose
}) => {
  const [phase, setPhase] = useState<PlayerPhase>('prep');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prepTime, setPrepTime] = useState(3);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [restTime, setRestTime] = useState(restDurationSec);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(!soundEnabled);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const currentExercise = exercises[currentIndex] || exercises[0];
  const nextExercise = exercises[currentIndex + 1];

  const totalExercises = exercises.length;
  const isRepsExercise = !!currentExercise.isRepsBased;
  const targetDuration = currentExercise.defaultDurationSec || 30;

  // Initialize exercise time when exercise changes
  useEffect(() => {
    setExerciseTime(targetDuration);
  }, [currentIndex, targetDuration]);

  // Audio helper functions
  const playSound = useCallback((type: 'tick' | 'go' | 'rest' | 'finish') => {
    if (isMuted) return;
    if (type === 'tick') sound.playCountdownTick();
    if (type === 'go') sound.playStartWhistle();
    if (type === 'rest') sound.playRestChime();
    if (type === 'finish') sound.playFanfare();
  }, [isMuted]);

  const speak = useCallback((text: string) => {
    if (isMuted || !voiceEnabled) return;
    sound.speak(text, lang);
  }, [isMuted, voiceEnabled, lang]);

  // Launch confetti on finish
  useEffect(() => {
    if (phase === 'completed') {
      playSound('finish');
      speak(lang === 'ku-sorani' ? 'دەستخۆش! ڕاهێنانەکە تەواو بوو' : 'Workout completed! Great job!');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [phase, playSound, speak, lang]);

  // Main timer engine
  useEffect(() => {
    if (isPaused || phase === 'completed') return;

    const timer = setInterval(() => {
      setTotalElapsedTime(prev => prev + 1);

      // Accumulate estimated calories
      setTotalCaloriesBurned(prev => {
        const ratePerSec = (currentExercise.caloriesBurnedPerMin || 8) / 60;
        return Number((prev + ratePerSec).toFixed(1));
      });

      // 1. Preparation Phase (3-second countdown)
      if (phase === 'prep') {
        setPrepTime(prev => {
          if (prev > 1) {
            playSound('tick');
            speak(String(prev - 1));
            return prev - 1;
          } else {
            playSound('go');
            speak('Go!');
            setPhase('active');
            return 3;
          }
        });
      }

      // 2. Active Exercise Phase
      else if (phase === 'active') {
        setExerciseTime(prev => {
          if (prev <= 4 && prev > 1) {
            playSound('tick');
            speak(String(prev - 1));
          }
          if (prev <= 1) {
            // Exercise ended
            if (currentIndex < totalExercises - 1) {
              playSound('rest');
              speak(lang === 'ku-sorani' ? 'پشوودان' : 'Rest time');
              setPhase('rest');
              setRestTime(restDurationSec);
            } else {
              setPhase('completed');
            }
            return 0;
          }
          return prev - 1;
        });
      }

      // 3. Rest Phase (10s or user setting)
      else if (phase === 'rest') {
        setRestTime(prev => {
          if (prev <= 4 && prev > 1) {
            playSound('tick');
            speak(String(prev - 1));
          }
          if (prev <= 1) {
            setCurrentIndex(i => i + 1);
            setPhase('prep');
            setPrepTime(3);
            return restDurationSec;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    phase,
    isPaused,
    currentIndex,
    totalExercises,
    restDurationSec,
    currentExercise,
    playSound,
    speak,
    lang
  ]);

  // Exercise Navigation Handlers
  const handleNext = () => {
    if (currentIndex < totalExercises - 1) {
      setCurrentIndex(i => i + 1);
      setPhase('prep');
      setPrepTime(3);
    } else {
      setPhase('completed');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setPhase('prep');
      setPrepTime(3);
    }
  };

  const handleSkipRest = () => {
    setCurrentIndex(i => i + 1);
    setPhase('prep');
    setPrepTime(3);
  };

  const handleAddRest = () => {
    setRestTime(t => t + 20);
  };

  const handleSaveWorkout = () => {
    const session: WorkoutSession = {
      id: 'session-' + Date.now(),
      planId: plan.id,
      planTitle: lang === 'ku-sorani' ? plan.titleKu : lang === 'ku-kurmanji' ? plan.titleKm : plan.titleEn,
      completedAt: new Date().toISOString(),
      durationSeconds: Math.max(totalElapsedTime, 60),
      caloriesBurned: Math.max(Math.round(totalCaloriesBurned), plan.calories),
      exercisesCompleted: totalExercises
    };
    onFinish(session);
    setIsSaved(true);
  };

  const currentExerciseName =
    lang === 'ku-sorani'
      ? currentExercise.nameKu
      : lang === 'ku-kurmanji'
      ? currentExercise.nameKm
      : currentExercise.nameEn;

  const currentInstructions =
    lang === 'ku-sorani'
      ? currentExercise.instructionsKu
      : lang === 'ku-kurmanji'
      ? currentExercise.instructionsKm
      : currentExercise.instructionsEn;

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none overflow-hidden">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <button
          onClick={onClose}
          className="p-2 -m-2 text-slate-400 hover:text-white transition-colors rounded-full"
          aria-label="Close workout"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <p className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400">
            {lang === 'ku-sorani' ? plan.titleKu : plan.titleEn}
          </p>
          <p className="text-sm font-medium text-slate-300">
            {getTranslation(lang, 'exerciseOf')
              .replace('{current}', String(currentIndex + 1))
              .replace('{total}', String(totalExercises))}
          </p>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 -m-2 text-slate-400 hover:text-white transition-colors rounded-full"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
        </button>
      </div>

      {/* Progress Bar (Overall session progress) */}
      <div className="w-full h-1.5 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
          style={{
            width: `${((currentIndex + (phase === 'completed' ? 1 : (targetDuration - exerciseTime) / targetDuration)) / totalExercises) * 100}%`
          }}
        />
      </div>

      {/* Main Screen Content by Phase */}
      <div className="flex-1 flex flex-col justify-between p-5 overflow-y-auto max-w-lg mx-auto w-full">
        {/* 1. PREP COUNTDOWN OVERLAY */}
        {phase === 'prep' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-pulse-subtle">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {getTranslation(lang, 'readyIn')}
            </span>

            <div className="w-36 h-36 rounded-full flex items-center justify-center bg-emerald-500/10 border-4 border-emerald-500 text-6xl font-black font-mono tracking-tighter text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              {prepTime}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-white">{currentExerciseName}</h2>
              <p className="text-sm text-slate-400">
                {isRepsExercise ? `${currentExercise.defaultReps} ${getTranslation(lang, 'repBased')}` : `${targetDuration} ${getTranslation(lang, 'sec')}`}
              </p>
            </div>
          </div>
        )}

        {/* 2. ACTIVE EXERCISE VIEW */}
        {phase === 'active' && (
          <div className="flex-1 flex flex-col justify-between py-2 space-y-4">
            {/* Exercise Title & Reps */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">{currentExerciseName}</h2>
              {isRepsExercise && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold">
                  <span>{currentExercise.defaultReps} {getTranslation(lang, 'repBased')}</span>
                  <span>·</span>
                  <span>{exerciseTime}s remaining</span>
                </div>
              )}
            </div>

            {/* Kinetic Animation */}
            <div className="my-auto">
              <ExerciseAnimation
                type={currentExercise.animationType}
                muscleGroup={currentExercise.muscleGroup}
                isPaused={isPaused}
              />
            </div>

            {/* Main Countdown Timer Dial */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-emerald-500/40 bg-slate-900/80 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                <span className="text-4xl font-black font-mono tabular-nums text-emerald-400">
                  {exerciseTime}
                </span>
                <span className="absolute bottom-4 text-[10px] uppercase font-bold text-slate-400">
                  {getTranslation(lang, 'sec')}
                </span>
              </div>
            </div>

            {/* Instruction Tip */}
            <p className="text-xs text-center text-slate-400 line-clamp-2 px-4 italic">
              "{currentInstructions[0] || ''}"
            </p>
          </div>
        )}

        {/* 3. REST TIMER VIEW */}
        {phase === 'rest' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'rest')}</span>
            </div>

            {/* Rest Countdown Dial */}
            <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center bg-slate-900 border-4 border-amber-500 text-5xl font-black font-mono text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
              {restTime}
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                {getTranslation(lang, 'sec')}
              </span>
            </div>

            {/* Next Exercise Preview */}
            {nextExercise && (
              <div className="w-full max-w-sm p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {getTranslation(lang, 'next')}:
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {lang === 'ku-sorani' ? nextExercise.nameKu : nextExercise.nameEn}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {nextExercise.isRepsBased
                        ? `${nextExercise.defaultReps} ${getTranslation(lang, 'repBased')}`
                        : `${nextExercise.defaultDurationSec} ${getTranslation(lang, 'sec')}`}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 capitalize">
                    {nextExercise.muscleGroup}
                  </span>
                </div>
              </div>
            )}

            {/* Rest Actions */}
            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                onClick={handleAddRest}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                {getTranslation(lang, 'addRest')}
              </button>
              <button
                onClick={handleSkipRest}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-md"
              >
                {getTranslation(lang, 'skipRest')}
              </button>
            </div>
          </div>
        )}

        {/* 4. WORKOUT COMPLETED CELEBRATION */}
        {phase === 'completed' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">{getTranslation(lang, 'congratulations')}</h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {getTranslation(lang, 'congratsSubtitle')}
              </p>
            </div>

            {/* Workout Summary Metric Grid */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <Clock className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
                <p className="text-base font-extrabold font-mono text-white">
                  {formatTime(totalElapsedTime)}
                </p>
                <p className="text-[10px] text-slate-400">{getTranslation(lang, 'workoutDuration')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <Flame className="w-4 h-4 mx-auto text-rose-400 mb-1" />
                <p className="text-base font-extrabold font-mono text-white">
                  {Math.max(Math.round(totalCaloriesBurned), plan.calories)}
                </p>
                <p className="text-[10px] text-slate-400">{getTranslation(lang, 'kcal')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <CheckCircle2 className="w-4 h-4 mx-auto text-teal-400 mb-1" />
                <p className="text-base font-extrabold font-mono text-white">{totalExercises}</p>
                <p className="text-[10px] text-slate-400">{getTranslation(lang, 'exercises')}</p>
              </div>
            </div>

            {/* Save & Finish Button */}
            <div className="w-full max-w-sm space-y-3 pt-2">
              {!isSaved ? (
                <button
                  onClick={handleSaveWorkout}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{getTranslation(lang, 'saveWorkout')}</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{getTranslation(lang, 'workoutSaved')}</span>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all"
              >
                {getTranslation(lang, 'done')}
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM CONTROLLER BAR (When active or paused) */}
        {phase !== 'completed' && (
          <div className="flex items-center justify-center gap-4 py-3 border-t border-slate-800/80">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              aria-label="Previous exercise"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 active:scale-95 transition-all"
              aria-label={isPaused ? 'Resume workout' : 'Pause workout'}
            >
              {isPaused ? <Play className="w-6 h-6 fill-current ml-0.5" /> : <Pause className="w-6 h-6 fill-current" />}
            </button>

            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all"
              aria-label="Skip to next exercise"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
