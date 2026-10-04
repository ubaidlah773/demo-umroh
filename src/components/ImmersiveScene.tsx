'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { TrackedFingertip } from '@/types/tracking';
import { GestureMetrics } from '@/types/gesture';

interface ImmersiveSceneProps {
  isVisible: boolean;
  fingertipsRef: React.MutableRefObject<TrackedFingertip[]>;
  metricsRef: React.MutableRefObject<GestureMetrics>;
  activeRealityIndex?: number;
  isReducedMotion?: boolean;
}

export default function ImmersiveScene({
  isVisible,
  fingertipsRef,
  metricsRef,
  activeRealityIndex = 0,
  isReducedMotion = false,
}: ImmersiveSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04070e, 0.045);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Soft Ambient and Central Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const centerLight = new THREE.PointLight(0x00f0ff, 4.5, 14);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

    // Dynamic hand light
    const handLight = new THREE.PointLight(0xa78bfa, 2.8, 10);
    handLight.position.set(0, 0, 2);
    scene.add(handLight);

    // Central Abstract Geometric Form
    const centralGroup = new THREE.Group();
    scene.add(centralGroup);

    // Core Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x060c18,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.85,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    centralGroup.add(coreMesh);

    // Glowing Wireframe Outer Cage
    const cageGeo = new THREE.DodecahedronGeometry(1.95, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    centralGroup.add(cageMesh);

    // Gyroscopic Orbital Rings
    const rings: THREE.Mesh[] = [];
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(2.35 + r * 0.35, 0.014, 16, 75);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r === 1 ? 0xa78bfa : 0x00f0ff,
        transparent: true,
        opacity: 0.45,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = (r * Math.PI) / 3;
      ring.rotation.y = (r * Math.PI) / 4;
      rings.push(ring);
      centralGroup.add(ring);
    }

    // Interactive Floating Particles
    const particleCount = isReducedMotion ? 600 : 1800;
    const positions = new Float32Array(particleCount * 3);
    const originals = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.0 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originals[i3] = x;
      originals[i3 + 1] = y;
      originals[i3 + 2] = z;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Hand Cursor in 3D
    const cursorGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const cursorMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const cursorMesh = new THREE.Mesh(cursorGeo, cursorMat);
    cursorMesh.visible = false;
    scene.add(cursorMesh);

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let targetCamX = 0;
    let targetCamY = 0;
    let targetScale = 1.0;
    let currentScale = 1.0;

    const renderLoop = () => {
      const dt = Math.min(clock.getDelta(), 0.1);

      const tips = fingertipsRef.current || [];
      const primaryTip = tips.find((t) => t.opacity > 0.4);
      const metrics = metricsRef.current;

      const isPinching = Boolean(primaryTip?.isPinching || metrics?.isPinching);

      if (primaryTip) {
        const ndcX = (primaryTip.x / window.innerWidth) * 2 - 1;
        const ndcY = -(primaryTip.y / window.innerHeight) * 2 + 1;

        targetCamX = ndcX * 1.2;
        targetCamY = ndcY * 0.8;

        // Project cursor into 3D world
        const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const dist = -camera.position.z / dir.z;
        const cursorWorldPos = camera.position.clone().add(dir.multiplyScalar(dist));

        cursorMesh.position.copy(cursorWorldPos);
        cursorMesh.visible = true;
        handLight.position.copy(cursorWorldPos).add(new THREE.Vector3(0, 0, 1.0));

        // Pinch reaction
        if (isPinching) {
          targetScale = 1.4;
          cursorMat.color.setHex(0xa78bfa);
        } else {
          targetScale = 1.0;
          cursorMat.color.setHex(0xffffff);
        }

        // Particle repulsion physics around finger cursor
        const posAttr = particlesGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        const cx = cursorWorldPos.x;
        const cy = cursorWorldPos.y;
        const cz = cursorWorldPos.z;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          let px = posArray[i3];
          let py = posArray[i3 + 1];
          let pz = posArray[i3 + 2];

          const ox = originals[i3];
          const oy = originals[i3 + 1];
          const oz = originals[i3 + 2];

          const ddx = px - cx;
          const ddy = py - cy;
          const ddz = pz - cz;
          const distSq = ddx * ddx + ddy * ddy + ddz * ddz;

          if (distSq < 2.8 && distSq > 0.001) {
            const force = (1.0 - Math.sqrt(distSq) / 1.7) * 4.0;
            velocities[i3] += (ddx / Math.sqrt(distSq)) * force * dt;
            velocities[i3 + 1] += (ddy / Math.sqrt(distSq)) * force * dt;
            velocities[i3 + 2] += (ddz / Math.sqrt(distSq)) * force * dt;
          }

          // Return spring
          velocities[i3] += (ox - px) * 1.6 * dt;
          velocities[i3 + 1] += (oy - py) * 1.6 * dt;
          velocities[i3 + 2] += (oz - pz) * 1.6 * dt;

          // Damping
          velocities[i3] *= 0.94;
          velocities[i3 + 1] *= 0.94;
          velocities[i3 + 2] *= 0.94;

          posArray[i3] += velocities[i3];
          posArray[i3 + 1] += velocities[i3 + 1];
          posArray[i3 + 2] += velocities[i3 + 2];
        }
        posAttr.needsUpdate = true;
      } else {
        targetCamX = 0;
        targetCamY = 0;
        targetScale = 1.0;
        cursorMesh.visible = false;
      }

      // Smooth camera interpolation
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Smooth artifact scale
      currentScale += (targetScale - currentScale) * 0.1;
      centralGroup.scale.setScalar(currentScale);

      // Rotate artifact
      const spinSpeed = isReducedMotion ? 0.12 : 0.35;
      centralGroup.rotation.y += spinSpeed * dt;
      centralGroup.rotation.x += spinSpeed * 0.5 * dt;

      // Orbit gyroscopic rings
      rings.forEach((ring, idx) => {
        ring.rotation.z += (0.25 + idx * 0.15) * dt;
      });

      // Subtle particle cloud rotation
      particleSystem.rotation.y += 0.02 * dt;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 z-20 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
