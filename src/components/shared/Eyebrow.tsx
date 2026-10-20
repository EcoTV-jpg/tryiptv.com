import { cn } from '@/lib/utils';
import type React from 'react';

export function Eyebrow({ children, className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p className={cn("eyebrow mb-3", className)} {...props}>
      {children}
    </p>
  );
}
