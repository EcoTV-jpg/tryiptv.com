
import Image from "next/image";
import { brands, brands_two } from "@/lib/site-data/brands";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Container } from "../shared/Container";
import { cn } from "@/lib/utils";

const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxwYXRoIGQ9Ik0wIDBoOHY1SDB6IiBmaWxsPSIjZWRlZGVkIi8+PC9zdmc+";

const BrandCarousel = ({ images, reverse = false }: { images: typeof brands, reverse?: boolean }) => {
    return (
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
          }}
        >
          <div className={cn(
            "flex min-w-full shrink-0 animate-[scroll_40s_linear_infinite] items-center gap-4",
            reverse && "animate-[scroll_40s_linear_infinite_reverse]"
            )}
            aria-hidden="true"
            >
            {[...images, ...images].map((brand, index) => {
                 const brandImage = PlaceHolderImages.find(img => img.id === brand.id);
                 if (!brandImage) return null;
                 return (
                     <div
                        key={`${brand.id}-${index}`}
                        className="w-36 flex-shrink-0 px-4"
                    >
                        <Image
                            src={brandImage.imageUrl}
                            alt={brand.alt}
                            width={brandImage.width || 150}
                            height={brandImage.height || 46}
                            className="object-contain h-12 w-auto"
                            sizes="112px"
                            data-ai-hint={brandImage.imageHint}
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                        />
                    </div>
                 )
            })}
          </div>
        </div>
    )
}

export function Brands() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="space-y-4">
        <BrandCarousel images={brands} reverse />
        <BrandCarousel images={brands_two} />
      </Container>
    </section>
  );
}
