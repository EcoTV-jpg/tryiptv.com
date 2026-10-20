import type React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
  align?: 'left' | 'center';
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  align = 'left',
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[18px] border border-white/[0.08] bg-[#07080a] p-7 sm:p-8 text-card-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-200 hover:border-white/[0.14] hover:bg-[#090b0d] motion-safe:hover:-translate-y-0.5",
        align === 'center' && "text-center",
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            "mb-6 grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-primary",
            align === 'center' && "mx-auto"
          )}
        >
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      <h3 className="font-headline text-[18px] sm:text-[19px] font-semibold leading-snug text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
