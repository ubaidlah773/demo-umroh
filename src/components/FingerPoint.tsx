import { Point2D } from '@/types/tracking';

export interface FingerPointRenderOptions {
  ctx: CanvasRenderingContext2D;
  point: Point2D;
  opacity: number;
  time: number;
  isApproaching?: boolean;
}

export function renderFingerPoint({
  ctx,
  point,
  opacity,
  time,
  isApproaching = false,
}: FingerPointRenderOptions) {
  if (opacity <= 0.01) return;

  ctx.save();
  ctx.globalAlpha = opacity;

  // Outer Halo
  const haloPulse = 1 + Math.sin(time * 0.006) * 0.15;
  const haloRadius = (15 + (isApproaching ? 4 : 0)) * haloPulse;

  ctx.strokeStyle = isApproaching ? 'rgba(0, 240, 255, 0.7)' : 'rgba(0, 240, 255, 0.4)';
  ctx.lineWidth = 1.2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#00F0FF';
  ctx.beginPath();
  ctx.arc(point.x, point.y, haloRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Soft Glow Disc
  const grad = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 12);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  grad.addColorStop(0.4, 'rgba(0, 240, 255, 0.7)');
  grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 12, 0, Math.PI * 2);
  ctx.fill();

  // Center bright dot
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function FingerPoint() {
  return null;
}
