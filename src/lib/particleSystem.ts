import { Point2D } from '@/types/hand';

export interface EnergyParticle {
  t: number; // progress along line (0 to 1)
  speed: number;
  direction: number; // 1 or -1
  offset: number; // perpendicular displacement
  offsetFrequency: number;
  size: number;
  alpha: number;
  color: string;
}

export interface BurstSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export class EnergyParticleSystem {
  private particles: EnergyParticle[] = [];
  private sparks: BurstSpark[] = [];
  private maxParticles = 60;
  private maxSparks = 80;

  constructor() {
    this.initParticles();
  }

  private initParticles() {
    const colors = [
      'rgba(0, 240, 255, 0.9)',
      'rgba(255, 255, 255, 0.95)',
      'rgba(167, 139, 250, 0.85)',
      'rgba(0, 114, 245, 0.85)',
    ];

    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.007,
        direction: Math.random() > 0.5 ? 1 : -1,
        offset: (Math.random() - 0.5) * 14,
        offsetFrequency: 2 + Math.random() * 5,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  public emitSparks(x: number, y: number, count: number = 3, intensity: number = 1.0) {
    const colors = ['#00F0FF', '#FFFFFF', '#A78BFA', '#38BDF8'];
    for (let i = 0; i < count; i++) {
      if (this.sparks.length >= this.maxSparks) {
        this.sparks.shift(); // remove oldest
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = (2 + Math.random() * 5) * intensity;
      const maxLife = 15 + Math.floor(Math.random() * 25);
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: maxLife,
        maxLife,
        size: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  public update(pullProgress: number, p1: Point2D, p2: Point2D) {
    const speedMultiplier = 1.0 + pullProgress * 3.5;

    // Update line traveling particles
    for (const p of this.particles) {
      p.t += p.speed * speedMultiplier * p.direction;
      if (p.t > 1) p.t = 0;
      if (p.t < 0) p.t = 1;
    }

    // Occasionally burst sparks along the line proportional to pull progress
    if (Math.random() < 0.2 + pullProgress * 0.6) {
      const sparkT = Math.random();
      const sx = p1.x + (p2.x - p1.x) * sparkT;
      const sy = p1.y + (p2.y - p1.y) * sparkT;
      this.emitSparks(sx, sy, 1 + Math.floor(pullProgress * 3), 0.8 + pullProgress * 1.5);
    }

    // Update sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.92;
      s.vy *= 0.92;
      s.life--;
      if (s.life <= 0) {
        this.sparks.splice(i, 1);
      }
    }
  }

  public render(
    ctx: CanvasRenderingContext2D,
    p1: Point2D,
    p2: Point2D,
    pullProgress: number,
    time: number
  ) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);
    if (len < 1) return;

    // Unit normal vector (perpendicular)
    const nx = -dy / len;
    const ny = dx / len;

    // Render line traveling particles
    for (const p of this.particles) {
      // Base position on line
      const bx = p1.x + dx * p.t;
      const by = p1.y + dy * p.t;

      // Tension vibration offset
      const tensionAmp = (4 + pullProgress * 18) * Math.sin(p.t * Math.PI);
      const wave = Math.sin(time * 0.01 * p.offsetFrequency + p.t * 12) * tensionAmp;
      const totalOffset = p.offset + wave;

      const px = bx + nx * totalOffset;
      const py = by + ny * totalOffset;

      ctx.save();
      ctx.globalAlpha = p.alpha * (0.6 + pullProgress * 0.4);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8 + pullProgress * 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(px, py, p.size * (1 + pullProgress * 0.5), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Render sparks
    for (const s of this.sparks) {
      const progress = s.life / s.maxLife;
      ctx.save();
      ctx.globalAlpha = progress;
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * progress, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  public clear() {
    this.sparks = [];
  }
}
