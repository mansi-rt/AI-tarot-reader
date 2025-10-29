"use client";

import { useEffect, useRef } from "react";

const CONSTELLATIONS = [
  { points: [[5, 10], [30, 30], [60, 20], [85, 45]] },
  { points: [[15, 70], [40, 55], [65, 75], [90, 60]] },
  { points: [[10, 40], [25, 20], [45, 35], [70, 15], [95, 30]] }
];

export function ConstellationLayer({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      CONSTELLATIONS.forEach((constellation) => {
        const points = constellation.points;
        ctx.beginPath();
        points.forEach(([x, y], index) => {
          const px = (x / 100) * width;
          const py = (y / 100) * height;
          if (index === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.stroke();
      });
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
