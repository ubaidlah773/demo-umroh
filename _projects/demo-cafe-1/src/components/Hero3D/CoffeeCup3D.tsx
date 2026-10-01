"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface CoffeeCup3DProps {
  mouse: { x: number; y: number };
}

// Preload the user's uploaded GLB model
useGLTF.preload("/models/coffee-cup.glb");

export default function CoffeeCup3D({ mouse }: CoffeeCup3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const steamGroupRef = useRef<THREE.Group>(null);

  // Load the uploaded GLB model
  const gltf = useGLTF("/models/coffee-cup.glb");
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Enhance materials and enable shadows on the loaded model
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 2.0;
          mat.needsUpdate = true;
        }
      }
    });
  }, [clonedScene]);

  // Organic rising steam wisps
  const steamData = useMemo(() => {
    const count = 30;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      baseX: (Math.random() - 0.5) * 0.55,
      baseZ: (Math.random() - 0.5) * 0.55,
      speed: 0.008 + Math.random() * 0.014,
      phase: Math.random() * Math.PI * 2,
      freq: 1.4 + Math.random() * 1.8,
      maxHeight: 2.6 + Math.random() * 1.0,
      scale: 0.05 + Math.random() * 0.1,
      currentY: 0.55 + Math.random() * 1.8,
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // 1. Subtle, grounded idle breathing float (2-4px)
    const breatheY = Math.sin(t * 1.3) * 0.03 + Math.cos(t * 2.1) * 0.01 - 0.02;
    const breatheRoll = Math.sin(t * 1.4) * 0.012;
    const breathePitch = Math.cos(t * 1.0) * 0.012;

    // 2. Responsive mouse parallax tilt
    // Pitch reveals the latte art inside the cup
    const targetPitch = 0.35 - mouse.y * 0.25 + breathePitch;
    const targetYaw = 0.45 + mouse.x * 0.35 + Math.sin(t * 0.2) * 0.04;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetYaw,
      3.0,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetPitch,
      3.0,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      breatheRoll - mouse.x * 0.06,
      3.0,
      delta
    );

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      breatheY,
      3.2,
      delta
    );

    // 3. Volumetric steam wisps rising from cup opening
    if (steamGroupRef.current) {
      steamGroupRef.current.children.forEach((mesh, idx) => {
        const item = steamData[idx];
        item.currentY += item.speed;

        if (item.currentY > item.maxHeight) {
          item.currentY = 0.55;
          item.baseX = (Math.random() - 0.5) * 0.5;
          item.baseZ = (Math.random() - 0.5) * 0.5;
        }

        const progress = (item.currentY - 0.55) / (item.maxHeight - 0.55);
        const curlRadius = progress * 0.35;
        const curlX = Math.sin(t * item.freq + item.phase) * curlRadius;
        const curlZ = Math.cos(t * item.freq + item.phase) * curlRadius;

        mesh.position.set(item.baseX + curlX, item.currentY, item.baseZ + curlZ);

        const currentScale = item.scale * (1 + progress * 1.8);
        mesh.scale.set(currentScale, currentScale * 1.3, currentScale);

        const mat = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = Math.sin(progress * Math.PI) * 0.14;
      });
    }
  });

  return (
    <>
      {/* ================= 3D UPLOADED COFFEE CUP MODEL (SCALED PETITE & REFINED) ================= */}
      <group ref={groupRef} position={[0.15, 0.02, 0]} scale={[0.85, 0.85, 0.85]}>
        <Center>
          <primitive object={clonedScene} />
        </Center>

        {/* Volumetric Steam Rising from Latte Art Surface */}
        <group ref={steamGroupRef}>
          {steamData.map((s) => (
            <mesh key={s.id} position={[s.baseX, s.currentY, s.baseZ]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial
                color="#F8EFE4"
                transparent
                opacity={0.12}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= REALISTIC SOFT CONTACT SHADOW ================= */}
      <ContactShadows
        position={[0.15, -0.60, 0]}
        opacity={0.65}
        scale={2.8}
        blur={1.8}
        far={1.8}
        color="#080402"
      />
    </>
  );
}
