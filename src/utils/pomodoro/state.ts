import { PomodoroPhase, PomodoroSettings, PomodoroState } from './types';

export function getInitialState(settings: PomodoroSettings): PomodoroState {
  return {
    phase: 'work',
    timeLeft: settings.workDuration * 60,
    isRunning: false,
    currentSession: 1,
    totalSessions: 0,
  };
}

export function getNextPhase(state: PomodoroState, settings: PomodoroSettings): PomodoroPhase {
  if (state.phase === 'work') {
    return state.currentSession % settings.sessionsUntilLongBreak === 0
      ? 'longBreak'
      : 'shortBreak';
  }
  return 'work';
}

export function getPhaseDuration(phase: PomodoroPhase, settings: PomodoroSettings): number {
  switch (phase) {
    case 'work':
      return settings.workDuration;
    case 'shortBreak':
      return settings.shortBreakDuration;
    case 'longBreak':
      return settings.longBreakDuration;
  }
}