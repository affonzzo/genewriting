export interface BombWritingSettings {
  totalTime: number;
  maxPauseTime: number;
  duration: number;
}

export interface BombWritingState {
  previousText: string;
  currentText: string;
  isActive: boolean;
  settings: BombWritingSettings | null;
  sessionStartTime: number | null;
  timer: number;
}