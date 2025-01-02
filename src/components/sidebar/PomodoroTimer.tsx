import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Settings } from 'lucide-react';
import { FloatingCard } from './FloatingCard';
import { CircularProgress } from './CircularProgress';
import { PomodoroSettings } from '../../utils/pomodoro/types';
import { loadSettings } from '../../utils/pomodoro/settings';
import { getInitialState, getNextPhase, getPhaseDuration } from '../../utils/pomodoro/state';
import { notificationManager } from '../../utils/pomodoro/notification';
import { usePomodoroVisibility } from '../../utils/pomodoro/visibility';
import { Tomato } from '../icons/Tomato';

interface PomodoroTimerProps {
  onOpenSettings: (settings: PomodoroSettings, onSave: (settings: PomodoroSettings) => void) => void;
}

export function PomodoroTimer({ onOpenSettings }: PomodoroTimerProps) {
  const [settings, setSettings] = useState<PomodoroSettings>(() => loadSettings());
  const [state, setState] = useState(() => getInitialState(settings));
  const timerRef = useRef<NodeJS.Timeout>();
  const { setVisible } = usePomodoroVisibility();

  // Calculate progress (0 to 1)
  const progress = 1 - (state.timeLeft / (getPhaseDuration(state.phase, settings) * 60));
  const phaseCompleted = state.timeLeft <= 0;

  useEffect(() => {
    if (state.isRunning && !phaseCompleted) {
      timerRef.current = setInterval(() => {
        setState(currentState => {
          if (currentState.timeLeft <= 1) {
            notificationManager.startRepeatingNotification(currentState.phase);
            setVisible(true);
            
            return {
              ...currentState,
              timeLeft: 0,
              isRunning: false
            };
          }
          return { ...currentState, timeLeft: currentState.timeLeft - 1 };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isRunning, phaseCompleted, setVisible]);

  const toggleTimer = () => {
    if (phaseCompleted) {
      const nextPhase = getNextPhase(state, settings);
      const nextSession = nextPhase === 'work' ? state.currentSession + 1 : state.currentSession;
      
      setState({
        ...state,
        phase: nextPhase,
        timeLeft: getPhaseDuration(nextPhase, settings) * 60,
        currentSession: nextSession,
        isRunning: true
      });

      notificationManager.stopNotification();
    } else {
      setState(current => ({ ...current, isRunning: !current.isRunning }));
    }
  };

  const handleSettingsSave = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    setState(current => ({
      ...current,
      timeLeft: getPhaseDuration(current.phase, newSettings) * 60,
    }));
  };

  return (
    <FloatingCard>
      <div className="relative space-y-5 p-1">
        {/* Header com botões de minimizar e configurações */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setVisible(false)}
            className="p-2 bg-indigo-50 rounded-lg text-indigo-500 hover:bg-indigo-100 transition-colors"
          >
            <Tomato className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenSettings(settings, handleSettingsSave)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center">
          <CircularProgress
            progress={progress}
            totalSessions={settings.sessionsUntilLongBreak}
            currentSession={state.currentSession}
            phase={state.phase}
          >
            <div className="text-4xl font-bold text-gray-900 font-mono tracking-tight">
              {formatTime(state.timeLeft)}
            </div>
          </CircularProgress>

          <button
            onClick={toggleTimer}
            className="w-full mt-4 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
          >
            {state.isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" /> Pause
              </>
            ) : phaseCompleted ? (
              <>
                <Play className="h-4 w-4 mr-2" /> Start Next
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" /> Iniciar Pomodoros
              </>
            )}
          </button>
        </div>
      </div>
    </FloatingCard>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}