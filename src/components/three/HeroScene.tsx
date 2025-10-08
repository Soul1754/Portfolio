"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import AbstractWaveMesh from "./AbstractWaveMesh";
import InteractiveParticles from "./InteractiveParticles";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
          <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ec4899" />

          {/* Abstract wave mesh - responds to mouse */}
          <AbstractWaveMesh />

          {/* Interactive particle grid */}
          <InteractiveParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
