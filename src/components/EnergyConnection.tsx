'use client';

import React, { useRef, useEffect } from 'react';
import { TrackedFingertip, Point2D } from '@/types/tracking';
import { GestureMetrics, GestureState } from '@/types/gesture';
import { EnergyParticleSystem } from '@/lib/particleSystem';
import { TouchEffectManager } from '@/lib/effects';

interface EnergyConnectionProps {
  fingertipsRef: React.MutableRefObject<TrackedFingertip[]>;
  metricsRef: React.MutableRefObject<GestureMetrics>;
  gestureState: GestureState;
  isReducedMotion?: boolean;
}

export default function EnergyConnection({
  fingertipsRef,
  metricsRef,
  gestureState,
  isReducedMotion = false,
}: EnergyConnectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleSystemRef = useRef<EnergyParticleSystem>(new EnergyParticleSystem());
  const touchEffectsRef = useRef<TouchEffectManager>(new TouchEffectManager());
  const lastTouchStateRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Subtle ambient background particles
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
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 1 + Math.random() * 1.8,
        alpha: 0.12 + Math.random() * 0.2,
      });
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const tips = fingertipsRef.current || [];
      const metrics = metricsRef.current || {
        pullProgress: 0,
        tension: 0,
        centerPoint: { x: width / 2, y: height / 2 },
      };

      // 1. Render subtle ambient particles
      for (const ap of ambientParticles) {
        ap.x += ap.vx;
        ap.y += ap.vy;
        if (ap.x < 0) ap.x = width;
        if (ap.x > width) ap.x = 0;
        if (ap.y < 0) ap.y = height;
        if (ap.y > height) ap.y = 0;

        ctx.save();
        ctx.fillStyle = '#00F0FF';
        ctx.globalAlpha = ap.alpha * (gestureState === 'IMMERSIVE' ? 0.15 : 0.45);
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, ap.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Check for TOUCH moment trigger
      if (gestureState === 'TOUCH' && !lastTouchStateRef.current) {
        touchEffectsRef.current.triggerTouchRipple(metrics.centerPoint);
        lastTouchStateRef.current = true;
      } else if (gestureState !== 'TOUCH') {
        lastTouchStateRef.current = false;
      }

      // Update and render touch ripples at centerPoint
      touchEffectsRef.current.update();
      touchEffectsRef.current.render(ctx);

      const isConnectedOrPulling =
        gestureState === 'TOUCH' ||
        gestureState === 'CONNECTED' ||
        gestureState === 'PULLING' ||
        gestureState === 'MAX_TENSION' ||
        gestureState === 'OPENING';

      // 2. Render APPROACHING State: small particles & magnetic shimmer between fingertips
      if (gestureState === 'APPROACHING' && tips.length >= 2) {
        const p1 = tips[0];
        const p2 = tips[1];
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const normApproach = Math.max(0, 1 - dist / (metrics.connectionThreshold * 2.5));

        // Magnetic shimmer line
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + normApproach * 0.25})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Shimmer particles between fingertips
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

      // 3. Render CONNECTION LINE (Locked to fingerA and fingerB endpoints)
      if (isConnectedOrPulling && tips.length >= 2) {
        const p1 = tips[0];
        const p2 = tips[1];
        const pullProgress = metrics.pullProgress;
        const center = metrics.centerPoint;

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.hypot(dx, dy);

        if (len > 2) {
          const nx = -dy / len;
          const ny = dx / len;

          // Update & render line traveling particles and sparks
          particleSystemRef.current.update(pullProgress, p1, p2);
          particleSystemRef.current.render(ctx, p1, p2, pullProgress, time);

          // Procedural wave segments
          const segments = isReducedMotion ? 20 : 42;
          const tensionFreq = 12 + pullProgress * 26;
          const tensionAmp = (2 + pullProgress * 15) * (1 + Math.sin(time * 0.015) * 0.25);

          // Layer 2 & 3: Soft Outer and Secondary Glow
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = pullProgress > 0.65 ? 'rgba(167, 139, 250, 0.4)' : 'rgba(0, 240, 255, 0.35)';
          ctx.lineWidth = 6 + pullProgress * 10;
          ctx.shadowBlur = 14 + pullProgress * 24;
          ctx.shadowColor = pullProgress > 0.65 ? '#A78BFA' : '#00F0FF';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const bx = p1.x + dx * t;
            const by = p1.y + dy * t;
            // Envelope: 0 at fingertips, maximum at middle
            const env = Math.sin(t * Math.PI);
            const wave = Math.sin(t * tensionFreq + time * 0.015) * tensionAmp * env;
            const x = bx + nx * wave;
            const y = by + ny * wave;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();

          // Layer 1: Thin Bright Core Beam
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5 + pullProgress * 3;
          ctx.shadowBlur = 10 + pullProgress * 14;
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

          // Radial glow & singularity accumulation at centerPoint (Section 14 & 15)
          if (pullProgress > 0.4) {
            const centerGlowRadius = (pullProgress - 0.4) * 55;
            ctx.save();
            const grad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, centerGlowRadius * 1.5);
            grad.addColorStop(0, `rgba(255, 255, 255, ${pullProgress * 0.85})`);
            grad.addColorStop(0.3, `rgba(0, 240, 255, ${pullProgress * 0.6})`);
            grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(center.x, center.y, centerGlowRadius * 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Maximum tension accumulation rings
            if (pullProgress > 0.8) {
              const ringR = ((time * 0.04) % 30) * (pullProgress * 1.4);
              ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(center.x, center.y, ringR, 0, Math.PI * 2);
              ctx.stroke();
            }
            ctx.restore();
          }
        }
      }

      // 4. Render Custom Fingertip Markers (Section 06 & 22)
      tips.forEach((tip) => {
        const opacity = tip.opacity;
        if (opacity <= 0.01) return;

        // Velocity-dependent light trail
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

        // Soft Outer Halo / Pulse
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

        // Soft glow disc
        const grad = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 12);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.4, 'rgba(0, 240, 255, 0.7)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Small Bright Center Point attached physically to fingertip
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
    };
  }, [fingertipsRef, metricsRef, gestureState, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none z-30"
    />
  );
}
