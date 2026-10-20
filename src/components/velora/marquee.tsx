import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      <style>{`
        @keyframes marquee-horizontal {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap))); }
        }
        .velora-marquee-track {
          display: flex;
          flex-shrink: 0;
          justify-content: space-around;
          gap: var(--gap);
          animation: marquee-horizontal var(--duration) linear infinite;
          will-change: transform;
        }
        .velora-marquee-track.is-vertical {
          flex-direction: column;
          animation-name: marquee-vertical;
        }
        .velora-marquee-track.is-reverse {
          animation-direction: reverse;
        }
        .group:hover .velora-marquee-track.pause-hover,
        .group:focus-within .velora-marquee-track.pause-hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .velora-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "velora-marquee-track",
            vertical && "is-vertical",
            reverse && "is-reverse",
            pauseOnHover && "pause-hover"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
