"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Sparkles, ZoomIn, Eye, ArrowDown } from "lucide-react";

function MacroBeanObject() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // High-Resolution Procedural Bump & Oil Texture for the Macro Bean
  const { bumpTexture, roughnessTexture } = useMemo(() => {
    if (typeof document === "undefined") return { bumpTexture: null, roughnessTexture: null };

    // 1. Bump Canvas (wrinkles, cellular pores, crackles)
    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 1024;
    bumpCanvas.height = 1024;
    const bCtx = bumpCanvas.getContext("2d");
    if (bCtx) {
      bCtx.fillStyle = "#808080";
      bCtx.fillRect(0, 0, 1024, 1024);

      // Micro pores
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        bCtx.fillStyle = Math.random() > 0.5 ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)";
        bCtx.beginPath();
        bCtx.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
        bCtx.fill();
      }

      // Roasting thermal wrinkles & micro-striations
      bCtx.strokeStyle = "rgba(40,40,40,0.3)";
      for (let j = 0; j < 80; j++) {
        bCtx.lineWidth = 1.5 + Math.random() * 3;
        bCtx.beginPath();
        const startX = Math.random() * 1024;
        const startY = Math.random() * 1024;
        bCtx.moveTo(startX, startY);
        bCtx.bezierCurveTo(
          startX + (Math.random() - 0.5) * 120,
          startY + 40,
          startX + (Math.random() - 0.5) * 120,
          startY + 80,
          startX + (Math.random() - 0.5) * 60,
          startY + 120
        );
        bCtx.stroke();
      }
    }

    const bTex = new THREE.CanvasTexture(bumpCanvas);
    bTex.wrapS = THREE.RepeatWrapping;
    bTex.wrapT = THREE.RepeatWrapping;
    bTex.repeat.set(2, 2);

    // 2. Roughness Canvas (varied aromatic lipid gloss)
    const roughCanvas = document.createElement("canvas");
    roughCanvas.width = 512;
    roughCanvas.height = 512;
    const rCtx = roughCanvas.getContext("2d");
    if (rCtx) {
      rCtx.fillStyle = "#404040"; // fairly glossy base
      rCtx.fillRect(0, 0, 512, 512);

      // Oil patches (very glossy specular areas)
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const rad = 25 + Math.random() * 45;
        const grad = rCtx.createRadialGradient(x, y, 0, x, y, rad);
        grad.addColorStop(0, "#101010"); // high gloss
        grad.addColorStop(1, "#404040");
        rCtx.fillStyle = grad;
        rCtx.beginPath();
        rCtx.arc(x, y, rad, 0, Math.PI * 2);
        rCtx.fill();
      }
    }

    const rTex = new THREE.CanvasTexture(roughCanvas);

    return { bumpTexture: bTex, roughnessTexture: rTex };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle breathing float & slow majestic yaw
    meshRef.current.rotation.y += (hovered ? 0.35 : 0.15) * delta;
    meshRef.current.rotation.x = Math.sin(t * 0.8) * 0.08;
    meshRef.current.position.y = Math.sin(t * 1.2) * 0.08;
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[2.2, 2.2, 2.2]}
    >
      {/* Main Roasted Macro Bean Geometry */}
      <mesh scale={[1, 1.55, 0.76]} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 48]} />
        <meshStandardMaterial
          color="#382117"
          roughness={0.24}
          metalness={0.25}
          bumpMap={bumpTexture || undefined}
          bumpScale={0.035}
          roughnessMap={roughnessTexture || undefined}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Deep Center Fissure / Cleft Groove */}
      <mesh position={[0, 0, 0.72]} scale={[0.16, 1.44, 0.14]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0A0402" roughness={0.98} />
      </mesh>

      {/* Crease Flake Insets (Silverskin Remnants) */}
      <mesh position={[0, 0.1, 0.71]} scale={[0.08, 0.4, 0.12]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6B4B32" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.2, 0.71]} scale={[0.07, 0.35, 0.12]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#5E4028" roughness={0.8} />
      </mesh>

      {/* Orbiting Macro Volatiles (Aroma Particles) */}
      {Array.from({ length: 28 }).map((_, i) => {
        const theta = (i / 28) * Math.PI * 2;
        const rad = 2.0 + (i % 4) * 0.25;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(theta) * rad,
              ((i - 14) / 14) * 2.2,
              Math.sin(theta) * rad,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#C9A66B" transparent opacity={0.65} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function MacroCoffeeBean3D() {
  return (
    <section className="relative py-28 md:py-40 bg-espresso-950 overflow-hidden border-t border-gold-500/10">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Macro Viewport */}
          <div className="lg:col-span-7 relative h-[450px] sm:h-[550px] md:h-[620px] rounded-3xl overflow-hidden bg-espresso-900/60 border border-gold-500/25 shadow-2xl group cursor-grab active:cursor-grabbing">
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={38} />

              {/* Cinematic Macro Studio Lighting */}
              <ambientLight color="#241510" intensity={1.6} />
              <spotLight
                position={[5, 7, 5]}
                color="#FFF2DB"
                intensity={3.5}
                angle={0.5}
                penumbra={0.8}
                castShadow
              />
              <spotLight
                position={[-5, -4, 3]}
                color="#B87945"
                intensity={2.2}
                angle={0.6}
              />
              <pointLight position={[0, 4, -4]} color="#C9A66B" intensity={2.8} />

              <MacroBeanObject />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>

            {/* Viewport UI Controls */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso-950/85 backdrop-blur-md border border-gold-500/30 text-[10px] font-mono tracking-widest text-gold-400">
                <ZoomIn size={12} />
                <span>MACRO INSPECTION • 360° INTERACTIVE</span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-cream-100/50 hidden sm:inline-block">
                DRAG TO EXPLORE ANGLE
              </span>
            </div>
          </div>

          {/* Right: Technical Anatomy & Sensory Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-gold-500">
              <Sparkles size={13} />
              <span>CELLULAR ANATOMY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-normal leading-tight tracking-tight">
              INSIDE THE <br />
              <span className="gold-gradient-text italic font-serif">ROASTED BEAN.</span>
            </h2>

            <p className="text-cream-200/80 text-sm sm:text-base font-light leading-relaxed">
              Under extreme macro magnification, the complex topography of a roasted specialty bean emerges. Cellular expansion during first crack creates micro-pores that release aromatic lipid volatiles and lock in soluble sweetness.
            </p>

            {/* 4 Macro Specs */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-espresso-900/80 border border-white/5 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-sm text-cream-100 font-medium">Aromatic Lipid Gloss</h4>
                  <p className="text-xs text-cream-200/60 pt-0.5">Natural essential oils migrate to the surface at second crack, delivering notes of cocoa and toasted pecan.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-espresso-900/80 border border-white/5 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-caramel-400 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-sm text-cream-100 font-medium">Center Fissure & Silverskin</h4>
                  <p className="text-xs text-cream-200/60 pt-0.5">The signature cleft seam retains chaff traces, verifying gentle thermodynamic convection airflow during drum roasting.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-espresso-900/80 border border-white/5 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-sm text-cream-100 font-medium">Uniform Moisture Retention</h4>
                  <p className="text-xs text-cream-200/60 pt-0.5">Stabilized at 10.5% internal water density prior to roasting, guaranteeing even heat transfer throughout the core.</p>
                </div>
              </div>
            </div>

            {/* Seamless transition indicator into Origin */}
            <div className="pt-2">
              <a
                href="#origin"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>EXPLORE HARVEST REGIONS</span>
                <ArrowDown size={14} className="text-gold-500" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
