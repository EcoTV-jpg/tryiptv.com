import type { ComponentType } from "react";
import { Flame, Monitor, Smartphone, Tablet, Tv } from "lucide-react";
import {
  SiAndroid,
  SiAppletv,
  SiLg,
  SiMacos,
  SiRoku,
  SiSamsung,
} from "react-icons/si";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DeviceIconProps {
  name: string;
  iconName: string;
  href: string;
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Smartphone,
  Tablet,
  SiMacos,
  Macos: SiMacos,
  SiAndroid,
  Android: SiAndroid,
  Monitor,
  SiRoku,
  Roku: SiRoku,
  SiSamsung,
  Samsung: SiSamsung,
  SiLg,
  Lg: SiLg,
  Flame,
  Tv,
  SiAppletv,
  Appletv: SiAppletv,
};

export function DeviceIcon({ name, iconName, href }: DeviceIconProps) {
  const Icon = iconMap[iconName] || iconMap[`Si${iconName}`] || Tv;

  const isInternal = href.startsWith('/');
  const Component = isInternal ? Link : 'a';

  return (
    <Component
      href={href}
      className={cn(
        "group flex min-h-[124px] flex-col items-center justify-center gap-3 rounded-[14px] border border-white/[0.08] bg-[#07080a] p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-[#090b0d] motion-reduce:transform-none",
        !isInternal && "cursor-pointer",
        href === '#' && "pointer-events-none opacity-50"
      )}
      aria-label={name}
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.035] text-muted-foreground transition-colors duration-200 group-hover:bg-primary/[0.08] group-hover:text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-[13.5px] font-semibold text-foreground/90 transition-colors group-hover:text-foreground sm:text-[14px]">
        {name}
      </span>
    </Component>
  );
}
