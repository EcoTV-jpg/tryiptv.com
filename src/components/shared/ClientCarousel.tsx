
"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, Play } from "lucide-react";

type ItemWithPlaceholder = {
  title: string;
  src: string;
  href?: string;
  placeholder: string;
};

interface ClientCarouselProps {
  items: ItemWithPlaceholder[];
  showHoverContent?: boolean;
}

export function ClientCarousel({
  items,
  showHoverContent = false,
}: ClientCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-3">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-[46%] pl-3 sm:basis-[31%] md:basis-[23%] lg:basis-[18.5%] xl:basis-[15.5%]"
          >
            <article className="group relative h-[238px] overflow-hidden rounded-md border border-white/[0.09] bg-card transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/20 sm:h-[300px] lg:h-[320px]">
              <Image
                alt={`${item.title} artwork`}
                loading="lazy"
                fill
                decoding="async"
                className="object-cover transition-transform duration-200 group-hover:scale-[1.025]"
                src={item.src}
                placeholder="blur"
                blurDataURL={item.placeholder}
                sizes="(max-width: 640px) 46vw, (max-width: 768px) 31vw, (max-width: 1024px) 23vw, (max-width: 1280px) 18.5vw, 15.5vw"
              />
              {showHoverContent && (
                <>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent opacity-0 transition-[background-color,opacity] duration-200 ease-in-out group-hover:bg-black/35 group-hover:opacity-100">
                    <div className="m-auto grid h-10 w-10 scale-95 place-content-center rounded-full bg-card text-primary shadow-xl shadow-black/40 transition-transform duration-200 ease-in-out group-hover:scale-100">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity ease-in-out group-hover:opacity-100">
                    <p className="line-clamp-2 translate-y-10 text-center text-sm font-semibold transition-transform ease-in-out group-hover:translate-y-0">
                      {item.title}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex flex-col items-end justify-end gap-2 p-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full border-0 bg-card/50 backdrop-blur hover:bg-card/70"
                      aria-label="Add to favorites"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full border-0 bg-card/50 backdrop-blur hover:bg-card/70"
                      aria-label="Bookmark"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />
              <p className="pointer-events-none absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-xs font-extrabold leading-4">{item.title}</p>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
