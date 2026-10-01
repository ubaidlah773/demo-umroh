"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface SplashRigProps {
  mouse: { x: number; y: number };
}

function FluidSplashScene({ mouse }: SplashRigProps) {
  const splashGroupRef = useRef<THREE.Group>(null);
  const cupRef = useRef<THREE.Group>(null);

  // 1. Generate Asymmetric Fluid Ribbon Path using CatmullRomCurve3
  const { ribbonGeometry, droplets } = useMemo(() => {
    // Curving logarithmic spiral fluid arm
    const points: THREE.Vector3[] = [];
    const count = 48;
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 2.8 - 0.5;
      const radius = 1.3 + Math.sin(t * Math.PI * 1.5) * 1.1 + t * 0.4;
      const y = -1.2 + Math.sin(t * Math.PI) * 2.4 + (Math.random() - 0.5) * 0.15;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geom = new THREE.TubeGeometry(curve, 64, 0.14, 16, false);

    // Dynamic suspended droplets of varying radii
    const drops = Array.from({ length: 32 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.2 + Math.random() * 1.8;
      return {
        id: i,
        pos: [
          Math.cos(angle) * r,
          -1.0 + Math.random() * 2.6,
          Math.sin(angle) * r,
        ] as [number, number, number],
        radius: 0.04 + Math.random() * 0.09,
        speed: 0.5 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      };
    });

    return { ribbonGeometry: geom, droplets: drops };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (splashGroupRef.current) {
      // Slow majestic fluid revolution
      splashGroupRef.current.rotation.y = t * 0.25 + mouse.x * 0.4;
      splashGroupRef.current.rotation.x = 0.15 - mouse.y * 0.2;
      splashGroupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    }

    if (cupRef.current) {
      // Cup floats with slight counter-tilt
      cupRef.current.rotation.y = t * 0.18 + mouse.x * 0.3;
      cupRef.current.rotation.z = Math.sin(t * 1.2) * 0.08 - 0.2;
      cupRef.current.rotation.x = 0.25 + Math.cos(t * 1.4) * 0.05;
      cupRef.current.position.y = Math.sin(t * 1.8) * 0.1;
    }
  });

  return (
    <>
      {/* Dynamic Lighting */}
      <ambientLight color="#241510" intensity={1.8} />
      <spotLight
        position={[4, 6, 4]}
        color="#FFF2DC"
        intensity={3.5}
        angle={0.55}
        penumbra={0.8}
        castShadow
      />
      <pointLight position={[-4, -3, 3]} color="#B87945" intensity={2.2} />
      <pointLight position={[0, 4, -4]} color="#C9A66B" intensity={2.6} />

      {/* ================= SUSPENDED CUP INSIDE SPLASH ================= */}
      <group ref={cupRef} position={[0, 0, 0]} scale={[1.1, 1.1, 1.1]}>
        {/* Cup Shell */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[1.5, 1.0, 2.0, 48]} />
          <meshStandardMaterial
            color="#221510"
            roughness={0.25}
            metalness={0.15}
            envMapIntensity={1.8}
          />
        </mesh>
        {/* Gold Rim */}
        <mesh position={[0, 1.22, 0]}>
          <torusGeometry args={[1.5, 0.035, 16, 48]} />
          <meshStandardMaterial color="#C9A66B" metalness={0.96} roughness={0.14} />
        </mesh>
        {/* Cup Handle */}
        <mesh position={[1.65, 0.25, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow>
          <torusGeometry args={[0.65, 0.14, 16, 32, Math.PI * 1.15]} />
          <meshStandardMaterial color="#221510" roughness={0.25} metalness={0.15} />
        </mesh>
        {/* Coffee Liquid inside cup */}
        <mesh position={[0, 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.44, 32]} />
          <meshStandardMaterial color="#422212" roughness={0.1} metalness={0.1} />
        </mesh>
      </group>

      {/* ================= 3D LIQUID FLUID SPLASH RIBBON ================= */}
      <group ref={splashGroupRef}>
        {/* Primary Spiral Fluid Stream */}
        <mesh geometry={ribbonGeometry} castShadow>
          <meshStandardMaterial
            color="#4A2614"
            roughness={0.1}
            metalness={0.2}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Liquid Surface Highlights */}
        <mesh geometry={ribbonGeometry} scale={[1.02, 1.02, 1.02]}>
          <meshBasicMaterial
            color="#C9A66B"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>

        {/* 32 Individual Floating Fluid Droplets */}
        {droplets.map((d) => (
          <mesh key={d.id} position={d.pos} castShadow>
            <sphereGeometry args={[d.radius, 16, 16]} />
            <meshStandardMaterial
              color="#542B17"
              roughness={0.08}
              metalness={0.25}
              envMapIntensity={2.4}
            />
          </mesh>
        ))}

        {/* 4 Floating Coffee Beans Caught in Current */}
        {[
          { pos: [1.8, 0.9, 0.6], rot: [0.5, 0.2, 0.4] },
          { pos: [-1.6, -0.8, 1.2], rot: [-0.4, 0.6, 0.1] },
          { pos: [0.7, -1.4, -1.3], rot: [0.3, -0.5, 0.8] },
          { pos: [-1.9, 1.1, -0.8], rot: [-0.2, 0.3, -0.5] },
        ].map((bean, idx) => (
          <group key={idx} position={bean.pos as [number, number, number]} scale={[0.3, 0.3, 0.3]}>
            <mesh scale={[1, 1.5, 0.72]}>
              <sphereGeometry args={[1, 24, 16]} />
              <meshStandardMaterial color="#2B160E" roughness={0.3} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.68]} scale={[0.15, 1.35, 0.1]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#0E0604" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

interface CoffeeSplash3DProps {
  mouse?: { x: number; y: number };
}

export default function CoffeeSplash3D({ mouse = { x: 0, y: 0 } }: CoffeeSplash3DProps) {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] select-none cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0.5, 5.5]} fov={42} />
        <FluidSplashScene mouse={mouse} />
      </Canvas>
    </div>
  );
}
