export class ToneGenerator {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  private setupAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  start() {
    this.setupAudioContext();
    if (!this.audioContext || !this.gainNode) return;

    // Stop any existing tone
    this.stop();

    // Create and configure oscillator
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(750, this.audioContext.currentTime);

    // Configure gain for pulsing effect
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    
    // Connect oscillator
    this.oscillator.connect(this.gainNode);
    this.oscillator.start();

    // Create pulsing effect
    const pulseInterval = 0.6; // seconds
    const now = this.audioContext.currentTime;
    
    // Create repeating pulse pattern
    for (let i = 0; i < 100; i++) {
      const startTime = now + (i * pulseInterval);
      const peakTime = startTime + 0.1;
      const endTime = startTime + (pulseInterval * 0.5);
      
      this.gainNode.gain.linearRampToValueAtTime(0, startTime);
      this.gainNode.gain.linearRampToValueAtTime(0.2, peakTime);
      this.gainNode.gain.linearRampToValueAtTime(0, endTime);
    }
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    
    if (this.gainNode) {
      this.gainNode.gain.cancelScheduledValues(0);
      this.gainNode.gain.setValueAtTime(0, 0);
    }
  }
}