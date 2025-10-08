"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { Float } from "@react-three/drei";

export default function InteractiveModel() {
  const groupRef = useRef<Group>(null);
  const sphere1Ref = useRef<Mesh>(null);
  const sphere2Ref = useRef<Mesh>(null);
  const sphere3Ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire group slowly
    groupRef.current.rotation.y = time * 0.2;

    // Orbit the smaller spheres
    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.cos(time) * 2;
      sphere1Ref.current.position.z = Math.sin(time) * 2;
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(time + Math.PI * 0.66) * 2;
      sphere2Ref.current.position.z = Math.sin(time + Math.PI * 0.66) * 2;
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.cos(time + Math.PI * 1.33) * 2;
      sphere3Ref.current.position.z = Math.sin(time + Math.PI * 1.33) * 2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Central sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#6366f1"
            metalness={0.8}
            roughness={0.2}
            emissive="#6366f1"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Orbiting sphere 1 */}
        <mesh ref={sphere1Ref}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Orbiting sphere 2 */}
        <mesh ref={sphere2Ref}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#ec4899"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Orbiting sphere 3 */}
        <mesh ref={sphere3Ref}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}
