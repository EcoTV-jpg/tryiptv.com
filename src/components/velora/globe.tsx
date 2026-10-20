"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GlobeMarker {
  lat: number;
  lng: number;
  label?: string;
}

export interface GlobeArc {
  from: [number, number];
  to: [number, number];
}

export interface GlobeProps {
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  center?: [number, number];
  speed?: number;
  className?: string;
  label?: string;
}

// Convert lat/lng (degrees) to 3D Cartesian coordinates on unit sphere
function latLngToVector3(lat: number, lng: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ];
}

// Spherical Linear Interpolation (slerp) between two unit vectors
function slerp(
  p0: [number, number, number],
  p1: [number, number, number],
  t: number
): [number, number, number] {
  const dot = Math.max(-1, Math.min(1, p0[0] * p1[0] + p0[1] * p1[1] + p0[2] * p1[2]));
  const omega = Math.acos(dot);
  if (Math.abs(omega) < 0.001) {
    return [
      p0[0] + t * (p1[0] - p0[0]),
      p0[1] + t * (p1[1] - p0[1]),
      p0[2] + t * (p1[2] - p0[2]),
    ];
  }
  const sinOmega = Math.sin(omega);
  const scale0 = Math.sin((1 - t) * omega) / sinOmega;
  const scale1 = Math.sin(t * omega) / sinOmega;
  return [
    scale0 * p0[0] + scale1 * p1[0],
    scale0 * p0[1] + scale1 * p1[1],
    scale0 * p0[2] + scale1 * p1[2],
  ];
}

export function Globe({
  markers = [],
  arcs = [],
  center = [20, 0],
  speed = 1,
  className,
  label = "Interactive 3D Globe",
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({
    phi: center[0] * (Math.PI / 180),
    theta: center[1] * (Math.PI / 180),
  });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Generate base surface grid of points on the sphere
    const spherePoints: [number, number, number][] = [];
    const numPoints = 1200;
    const offset = 2 / numPoints;
    const increment = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      spherePoints.push([x, y, z]);
    }

    let progress = 0;

    const render = () => {
      if (!canvas || !ctx) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Auto-rotation when not dragging
      if (!isDraggingRef.current) {
        rotationRef.current.theta += 0.003 * speed;
      }

      progress += 0.006 * speed;

      const radius = Math.min(width, height) * 0.42;
      const cx = width / 2;
      const cy = height / 2;

      const sinTheta = Math.sin(rotationRef.current.theta);
      const cosTheta = Math.cos(rotationRef.current.theta);
      const sinPhi = Math.sin(rotationRef.current.phi);
      const cosPhi = Math.cos(rotationRef.current.phi);

      // Helper to project 3D point to 2D screen coordinates
      const project = (
        p: [number, number, number],
        scale = 1
      ): { x: number; y: number; z: number; visible: boolean } => {
        // Rotate around Y-axis (longitude/theta)
        const x1 = p[0] * cosTheta + p[2] * sinTheta;
        const y1 = p[1];
        const z1 = -p[0] * sinTheta + p[2] * cosTheta;

        // Rotate around X-axis (latitude/phi)
        const x2 = x1;
        const y2 = y1 * cosPhi - z1 * sinPhi;
        const z2 = y1 * sinPhi + z1 * cosPhi;

        return {
          x: cx + x2 * radius * scale,
          y: cy - y2 * radius * scale,
          z: z2,
          visible: z2 > -0.1,
        };
      };

      // 1. Draw Globe atmospheric background glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.15);
      glowGrad.addColorStop(0, "rgba(0, 240, 120, 0.03)");
      glowGrad.addColorStop(0.8, "rgba(0, 240, 120, 0.06)");
      glowGrad.addColorStop(1, "rgba(0, 240, 120, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Sphere rim outline
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Draw Dotted Surface
      for (const pt of spherePoints) {
        const { x, y, z, visible } = project(pt);
        if (!visible) continue;

        // Depth opacity & sizing
        const depthAlpha = Math.max(0.04, (z + 0.1) * 0.6);
        const pointSize = Math.max(0.6, (z + 1) * 0.9);

        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw Arcs (routes between hubs)
      for (const arc of arcs) {
        const p0 = latLngToVector3(arc.from[0], arc.from[1]);
        const p1 = latLngToVector3(arc.to[0], arc.to[1]);

        const arcPoints: { x: number; y: number; z: number }[] = [];
        const steps = 30;

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const basePoint = slerp(p0, p1, t);
          // Elevation altitude arc curve
          const altitude = 1 + 0.22 * Math.sin(t * Math.PI);
          const elevated: [number, number, number] = [
            basePoint[0] * altitude,
            basePoint[1] * altitude,
            basePoint[2] * altitude,
          ];
          const proj = project(elevated);
          arcPoints.push(proj);
        }

        // Draw curved arc path
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < arcPoints.length; i++) {
          const pt = arcPoints[i];
          if (pt.z > -0.2) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = "rgba(0, 240, 120, 0.35)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Traveling pulse particle along the arc
        const pulseT = (progress % 1 + (arc.from[0] % 0.3)) % 1;
        const pulsePoint = slerp(p0, p1, pulseT);
        const pulseElevated: [number, number, number] = [
          pulsePoint[0] * (1 + 0.22 * Math.sin(pulseT * Math.PI)),
          pulsePoint[1] * (1 + 0.22 * Math.sin(pulseT * Math.PI)),
          pulsePoint[2] * (1 + 0.22 * Math.sin(pulseT * Math.PI)),
        ];
        const pulseProj = project(pulseElevated);
        if (pulseProj.z > -0.1) {
          ctx.fillStyle = "#00f078";
          ctx.beginPath();
          ctx.arc(pulseProj.x, pulseProj.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Draw Markers & Labels
      for (const marker of markers) {
        const p = latLngToVector3(marker.lat, marker.lng);
        const proj = project(p, 1.01);

        if (proj.z > 0.05) {
          // Outer ripple circle
          const pulseSize = 3 + 2 * Math.sin(progress * 4);
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pulseSize + 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 240, 120, 0.2)";
          ctx.fill();

          // Center solid marker
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#00f078";
          ctx.fill();

          // Optional text label
          if (marker.label) {
            ctx.font = "600 11px Inter, sans-serif";
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.textAlign = "center";
            ctx.fillText(marker.label, proj.x, proj.y - 8);
          }
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse drag handlers for interactive rotation
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      rotationRef.current.theta += dx * 0.005;
      rotationRef.current.phi = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, rotationRef.current.phi - dy * 0.005)
      );
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch handlers for mobile interactivity
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseRef.current.x;
      const dy = e.touches[0].clientY - lastMouseRef.current.y;
      rotationRef.current.theta += dx * 0.005;
      rotationRef.current.phi = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, rotationRef.current.phi - dy * 0.005)
      );
      lastMouseRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [arcs, markers, speed]);

  return (
    <div
      className={cn(
        "relative aspect-square w-full select-none cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        aria-label={label}
        className="size-full"
      />
    </div>
  );
}
