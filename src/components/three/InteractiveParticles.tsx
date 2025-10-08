"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";
import { Vector2 } from "three";

export default function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef(new Vector2(0, 0));
  const { viewport } = useThree();

  // Track mouse position
  useMemo(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const particlesCount = 3000;

  // Generate particles in a grid pattern
  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);

    const gridSize = Math.ceil(Math.sqrt(particlesCount));
    const spacing = 10 / gridSize;

    for (let i = 0; i < particlesCount; i++) {
      const x = (i % gridSize) * spacing - 5;
      const y = Math.floor(i / gridSize) * spacing - 3;
      const z = (Math.random() - 0.5) * 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    return { positions, originalPositions };
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Convert mouse position to world coordinates
    const mouseX = (mouse.current.x * viewport.width) / 2;
    const mouseY = (mouse.current.y * viewport.height) / 2;

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Get original position
      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];

      // Wave motion
      const waveX = Math.sin(origX * 0.5 + time * 0.5) * 0.3;
      const waveY = Math.cos(origY * 0.5 + time * 0.3) * 0.3;

      // Mouse interaction
      const dx = mouseX - origX;
      const dy = mouseY - origY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 3;

      let mouseInfluenceZ = 0;
      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 2;
        mouseInfluenceZ = force;
      }

      // Update position
      positionsArray[i3] = origX + waveX;
      positionsArray[i3 + 1] = origY + waveY;
      positionsArray[i3 + 2] =
        origZ + Math.sin(time + i * 0.01) * 0.5 + mouseInfluenceZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <pointsMaterial
        transparent
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        color="#6366f1"
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
