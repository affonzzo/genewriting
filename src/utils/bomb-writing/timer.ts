export class BombWritingTimer {
  private timer: number | null = null;
  private pauseTimer: number | null = null;
  
  constructor(
    private onTick: (timeLeft: number) => void,
    private onPauseTick: (pauseTimeLeft: number) => void,
    private onExplosion: () => void,
    private onComplete: () => void
  ) {}

  startSession(totalTime: number) {
    this.stopTimers();
    
    const endTime = Date.now() + totalTime * 1000;
    
    this.timer = window.setInterval(() => {
      const timeLeft = Math.max(0, endTime - Date.now());
      this.onTick(Math.ceil(timeLeft / 1000));
      
      if (timeLeft <= 0) {
        this.onComplete();
        this.stopTimers();
      }
    }, 100);
  }

  startPauseCountdown(maxPauseTime: number) {
    if (this.pauseTimer) {
      clearInterval(this.pauseTimer);
    }
    
    const endTime = Date.now() + maxPauseTime * 1000;
    
    this.pauseTimer = window.setInterval(() => {
      const timeLeft = Math.max(0, endTime - Date.now());
      this.onPauseTick(Math.ceil(timeLeft / 1000));
      
      if (timeLeft <= 0) {
        this.onExplosion();
        this.stopTimers();
      }
    }, 100);
  }

  resetPauseCountdown() {
    if (this.pauseTimer) {
      clearInterval(this.pauseTimer);
      this.pauseTimer = null;
    }
  }

  stopTimers() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.resetPauseCountdown();
  }
}