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
      {/* Touch: each link gets a 44px-tall, >=44px-wide hit area whose extra size is cancelled by its
          own negative margins, so every line of a wrapped trail renders exactly as on desktop. */}
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition-colors duration-200 hover:text-primary pointer-coarse:-mx-2.5 pointer-coarse:-my-3.5 pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center pointer-coarse:px-2.5">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-white/20 select-none" aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="transition-colors duration-200 hover:text-primary pointer-coarse:-mx-2.5 pointer-coarse:-my-3.5 pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center pointer-coarse:px-2.5">
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
