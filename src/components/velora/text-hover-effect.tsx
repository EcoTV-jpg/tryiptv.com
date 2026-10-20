"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextHoverEffectProps {
  text: string;
  duration?: number;
  className?: string;
}

export function TextHoverEffect({
  text,
  className,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const rect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - rect.left) / rect.width) * 100;
      const cyPercentage = ((cursor.y - rect.top) / rect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 85"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCursor({ x: null, y: null });
      }}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="35%" stopColor="hsl(var(--primary) / 0.8)" />
              <stop offset="70%" stopColor="hsl(var(--primary) / 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </>
          )}
        </linearGradient>

        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
          r="28%"
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Base subtle outline */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.45"
        className="fill-transparent stroke-white/[0.08] font-headline text-[58px] font-black tracking-wider transition-colors duration-300"
      >
        {text}
      </text>

      {/* Primary stroke reveal on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.6"
        mask="url(#textMask)"
        className="fill-primary/[0.12] font-headline text-[58px] font-black tracking-wider"
      >
        {text}
      </text>
    </svg>
  );
}
