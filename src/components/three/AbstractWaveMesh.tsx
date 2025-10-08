"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Vector2 } from "three";
import * as THREE from "three";

export default function AbstractWaveMesh() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
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

  // Custom shader material
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new Vector2(0, 0) },
          uResolution: { value: new Vector2(viewport.width, viewport.height) },
          uColorA: { value: new THREE.Color("#6366f1") },
          uColorB: { value: new THREE.Color("#8b5cf6") },
          uColorC: { value: new THREE.Color("#ec4899") },
        },
        vertexShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vPosition = position;
            
            // Create wave effect
            vec3 pos = position;
            float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.3;
            float wave2 = sin(pos.y * 3.0 - uTime * 0.3) * 0.2;
            float wave3 = sin((pos.x + pos.y) * 1.5 + uTime * 0.4) * 0.25;
            
            // Mouse interaction
            float distanceToMouse = distance(pos.xy, uMouse * 3.0);
            float mouseInfluence = smoothstep(2.0, 0.0, distanceToMouse) * 0.8;
            
            pos.z += wave1 + wave2 + wave3 + mouseInfluence;
            vElevation = pos.z;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorC;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            // Create gradient based on position and elevation
            float mixStrength = (vElevation + 1.0) * 0.5;
            vec3 color = mix(uColorA, uColorB, vUv.y);
            color = mix(color, uColorC, vUv.x * 0.5);
            
            // Add some shimmer based on elevation
            float shimmer = sin(vElevation * 5.0 + uTime * 2.0) * 0.1 + 0.9;
            color *= shimmer;
            
            // Add transparency based on elevation
            float alpha = 0.6 + vElevation * 0.2;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        wireframe: false,
      }),
    [viewport]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.05);
    }

    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[8, 6, 64, 64]} />
    </mesh>
  );
}
