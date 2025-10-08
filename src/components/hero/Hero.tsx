"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Gradient from "./Gradient";
import HeroTitle from "./HeroTitle";
import MarqueeName from "./MarqueeName";
import HeroDown from "./HeroDown";

// Dynamic import for Three.js scene (client-side only)
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#0a0b0e] overflow-hidden">
      {/* Animated gradient background */}
      <Gradient />

      {/* Three.js 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Main content */}
      <HeroTitle />

      {/* Marquee */}
      <div className="absolute bottom-24 left-0 right-0">
        <MarqueeName />
      </div>

      {/* Scroll indicator */}
      <HeroDown />
    </section>
  );
}
