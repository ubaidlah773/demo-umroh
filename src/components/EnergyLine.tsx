import { Point2D } from '@/types/tracking';

export interface EnergyLineRenderOptions {
  ctx: CanvasRenderingContext2D;
  p1: Point2D;
  p2: Point2D;
  pullProgress: number;
  time: number;
  isReducedMotion?: boolean;
}

export function renderEnergyLine({
  ctx,
  p1,
  p2,
  pullProgress,
  time,
  isReducedMotion = false,
}: EnergyLineRenderOptions) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy);
  if (len < 2) return;

  const nx = -dy / len;
  const ny = dx / len;

  const segments = isReducedMotion ? 20 : 42;
  const tensionFreq = 12 + pullProgress * 26;
  const tensionAmp = (2 + pullProgress * 15) * (1 + Math.sin(time * 0.015) * 0.25);

  // Layer 3: Secondary atmospheric glow
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = pullProgress > 0.65 ? 'rgba(167, 139, 250, 0.25)' : 'rgba(0, 240, 255, 0.2)';
  ctx.lineWidth = 14 + pullProgress * 18;
  ctx.shadowBlur = 25 + pullProgress * 30;
  ctx.shadowColor = pullProgress > 0.65 ? '#A78BFA' : '#00F0FF';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const bx = p1.x + dx * t;
    const by = p1.y + dy * t;
    const env = Math.sin(t * Math.PI);
    const wave = Math.sin(t * tensionFreq + time * 0.015) * tensionAmp * env;
    const x = bx + nx * wave;
    const y = by + ny * wave;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Layer 2: Soft blurred glow
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = pullProgress > 0.65 ? 'rgba(167, 139, 250, 0.5)' : 'rgba(0, 240, 255, 0.45)';
  ctx.lineWidth = 5 + pullProgress * 8;
  ctx.shadowBlur = 12 + pullProgress * 18;
  ctx.shadowColor = pullProgress > 0.65 ? '#A78BFA' : '#00F0FF';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const bx = p1.x + dx * t;
    const by = p1.y + dy * t;
    const env = Math.sin(t * Math.PI);
    const wave = Math.sin(t * tensionFreq + time * 0.015) * tensionAmp * env;
    const x = bx + nx * wave;
    const y = by + ny * wave;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Layer 1: Thin bright core
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5 + pullProgress * 2.5;
  ctx.shadowBlur = 8 + pullProgress * 12;
  ctx.shadowColor = '#00F0FF';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const bx = p1.x + dx * t;
    const by = p1.y + dy * t;
    const env = Math.sin(t * Math.PI);
    const jitter = (Math.random() - 0.5) * (pullProgress * 3.5);
    const wave = (Math.sin(t * tensionFreq + time * 0.02) * tensionAmp + jitter) * env;
    const x = bx + nx * wave;
    const y = by + ny * wave;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

export default function EnergyLine() {
  return null;
}
