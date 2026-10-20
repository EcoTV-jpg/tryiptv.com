"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Variants = Record<string, any>;

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 8,
  inView = true,
  inViewMargin = "-40px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!inView);

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: inViewMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, inViewMargin]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none motion-reduce:filter-none",
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
        filter: isVisible ? "blur(0px)" : `blur(${blur})`,
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
