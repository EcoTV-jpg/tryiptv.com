import React from "react";
import Image from "next/image";

interface GuideScreenshotProps {
  src?: string | null;
  alt?: string;
  caption?: string;
  note?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/**
 * GuideScreenshot renders an instructional screenshot with caption and optional variation note.
 * If `src` is missing or empty, it renders NULL.
 * No empty placeholder boxes, broken images, or fake screenshots are displayed.
 */
export function GuideScreenshot({
  src,
  alt = "Fire TV instructional screenshot",
  caption,
  note,
  width = 1024,
  height = 576,
  priority = false,
  className,
}: GuideScreenshotProps) {
  if (!src || typeof src !== "string" || src.trim() === "") {
    return null;
  }

  return (
    <figure
      className={`my-5 rounded-xl border border-white/[0.08] bg-[#07080a] p-2 sm:p-2.5 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className || ""}`}
    >
      <div className="relative w-full overflow-hidden rounded-lg bg-black/40">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 760px, 820px"
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      {(caption || note) && (
        <figcaption className="mt-2.5 px-2 pb-1 text-xs text-muted-foreground leading-relaxed">
          {caption && <span className="block text-foreground/90 font-medium text-center">{caption}</span>}
          {note && (
            <span className="block mt-1 text-center text-[11px] text-muted-foreground/80 italic">
              {note}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
