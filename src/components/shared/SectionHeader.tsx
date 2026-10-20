import { cn } from '@/lib/utils';
import type React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  badge?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  eyebrow,
  align = 'center',
  as: Heading = 'h2',
  badge,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 lg:mb-14 max-w-3xl",
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {badge && <div className="mb-3.5">{badge}</div>}
      {eyebrow && (
        <p className="text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-headline font-bold text-foreground tracking-tight",
          // Fluid: scales linearly from the 375px size to the desktop size (h1 36→52px, h2 28→38px).
          Heading === 'h1'
            ? "text-[length:clamp(2.25rem,1.672rem+2.465vw,3.25rem)] leading-[1.08]"
            : "text-[length:clamp(1.75rem,1.491rem+1.105vw,2.375rem)] leading-[1.14]"
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15.5px] sm:text-[16.5px] leading-relaxed text-muted-foreground",
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
