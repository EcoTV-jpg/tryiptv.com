
import { ContentCarousel } from "../shared/ContentCarousel";

interface Item {
  title: string;
  src: string;
  placeholder: string;
}

interface WeeklyBuzzProps {
  items: Item[];
}

export function WeeklyBuzz({ items }: WeeklyBuzzProps) {
  return (
    <ContentCarousel
      items={items}
      title="Top 10"
      titleClassName="styled-title absolute top-8 text-7xl opacity-10 sm:top-4 sm:text-[9rem]"
      subtitle="Movies"
      subtitleClassName="text-2xl font-bold uppercase tracking-[10px]"
    />
  );
}
