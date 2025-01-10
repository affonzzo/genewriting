export interface BombWritingSettings {
  totalTime: number;  // in minutes
  maxPauseTime: number;  // in seconds
}

export interface BombWritingStats {
  wordsCount: number;
  averageWPM: number;
  activeWritingTime: number;  // in seconds
}

export interface BombWritingState {
  isSessionActive: boolean;
  timeLeft: number;  // in seconds
  pauseTimeLeft: number;  // in seconds
  currentContent: string;
  startTime?: number;
  lastTypeTime?: number;
}