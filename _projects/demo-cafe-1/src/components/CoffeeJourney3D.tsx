"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface BeanModelProps {
  stage: number;
}

function InteractiveBean({ stage }: BeanModelProps) {
  const beanGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Dynamic color and material properties based on journey stage
  // Stage 1 (cherry): deep red/crimson
  // Stage 2 (green bean): light olive green
  // Stage 3 (roast): rich espresso dark brown
  // Stage 4 (grind): dark brown with particle dispersion
  // Stage 5 (extraction): amber liquid hue
  // Stage 6 (cup): golden crema
  const stageColors = [
    { base: "#962323", rim: "#C95A5A", name: "Ripe Cherry Red" },
    { base: "#5A6843", rim: "#A4B588", name: "Raw Green Seed" },
    { base: "#2B160E", rim: "#C9A66B", name: "Artisan Dark Roast" },
    { base: "#1E0F0A", rim: "#B87945", name: "Precision Grind" },
    { base: "#592E17", rim: "#D49C54", name: "Crema Extraction" },
    { base: "#241510", rim: "#F4E9D8", name: "Velvet Espresso" },
  ];

  const currentTheme = stageColors[stage - 1] || stageColors[2];

  useFrame((state, delta) => {
    if (!beanGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Constant smooth rotation, accelerates when hovered
    const speed = hovered ? 1.2 : 0.45;
    beanGroupRef.current.rotation.y += speed * delta;
    beanGroupRef.current.rotation.x = Math.sin(t * 1.5) * 0.15;
    beanGroupRef.current.position.y = Math.sin(t * 2.0) * 0.1;
  });

  return (
    <group
      ref={beanGroupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[1.5, 1.5, 1.5]}
    >
      {/* Coffee Bean Body */}
      <mesh scale={[1, 1.55, 0.75]} castShadow>
        <sphereGeometry args={[1, 48, 36]} />
        <meshStandardMaterial
          color={currentTheme.base}
          roughness={0.25}
          metalness={0.25}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Crease Seam */}
      <mesh position={[0, 0, 0.72]} scale={[0.18, 1.42, 0.14]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0A0402" roughness={0.95} />
      </mesh>

      {/* Golden Aura Rim Ring */}
      <mesh scale={[1.05, 1.6, 0.78]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={currentTheme.rim}
          wireframe
          transparent
          opacity={hovered ? 0.18 : 0.08}
        />
      </mesh>

      {/* Orbiting Micro Aroma Particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const radius = 1.8 + (i % 3) * 0.3;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              ((i - 9) / 9) * 1.5,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial
              color="#C9A66B"
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

interface CoffeeJourney3DProps {
  stage: number;
}

export default function CoffeeJourney3D({ stage }: CoffeeJourney3DProps) {
  return (
    <div className="relative w-full h-full min-h-[300px] select-none cursor-grab active:cursor-grabbing bg-espresso-950/60 rounded-2xl overflow-hidden border border-gold-500/20">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.8]} fov={45} />
        
        <ambientLight color="#38231A" intensity={1.5} />
        <spotLight
          position={[4, 6, 4]}
          color="#FFF2DC"
          intensity={3}
          angle={0.6}
          penumbra={0.8}
        />
        <pointLight position={[-4, -3, 3]} color="#B87945" intensity={2} />
        <pointLight position={[0, 3, -4]} color="#C9A66B" intensity={2.5} />

        <InteractiveBean stage={stage} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-espresso-950/80 px-3 py-1.5 rounded-full border border-gold-500/20 pointer-events-none">
        <span>3D BEAN INSPECTOR</span>
        <span>DRAG TO ROTATE 360°</span>
      </div>
    </div>
  );
}
