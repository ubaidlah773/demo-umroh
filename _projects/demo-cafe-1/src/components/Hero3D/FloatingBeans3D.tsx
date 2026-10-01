"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingBeans3DProps {
  mouse: { x: number; y: number };
}

interface BeanData {
  initialPos: [number, number, number];
  rotSpeed: [number, number, number];
  scale: number;
  phase: number;
  depthLayer: "fg" | "mid" | "bg";
  parallaxFactor: number;
}

export default function FloatingBeans3D({ mouse }: FloatingBeans3DProps) {
  const beansRef = useRef<THREE.Group>(null);
  const sparklesRef = useRef<THREE.Points>(null);

  // 11 meticulously arranged floating 3D coffee beans with realistic Z-depth
  const beans = useMemo<BeanData[]>(() => {
    return [
      // Foreground Layer (Large, deep parallax, catching key light)
      { initialPos: [-3.2, 1.8, 1.3], rotSpeed: [0.25, 0.35, 0.15], scale: 0.42, phase: 0.1, depthLayer: "fg", parallaxFactor: 1.1 },
      { initialPos: [3.4, 2.2, 1.1], rotSpeed: [-0.2, -0.3, 0.25], scale: 0.38, phase: 1.4, depthLayer: "fg", parallaxFactor: 1.05 },
      { initialPos: [-2.6, -1.6, 1.5], rotSpeed: [0.3, -0.2, 0.2], scale: 0.44, phase: 2.3, depthLayer: "fg", parallaxFactor: 1.15 },
      { initialPos: [3.3, -1.4, 1.4], rotSpeed: [-0.35, 0.25, -0.3], scale: 0.4, phase: 3.5, depthLayer: "fg", parallaxFactor: 1.1 },

      // Midground Layer (orbiting smoothly around the focal cup)
      { initialPos: [-3.9, 0.2, 0.2], rotSpeed: [-0.15, 0.4, 0.1], scale: 0.32, phase: 4.1, depthLayer: "mid", parallaxFactor: 0.7 },
      { initialPos: [3.8, 0.6, -0.3], rotSpeed: [0.2, -0.25, 0.2], scale: 0.34, phase: 5.3, depthLayer: "mid", parallaxFactor: 0.72 },
      { initialPos: [-1.4, 3.1, 0.3], rotSpeed: [0.3, 0.15, -0.2], scale: 0.31, phase: 0.8, depthLayer: "mid", parallaxFactor: 0.75 },
      { initialPos: [2.2, 3.0, 0.4], rotSpeed: [-0.25, 0.3, -0.15], scale: 0.33, phase: 2.9, depthLayer: "mid", parallaxFactor: 0.7 },

      // Background Layer (subtle atmospheric depth)
      { initialPos: [-4.4, 1.6, -1.8], rotSpeed: [0.12, -0.15, 0.08], scale: 0.24, phase: 3.2, depthLayer: "bg", parallaxFactor: 0.35 },
      { initialPos: [4.2, -0.5, -2.0], rotSpeed: [-0.15, 0.2, -0.1], scale: 0.22, phase: 0.5, depthLayer: "bg", parallaxFactor: 0.3 },
      { initialPos: [1.9, -2.8, -1.6], rotSpeed: [-0.18, -0.15, 0.12], scale: 0.23, phase: 4.4, depthLayer: "bg", parallaxFactor: 0.32 },
    ];
  }, []);

  // Subtle warm coffee particles (low opacity, tiny, strictly supporting ambience)
  const particles = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Fluid organic tumbling and mouse deflection for each bean
    if (beansRef.current) {
      beansRef.current.children.forEach((child, i) => {
        if (i >= beans.length) return;
        const b = beans[i];

        // Harmonic dual-frequency wave floating
        const floatY = Math.sin(t * 1.1 + b.phase) * 0.12 + Math.cos(t * 1.8 + b.phase) * 0.04;
        const floatX = Math.cos(t * 0.8 + b.phase) * 0.08;

        const targetX = b.initialPos[0] + floatX + mouse.x * b.parallaxFactor * 1.1;
        const targetY = b.initialPos[1] + floatY - mouse.y * b.parallaxFactor * 0.9;

        child.position.x = THREE.MathUtils.damp(child.position.x, targetX, 2.8, delta);
        child.position.y = THREE.MathUtils.damp(child.position.y, targetY, 2.8, delta);

        // Slow, elegant continuous rotation
        child.rotation.x += b.rotSpeed[0] * delta;
        child.rotation.y += b.rotSpeed[1] * delta;
        child.rotation.z += b.rotSpeed[2] * delta;
      });
    }

    // Subtle particle drift
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = t * 0.015 + mouse.x * 0.03;
      sparklesRef.current.rotation.x = -mouse.y * 0.02;
    }
  });

  return (
    <>
      {/* 3D Floating Coffee Beans with Central Crease Seam */}
      <group ref={beansRef}>
        {beans.map((b, idx) => (
          <group
            key={idx}
            position={b.initialPos}
            scale={[b.scale, b.scale, b.scale]}
          >
            {/* Bean Outer Shell with natural roasted coffee color and oil gloss */}
            <mesh scale={[1, 1.48, 0.72]} castShadow>
              <sphereGeometry args={[1, 32, 24]} />
              <meshStandardMaterial
                color={b.depthLayer === "fg" ? "#3D2418" : b.depthLayer === "mid" ? "#2E1A11" : "#1F110B"}
                roughness={0.28}
                metalness={0.16}
                envMapIntensity={1.5}
              />
            </mesh>

            {/* Deep Center Crease Inset */}
            <mesh position={[0, 0, 0.69]} scale={[0.16, 1.36, 0.12]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#0E0604" roughness={0.95} />
            </mesh>

            {/* Foreground Bean Golden Rim Highlight */}
            {b.depthLayer === "fg" && (
              <mesh scale={[1.02, 1.5, 0.74]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                  color="#C9A66B"
                  wireframe
                  transparent
                  opacity={0.05}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* Extremely subtle warm ambient particles (low opacity, strictly non-dominating) */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#D7B87E"
          transparent
          opacity={0.25} // Low opacity: coffee cup remains the absolute visual centerpiece
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
