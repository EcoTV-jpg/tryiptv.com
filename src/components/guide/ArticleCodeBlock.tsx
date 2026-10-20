import React from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCodeBlockProps {
  title?: string;
  code: string;
  className?: string;
}

/**
 * Technical code block with normalized padding, radius, border, and safe mobile horizontal scroll.
 */
export function ArticleCodeBlock({
  title = "Example Code",
  code,
  className,
}: ArticleCodeBlockProps) {
  return (
    <div
      className={cn(
        "my-8 sm:my-9 overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080a] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] w-full",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-xs font-mono font-medium text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span>{title}</span>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 sm:p-5 text-xs sm:text-[13px] font-mono leading-relaxed text-foreground/90 selection:bg-primary/20">
        <code>{code}</code>
      </pre>
    </div>
  );
}
