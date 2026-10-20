import type React from 'react';
import { cn } from '@/lib/utils';

type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
  variant?: 'default' | 'alt';
};

export function Section({ className, variant = 'default', ...props }: SectionProps) {
  return (
    <section
      className={cn(
        'py-14 sm:py-16 md:py-20 lg:py-24',
        variant === 'alt' && 'border-y border-white/[0.05] bg-[#07080a]',
        className
      )}
      {...props}
    />
  );
}
