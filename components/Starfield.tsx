"use client";

import { useEffect, useRef } from "react";

const STAR_COUNT = 160;

export function Starfield({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.2 + 0.05
    }));

    const prefersReducedMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          star.y = (star.y + star.speed / 100) % 1;
        }
        const alpha = prefersReducedMotion ? 0.6 : 0.5 + Math.random() * 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      render();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
