
import { ContentCarousel } from "../shared/ContentCarousel";

interface Item {
  title: string;
  src: string;
  placeholder: string;
}

interface SportEventsProps {
  items: Item[];
}

export function SportEvents({ items }: SportEventsProps) {
  return (
    <ContentCarousel
      items={items}
      title="Sport"
      titleClassName="styled-title absolute top-8 text-7xl opacity-10 sm:top-4 sm:text-[9rem]"
      subtitle="Events"
      subtitleClassName="text-2xl font-bold uppercase tracking-[10px]"
    />
  );
}
