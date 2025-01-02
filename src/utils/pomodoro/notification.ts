import { PomodoroPhase } from './types';
import { ToneGenerator } from '../audio/toneGenerator';
import { BreakEndToneGenerator } from '../audio/breakEndToneGenerator';

class NotificationManager {
  private focusEndToneGenerator: ToneGenerator;
  private breakEndToneGenerator: BreakEndToneGenerator;

  constructor() {
    this.focusEndToneGenerator = new ToneGenerator();
    this.breakEndToneGenerator = new BreakEndToneGenerator();
  }

  startRepeatingNotification(phase: PomodoroPhase) {
    // Use different sounds for focus end vs break end
    if (phase === 'work') {
      this.focusEndToneGenerator.start();
    } else {
      this.breakEndToneGenerator.start();
    }
  }

  stopNotification() {
    this.focusEndToneGenerator.stop();
    this.breakEndToneGenerator.stop();
  }
}

export const notificationManager = new NotificationManager();