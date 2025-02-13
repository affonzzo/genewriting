import { PomodoroSettings } from './types';

// Default settings
export const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 33,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  alarmSound: true,
  alarmVolume: 50,
  tickingSound: false,
  tickingVolume: 50,
};

// Local storage key
const SETTINGS_KEY = 'pomodoroSettings';

// Load settings from localStorage
export function loadSettings(): PomodoroSettings {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) return DEFAULT_SETTINGS;
  
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// Save settings to localStorage
export function saveSettings(settings: PomodoroSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}