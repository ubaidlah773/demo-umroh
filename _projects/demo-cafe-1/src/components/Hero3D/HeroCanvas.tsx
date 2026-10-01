"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import CoffeeCup3D from "./CoffeeCup3D";
import FloatingBeans3D from "./FloatingBeans3D";
import Image from "next/image";
import * as THREE from "three";

interface SceneRigProps {
  mouse: { x: number; y: number };
}

// Cinematic Studio Lighting & Parallax Camera Rig
function SceneRig({ mouse }: SceneRigProps) {
  const { camera } = useThree();
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    // 1. Subtle, grounded camera parallax
    const targetCamX = 0.2 + mouse.x * 0.45;
    const targetCamY = 0.35 - mouse.y * 0.3;
    const targetCamZ = 4.8 + Math.abs(mouse.x * mouse.y) * 0.2;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 2.5, delta);
    camera.lookAt(0.2, 0.1, 0);

    // 2. Dynamic specular tracking for key light
    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.damp(
        keyLightRef.current.position.x,
        -3.5 - mouse.x * 1.5,
        2.5,
        delta
      );
      keyLightRef.current.position.y = THREE.MathUtils.damp(
        keyLightRef.current.position.y,
        5.0 + mouse.y * 1.2,
        2.5,
        delta
      );
    }

    // 3. Subtle rim light glow breathing
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 4.2 + Math.sin(state.clock.getElapsedTime() * 1.6) * 0.5;
    }
  });

  return (
    <>
      {/* Ambient Espresso Room Tone - ensures shadow side retains rich warmth, never crushed black */}
      <ambientLight color="#38231A" intensity={1.4} />

      {/* KEY LIGHT: Large Softbox Upper-Left / Front */}
      <directionalLight
        ref={keyLightRef}
        position={[-3.5, 5.0, 4.0]}
        color="#FFF6EA"
        intensity={5.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* FILL LIGHT: Soft Warm Area Fill Front-Right (Reveals shadow side of cup & handle) */}
      <directionalLight
        ref={fillLightRef}
        position={[4.0, 2.5, 3.5]}
        color="#F8E5D0"
        intensity={3.2}
      />

      {/* TOP LIGHT: Overhead Light (Brightens coffee crema & inside chamber) */}
      <spotLight
        position={[0.2, 6.0, 0.5]}
        color="#FFF2E0"
        intensity={3.0}
        angle={0.65}
        penumbra={0.7}
      />

      {/* RIM LIGHT: Warm Golden Backlight (Sharp golden outline on cup silhouette & handle) */}
      <pointLight
        ref={rimLightRef}
        position={[0.5, 3.0, -3.5]}
        color="#C9A66B"
        intensity={4.5}
        distance={10}
      />

      {/* Under-Glow Bounce Light */}
      <pointLight
        position={[0.2, -1.8, 1.5]}
        color="#6E3D22"
        intensity={1.6}
        distance={5}
      />

      {/* 3D Scene Objects */}
      <Suspense fallback={null}>
        <CoffeeCup3D mouse={mouse} />
        <FloatingBeans3D mouse={mouse} />
      </Suspense>
    </>
  );
}

export default function HeroCanvas() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = (touch.clientY / window.innerHeight) * 2 - 1;
        setMouse({ x: x * 0.7, y: y * 0.7 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  if (!isMounted) return null;

  // Graceful Photorealistic Fallback if WebGL is unavailable
  if (!webGLSupported) {
    return (
      <div className="relative w-full h-[520px] md:h-[640px] flex items-center justify-center">
        <div className="relative w-80 h-80 md:w-[480px] md:h-[480px] rounded-full overflow-hidden shadow-2xl border border-gold-500/20">
          <Image
            src="/images/hero-cup.jpg"
            alt="AROMA Specialty Coffee Cup"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[550px] sm:h-[620px] lg:h-[760px] select-none cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true, // Transparent WebGL Canvas: no dark rectangle!
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera
          makeDefault
          position={[0.2, 0.35, 4.8]}
          fov={38}
        />
        <SceneRig mouse={mouse} />
      </Canvas>
    </div>
  );
}
