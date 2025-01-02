export interface PomodoroSettings {
  workDuration: number;  // in minutes
  shortBreakDuration: number;  // in minutes
  longBreakDuration: number;  // in minutes
  sessionsUntilLongBreak: number;
}

export type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

export interface PomodoroState {
  phase: PomodoroPhase;
  timeLeft: number;  // in seconds
  isRunning: boolean;
  currentSession: number;
  totalSessions: number;
}