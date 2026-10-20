import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TweetCardProps {
  name: string;
  handle: string;
  time?: string;
  verified?: boolean;
  avatar?: string;
  content: React.ReactNode;
  className?: string;
}

export function TweetCard({
  name,
  handle,
  time,
  verified = false,
  avatar,
  content,
  className,
}: TweetCardProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm transition-all duration-200 hover:border-white/[0.16] hover:bg-[#090b0d]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="size-9 border border-white/[0.08]">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-sm">
            <div className="flex items-center gap-1 font-semibold text-foreground truncate">
              <span>{name}</span>
              {verified && (
                <span className="grid size-3.5 place-items-center rounded-full bg-primary text-[#050706]">
                  <Check className="size-2.5 stroke-[3]" />
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground truncate">@{handle}</div>
          </div>
        </div>
        {time && <span className="text-xs text-muted-foreground shrink-0">{time}</span>}
      </div>
      <div className="mt-3.5 text-sm leading-relaxed text-muted-foreground text-pretty">
        {content}
      </div>
    </div>
  );
}
