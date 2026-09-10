"use client";
import { useEffect, useRef } from "react";

/** Original procedural art: three closed funding paths converge before separating.
 * Triangle size and stream density do not encode rates, balances or real transactions. */
export function PaymentField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastPaint = Number.NEGATIVE_INFINITY;
    let width = 0;
    let height = 0;
    let visible = true;
    const colors = [
      "#a781ff",
      "#8052ff",
      "#dad1ff",
      "#ffb829",
      "#c656a0",
      "#508f9c",
    ];
    const draw = (time: number) => {
      // Slow ambient motion needs no more than 20 paints per second.
      if (!reduced.matches && time - lastPaint < 50) {
        if (visible && !document.hidden) frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = time;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.39;
      const t = reduced.matches ? 0 : time * 0.000065;
      for (let i = 0; i < 1650; i++) {
        const u = (i / 1650) * Math.PI * 2;
        const lane = i % 3;
        const noise = Math.sin(i * 127.1) * Math.cos(i * 311.7);
        const v = u * 3 + lane * 2.094 + t;
        const r = 1 + 0.23 * Math.cos(v);
        const x = r * Math.cos(u + t) * scale;
        const y = r * Math.sin(u + t) * scale * 0.7;
        const z = Math.sin(v) * scale * 0.65;
        const px = width / 2 + x + noise * 22;
        const py = height / 2 + y * 0.75 + z * 0.65 + Math.cos(i * 53) * 17;
        const alpha = 0.46 + (Math.sin(v) + 1) * 0.24;
        const size = (i % 9 === 0 ? 3.0 : 1.5) + (z / scale + 1) * 0.35;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = i % 13 === 0 ? 1 : 0.65;
        ctx.beginPath();
        ctx.moveTo(px, py - size);
        ctx.lineTo(px - size * 0.87, py + size * 0.5);
        ctx.lineTo(px + size * 0.87, py + size * 0.5);
        ctx.closePath();
        ctx.stroke();
      }
      // Sparse ambient points remain subordinate to the funding paths.
      for (let i = 0; i < 44; i++) {
        const x = (Math.sin(i * 43.7) * 0.48 + 0.5) * width;
        const y = (Math.cos(i * 37.9) * 0.47 + 0.5) * height;
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = colors[i % 6];
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      ctx.globalAlpha = 1;
      if (!reduced.matches && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      lastPaint = Number.NEGATIVE_INFINITY;
      draw(performance.now());
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      restart();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    intersection.observe(canvas);
    reduced.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      reduced.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
    };
  }, []);
  return (
    <div className="payment-field">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="field-caption" aria-hidden="true">
        <span>One agreement.</span>
        <span>Everyone accounted for.</span>
      </div>
    </div>
  );
}
