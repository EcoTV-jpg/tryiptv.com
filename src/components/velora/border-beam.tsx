import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  duration = 8,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = "hsl(var(--primary))",
  colorTo = "transparent",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden motion-reduce:border motion-reduce:border-primary/40",
        className
      )}
      style={{
        padding: `${borderWidth}px`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
      }}
    >
      <style>{`
        @keyframes border-beam-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        className="absolute -inset-[150%] m-auto aspect-square w-[300%] motion-reduce:hidden"
        style={{
          background: `conic-gradient(from ${anchor}deg, transparent 0deg, transparent 270deg, ${colorFrom} 335deg, ${colorTo} 360deg)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `${-delay}s`,
        }}
      />
    </div>
  );
}
