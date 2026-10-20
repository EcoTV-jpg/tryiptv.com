
import { ClientCarousel } from "./ClientCarousel";
import { Skeleton } from "../ui/skeleton";
import { Container } from "./Container";
import { Section } from "./Section";

type CarouselItem = {
  title: string;
  src: string;
  href?: string;
  placeholder: string;
};

interface ContentCarouselProps {
  items: CarouselItem[];
  title: string;
  subtitle: string;
  titleClassName?: string;
  subtitleClassName?: string;
  showHoverContent?: boolean;
}

export function ContentCarouselSkeleton() {
  return (
    <Section className="overflow-hidden">
      <Container className="space-y-6">
      <div className="-mb-2 text-xl font-bold uppercase tracking-[10px] sm:text-2xl">
        <div className="flex flex-col gap-2 pt-20 max-sm:items-center">
            <Skeleton className="h-16 w-48" />
            <Skeleton className="h-8 w-32" />
        </div>
      </div>
      <div className="flex space-x-3 overflow-hidden">
        {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-[200px] rounded-md" />
        ))}
      </div>
      </Container>
    </Section>
  );
}

export function ContentCarousel({
  items,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  showHoverContent = false,
}: ContentCarouselProps) {
  
  return (
    <Section className="overflow-hidden border-t border-white/[0.06]">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">{title}</p>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.12] sm:text-4xl">{subtitle}</h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-6 text-muted-foreground md:block">A rotating selection from the channels, films, and sports available with your subscription.</p>
        </div>
        <ClientCarousel items={items} showHoverContent={showHoverContent} />
      </Container>
    </Section>
  );
}
