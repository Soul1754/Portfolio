"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { theme } from "@/config/theme";

export default function Gradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Gradient animation
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;

      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const color1 = theme.colors.gradient[0];
      const color2 = theme.colors.gradient[1];
      const color3 = theme.colors.gradient[2];

      const offset1 = 0.5 + Math.sin(time) * 0.2;
      const offset2 = 0.7 + Math.cos(time * 0.7) * 0.2;

      gradient.addColorStop(0, color1 + "20");
      gradient.addColorStop(offset1, color2 + "15");
      gradient.addColorStop(offset2, color3 + "20");
      gradient.addColorStop(1, theme.colors.background);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
