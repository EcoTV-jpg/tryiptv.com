import React from "react";
import { cn } from "@/lib/utils";

export interface TermCardItem {
  name: string;
  icon: React.ElementType;
  description: string;
}

interface ArticleTermGridProps {
  items: TermCardItem[];
  className?: string;
}

/**
 * Standardized attribute and technical parameter cards for TryIPTV guides.
 * Integrates directly into the article vertical rhythm with normalized borders, radius, and typography.
 */
export function ArticleTermGrid({ items, className }: ArticleTermGridProps) {
  return (
    <div className={cn("my-8 sm:my-10 grid gap-4 sm:grid-cols-2", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 sm:p-5.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors hover:border-white/[0.14]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.08] text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-mono text-sm sm:text-base font-bold text-foreground">
                {item.name}
              </h3>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
