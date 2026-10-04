import { Point2D } from '@/types/tracking';

export interface TouchRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export class TouchEffectManager {
  private ripples: TouchRipple[] = [];

  public triggerTouchRipple(point: Point2D, maxRadius: number = 70) {
    this.ripples.push({
      x: point.x,
      y: point.y,
      radius: 0,
      maxRadius,
      alpha: 1.0,
      life: 25,
      maxLife: 25,
    });
  }

  public update() {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.life--;
      const progress = 1 - r.life / r.maxLife;
      r.radius = r.maxRadius * Math.sin((progress * Math.PI) / 2);
      r.alpha = 1 - progress;
      if (r.life <= 0) {
        this.ripples.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    for (const r of this.ripples) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha * 0.9})`;
      ctx.lineWidth = Math.max(1, (1 - r.radius / r.maxRadius) * 3.5);
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00F0FF';
      ctx.stroke();

      // Inner bright flash dot
      if (r.alpha > 0.5) {
        ctx.beginPath();
        ctx.arc(r.x, r.y, 4 * r.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${r.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#FFFFFF';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  public clear() {
    this.ripples = [];
  }
}
