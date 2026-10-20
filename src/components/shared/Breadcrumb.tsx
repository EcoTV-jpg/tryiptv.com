import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  align?: 'left' | 'center';
}

export function Breadcrumb({ items, className, align = 'left' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-8 text-xs sm:text-sm text-muted-foreground",
        align === 'center' && "flex justify-center",
        className
      )}
    >
      {/* Links grow to 44px rows on touch screens (pointer-coarse); mouse layouts are unchanged. */}
      <ol className="flex flex-wrap items-center gap-x-2 pointer-fine:gap-y-2">
        <li>
          <Link href="/" className="inline-flex min-h-11 min-w-11 items-center transition-colors duration-200 hover:text-primary pointer-fine:min-h-0 pointer-fine:min-w-0">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-white/20 select-none">/</span>
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center transition-colors duration-200 hover:text-primary pointer-fine:min-h-0 pointer-fine:min-w-0">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-foreground" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
