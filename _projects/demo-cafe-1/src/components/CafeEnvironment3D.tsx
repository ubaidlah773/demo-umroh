"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function CafeInteriorScene() {
  const lampLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lampLightRef.current) {
      // Subtle natural lamp filament flicker
      lampLightRef.current.intensity = 2.4 + Math.sin(state.clock.getElapsedTime() * 4) * 0.1;
    }
  });

  return (
    <>
      {/* Ambient Espresso Room Lighting */}
      <ambientLight color="#241510" intensity={1.5} />
      <spotLight
        position={[0, 6, 2]}
        color="#FFF4E0"
        intensity={3.0}
        angle={0.7}
        penumbra={0.8}
        castShadow
      />
      <pointLight position={[-4, 3, -2]} color="#B87945" intensity={1.8} />

      {/* ================= REAR CONCRETE ARCHITECTURAL WALL ================= */}
      <mesh position={[0, 2, -4]} receiveShadow>
        <planeGeometry args={[18, 10]} />
        <meshStandardMaterial color="#1C1410" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Concrete Wall Gold Logo Plaque */}
      <mesh position={[0, 4.2, -3.95]}>
        <planeGeometry args={[3.2, 0.9]} />
        <meshStandardMaterial color="#2B1912" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* ================= SUSPENDED WARM PENDANT LAMPS ================= */}
      {[-2.2, 0, 2.2].map((x, i) => (
        <group key={i} position={[x, 3.8, 0]}>
          {/* Wire */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 2.4, 8]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          {/* Brass Hood */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.45, 0.4, 24, 1, true]} />
            <meshStandardMaterial color="#C9A66B" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
          </mesh>
          {/* Glowing Filament Bulb */}
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#FFE2A3" />
          </mesh>
          <pointLight
            ref={i === 1 ? lampLightRef : undefined}
            position={[0, -0.2, 0]}
            color="#FFD699"
            intensity={2.2}
            distance={7}
            decay={2}
          />
        </group>
      ))}

      {/* ================= SOLID DARK WALNUT ESPRESSO COUNTER ================= */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 1.8, 3.2]} />
        <meshStandardMaterial color="#26160F" roughness={0.35} metalness={0.15} />
      </mesh>
      {/* Front Counter Slatted Wooden Trim */}
      <mesh position={[0, -0.6, 1.62]}>
        <boxGeometry args={[9.3, 1.7, 0.06]} />
        <meshStandardMaterial color="#1E110B" roughness={0.5} />
      </mesh>

      {/* ================= COMMERCIAL 2-GROUP ESPRESSO MACHINE ================= */}
      <group position={[-1.4, 0.65, 0]}>
        {/* Machine Body (Brushed Steel & Brass Accents) */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[2.2, 1.1, 1.4]} />
          <meshStandardMaterial color="#888888" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Top Cup Warmer Tray with Mini Cups */}
        <mesh position={[0, 0.92, 0]}>
          <boxGeometry args={[2.0, 0.05, 1.2]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((cx, idx) => (
          <mesh key={idx} position={[cx, 1.05, (idx % 2 === 0 ? 0.2 : -0.2)]}>
            <cylinderGeometry args={[0.1, 0.07, 0.16, 16]} />
            <meshStandardMaterial color="#241510" roughness={0.3} />
          </mesh>
        ))}

        {/* Dual Chrome Group Heads */}
        {[-0.45, 0.45].map((gx, idx) => (
          <group key={idx} position={[gx, 0.1, 0.65]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.14, 0.14, 0.22, 16]} />
              <meshStandardMaterial color="#C9A66B" metalness={0.95} roughness={0.12} />
            </mesh>
            {/* Portafilter Handle */}
            <mesh position={[0, -0.06, 0.25]} rotation={[0.1, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.35, 12]} />
              <meshStandardMaterial color="#111111" roughness={0.4} />
            </mesh>
          </group>
        ))}

        {/* Dual Steam Wands */}
        {[-0.95, 0.95].map((sx, idx) => (
          <mesh key={idx} position={[sx, 0.05, 0.6]} rotation={[0.4, 0, (idx === 0 ? -0.3 : 0.3)]}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 12]} />
            <meshStandardMaterial color="#DDDDDD" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* ================= PRECISION COFFEE GRINDER ================= */}
      <group position={[1.4, 0.85, -0.2]}>
        {/* Grinder Base */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.42, 0.8, 24]} />
          <meshStandardMaterial color="#1F1F1F" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Clear Glass Bean Hopper */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.38, 0.18, 0.65, 24]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.4}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        {/* Dark Roasted Beans inside Hopper */}
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.34, 0.16, 0.5, 16]} />
          <meshStandardMaterial color="#2B160E" roughness={0.6} />
        </mesh>
      </group>

      {/* ================= AROMA SPECIALTY CUP ON COUNTER ================= */}
      <group position={[0.2, 0.45, 0.6]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.15, 0.3, 32]} />
          <meshStandardMaterial color="#241510" roughness={0.25} metalness={0.15} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <torusGeometry args={[0.22, 0.012, 16, 32]} />
          <meshStandardMaterial color="#C9A66B" metalness={0.96} roughness={0.12} />
        </mesh>
        <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.2, 24]} />
          <meshStandardMaterial color="#542E18" roughness={0.1} />
        </mesh>
        {/* Saucer */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.35, 0.25, 0.03, 32]} />
          <meshStandardMaterial color="#241510" roughness={0.25} />
        </mesh>
      </group>

      {/* ================= REAR SHELVES WITH COFFEE BAGS ================= */}
      {[-1.5, 1.5].map((sx, idx) => (
        <group key={idx} position={[sx, 2.6, -3.8]}>
          {/* Wooden Shelf */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.2, 0.06, 0.45]} />
            <meshStandardMaterial color="#382116" roughness={0.4} />
          </mesh>
          {/* Coffee Bags */}
          {[-0.6, -0.2, 0.2, 0.6].map((bx, bIdx) => (
            <mesh key={bIdx} position={[bx, 0.25, 0]}>
              <boxGeometry args={[0.26, 0.45, 0.18]} />
              <meshStandardMaterial color={bIdx % 2 === 0 ? "#1C1410" : "#B87945"} roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Contact Shadows on Counter */}
      <ContactShadows
        position={[0, 0.3, 0]}
        opacity={0.7}
        scale={8}
        blur={1.8}
        far={1.5}
        color="#0A0503"
      />
    </>
  );
}

export default function CafeEnvironment3D() {
  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[620px] select-none cursor-grab active:cursor-grabbing bg-espresso-950 rounded-3xl overflow-hidden border border-gold-500/25 shadow-2xl">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.8, 4.6]} fov={44} />
        <CafeInteriorScene />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>

      {/* 3D Viewport Controls Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-gold-400 bg-espresso-950/85 px-4 py-2 rounded-full border border-gold-500/25 pointer-events-none">
        <span>3D CAFÉ ENVIRONMENT • TRUE REALTIME SCENE</span>
        <span>DRAG TO PAN BAR</span>
      </div>
    </div>
  );
}
