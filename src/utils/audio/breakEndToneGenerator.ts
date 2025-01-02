export class BreakEndToneGenerator {
  private audioContext: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
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

    // Stop any existing tones
    this.stop();

    // Create two oscillators for a more urgent sound
    const frequencies = [880, 1100]; // Higher frequencies for urgency
    
    frequencies.forEach(freq => {
      const osc = this.audioContext!.createOscillator();
      osc.type = 'square'; // More harsh waveform
      osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
      osc.connect(this.gainNode!);
      this.oscillators.push(osc);
      osc.start();
    });

    // Create rapid pulsing effect
    const pulseInterval = 0.3; // Faster interval
    const now = this.audioContext.currentTime;
    
    // Create repeating pulse pattern
    for (let i = 0; i < 100; i++) {
      const startTime = now + (i * pulseInterval);
      const peakTime = startTime + 0.05;
      const endTime = startTime + (pulseInterval * 0.5);
      
      this.gainNode.gain.linearRampToValueAtTime(0, startTime);
      this.gainNode.gain.linearRampToValueAtTime(0.3, peakTime); // Louder volume
      this.gainNode.gain.linearRampToValueAtTime(0, endTime);
    }
  }

  stop() {
    this.oscillators.forEach(osc => {
      osc.stop();
      osc.disconnect();
    });
    this.oscillators = [];
    
    if (this.gainNode) {
      this.gainNode.gain.cancelScheduledValues(0);
      this.gainNode.gain.setValueAtTime(0, 0);
    }
  }
}