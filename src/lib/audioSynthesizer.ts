class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private tensionOsc: OscillatorNode | null = null;
  private tensionGain: GainNode | null = null;
  private isInitialized: boolean = false;

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch {
      // Audio not supported or blocked
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.4, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playConnect() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();

      // Crystalline dual chime
      const t = this.ctx.currentTime;
      [587.33, 880.0, 1174.66].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.04);

        gain.gain.setValueAtTime(0.001, t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.18 / (idx + 1), t + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.04 + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t + idx * 0.04);
        osc.stop(t + idx * 0.04 + 0.65);
      });
    } catch {
      // Ignore audio error
    }
  }

  public updateTension(pullProgress: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();

      if (pullProgress <= 0.05) {
        this.stopTension();
        return;
      }

      if (!this.tensionOsc) {
        this.tensionOsc = this.ctx.createOscillator();
        this.tensionGain = this.ctx.createGain();

        this.tensionOsc.type = 'sawtooth';
        // Lowpass filter for warm electrical hum
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, this.ctx.currentTime);

        this.tensionGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.tensionOsc.connect(filter);
        filter.connect(this.tensionGain);
        this.tensionGain.connect(this.masterGain);

        this.tensionOsc.start();
      }

      const t = this.ctx.currentTime;
      // Frequency ramps up smoothly from 110Hz (A2) to 440Hz (A4)
      const targetFreq = 110 + pullProgress * 330;
      this.tensionOsc.frequency.setTargetAtTime(targetFreq, t, 0.05);

      // Volume increases as user pulls apart
      const targetGain = 0.02 + pullProgress * 0.08;
      this.tensionGain?.gain.setTargetAtTime(targetGain, t, 0.05);
    } catch {
      // Ignore
    }
  }

  public stopTension() {
    if (this.tensionGain && this.ctx) {
      this.tensionGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.1);
      setTimeout(() => {
        try {
          this.tensionOsc?.stop();
          this.tensionOsc?.disconnect();
          this.tensionOsc = null;
          this.tensionGain = null;
        } catch {
          // Ignore
        }
      }, 150);
    }
  }

  public playPortalTransition() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      this.stopTension();
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const t = this.ctx.currentTime;

      // Sub-bass impact
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, t);
      subOsc.frequency.exponentialRampToValueAtTime(35, t + 1.2);

      subGain.gain.setValueAtTime(0.35, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(t);
      subOsc.stop(t + 1.6);

      // Ethereal high chord bloom
      [440, 554.37, 659.25, 880, 1108.73].forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, t + 0.1);

        g.gain.setValueAtTime(0.001, t + 0.1);
        g.gain.linearRampToValueAtTime(0.12 / (idx + 1), t + 0.4);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);

        o.connect(g);
        g.connect(this.masterGain);
        o.start(t + 0.1);
        o.stop(t + 2.3);
      });
    } catch {
      // Ignore
    }
  }

  public playInteract() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, t); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.12); // C6

      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.22);
    } catch {
      // Ignore
    }
  }
}

export const audioEngine = new SoundEngine();
