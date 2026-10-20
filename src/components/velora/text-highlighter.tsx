import * as React from "react";
import { cn } from "@/lib/utils";

interface TextHighlighterProps {
  children: React.ReactNode;
  className?: string;
}

export function TextHighlighter({
  children,
  className,
}: TextHighlighterProps) {
  return (
    <span
      className={cn(
        "relative inline-block font-semibold text-primary",
        "before:absolute before:-inset-x-2 before:-inset-y-0.5 before:-skew-y-1 before:rounded-md before:bg-primary/10 before:border before:border-primary/25 before:-z-10",
        className
      )}
    >
      {children}
    </span>
  );
}
