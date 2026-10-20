import { cn } from '@/lib/utils';
import type React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </Component>
  );
}
