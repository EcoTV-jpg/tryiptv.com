import React from "react";
import { cn } from "@/lib/utils";

interface ArticleProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Standardized typography wrapper for TryIPTV long-form educational articles.
 * Applies the systematic .prose styling rules defined in globals.css.
 */
export function ArticleProse({ children, className, ...props }: ArticleProseProps) {
  return (
    <div
      className={cn("prose prose-invert max-w-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}
