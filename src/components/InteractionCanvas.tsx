'use client';

import React, { useRef, useEffect } from 'react';
import { TrackedFingertip } from '@/types/tracking';
import { GestureMetrics, GestureState } from '@/types/gesture';
import { ParticleEngine } from '@/lib/particleEngine';
import { TouchEffectManager } from '@/lib/effects';

interface InteractionCanvasProps {
  fingertipsRef: React.MutableRefObject<TrackedFingertip[]>;
  metricsRef: React.MutableRefObject<GestureMetrics>;
  gestureState: GestureState;
  isReducedMotion?: boolean;
}

export default function InteractionCanvas({
  fingertipsRef,
  metricsRef,
  gestureState,
  isReducedMotion = false,
}: InteractionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleEngineRef = useRef<ParticleEngine>(new ParticleEngine());
  const touchEffectsRef = useRef<TouchEffectManager>(new TouchEffectManager());
  const lastTouchStateRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Subtle atmospheric floating dust
    const ambientCount = isReducedMotion ? 12 : 30;
    const ambientParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];
    for (let i = 0; i < ambientCount; i++) {
      ambientParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 1 + Math.random() * 1.8,
        alpha: 0.12 + Math.random() * 0.2,
      });
    }

    const render = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const tips = fingertipsRef.current || [];
      const metrics = metricsRef.current || {
        pullProgress: 0,
        tension: 0,
        centerX: w / 2,
        centerY: h / 2,
        centerPoint: { x: w / 2, y: h / 2 },
      };

      // 1. Subtle ambient particles
      for (const ap of ambientParticles) {
        ap.x += ap.vx;
        ap.y += ap.vy;
        if (ap.x < 0) ap.x = w;
        if (ap.x > w) ap.x = 0;
        if (ap.y < 0) ap.y = h;
        if (ap.y > h) ap.y = 0;

        ctx.save();
        ctx.fillStyle = '#00F0FF';
        ctx.globalAlpha = ap.alpha * (gestureState === 'IMMERSIVE' ? 0.15 : 0.45);
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, ap.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Check for TOUCH ripple trigger
      if (gestureState === 'TOUCH' && !lastTouchStateRef.current) {
        touchEffectsRef.current.triggerTouchRipple(metrics.centerPoint);
        lastTouchStateRef.current = true;
      } else if (gestureState !== 'TOUCH') {
        lastTouchStateRef.current = false;
      }

      // Render touch ripples
      touchEffectsRef.current.update();
      touchEffectsRef.current.render(ctx);

      const isConnectedOrPulling =
        gestureState === 'TOUCH' ||
        gestureState === 'CONNECTED' ||
        gestureState === 'PULLING' ||
        gestureState === 'MAX_TENSION' ||
        gestureState === 'OPENING';

      // 2. APPROACHING State (shimmer line & magnetic particles)
      if (gestureState === 'APPROACHING' && tips.length >= 2) {
        const p1 = tips[0];
        const p2 = tips[1];
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const normApproach = Math.max(0, 1 - dist / (metrics.connectionThreshold * 2.5));

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + normApproach * 0.25})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const count = 4;
        for (let i = 0; i < count; i++) {
          const t = (i + 1) / (count + 1);
          const px = p1.x + (p2.x - p1.x) * t;
          const py = p1.y + (p2.y - p1.y) * t + Math.sin(time * 0.01 + i) * 6;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${0.3 + normApproach * 0.5})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00F0FF';
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. 5-LAYER ENERGY LINE
      if (isConnectedOrPulling && tips.length >= 2) {
        const p1 = tips[0];
        const p2 = tips[1];
        const pullProgress = metrics.pullProgress;
        const cx = metrics.centerX;
        const cy = metrics.centerY;

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.hypot(dx, dy);

        if (len > 2) {
          const nx = -dy / len;
          const ny = dx / len;

          // Layer 4: Small moving particles traveling along the line & sparks
          particleEngineRef.current.update(pullProgress, p1, p2);
          particleEngineRef.current.render(ctx, p1, p2, pullProgress, time);

          // Layer 5: Procedural distortion calculation
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

          // Center-anchored tension accumulation
          if (pullProgress > 0.4) {
            const centerGlowRadius = (pullProgress - 0.4) * 55;
            ctx.save();
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerGlowRadius * 1.5);
            grad.addColorStop(0, `rgba(255, 255, 255, ${pullProgress * 0.85})`);
            grad.addColorStop(0.3, `rgba(0, 240, 255, ${pullProgress * 0.6})`);
            grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, centerGlowRadius * 1.5, 0, Math.PI * 2);
            ctx.fill();

            if (pullProgress > 0.8) {
              const ringR = ((time * 0.04) % 30) * (pullProgress * 1.4);
              ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
              ctx.stroke();
            }
            ctx.restore();
          }
        }
      }

      // 4. Custom Fingertip Markers & Velocity Light Trails
      tips.forEach((tip) => {
        const opacity = tip.opacity;
        if (opacity <= 0.01) return;

        const speed = Math.hypot(tip.vx, tip.vy);
        if (tip.history && tip.history.length > 1 && speed > 2) {
          ctx.save();
          ctx.beginPath();
          ctx.lineCap = 'round';
          const maxTrail = Math.min(tip.history.length, Math.floor(4 + speed * 0.5));
          for (let i = 0; i < maxTrail - 1; i++) {
            const curr = tip.history[i];
            const next = tip.history[i + 1];
            const trailAlpha = (1 - i / maxTrail) * 0.35 * opacity;
            ctx.strokeStyle = `rgba(0, 240, 255, ${trailAlpha})`;
            ctx.lineWidth = Math.max(1, (1 - i / maxTrail) * 3);
            ctx.beginPath();
            ctx.moveTo(curr.x, curr.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }
          ctx.restore();
        }

        ctx.save();
        ctx.globalAlpha = opacity;

        const haloPulse = 1 + Math.sin(time * 0.006 + tip.handIndex) * 0.15;
        const isApproaching = gestureState === 'APPROACHING';
        const haloRadius = (15 + (isApproaching ? 4 : 0)) * haloPulse;

        ctx.strokeStyle = isApproaching ? 'rgba(0, 240, 255, 0.7)' : 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F0FF';
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, haloRadius, 0, Math.PI * 2);
        ctx.stroke();

        const grad = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 12);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.4, 'rgba(0, 240, 255, 0.7)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [fingertipsRef, metricsRef, gestureState, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none z-30"
    />
  );
}
