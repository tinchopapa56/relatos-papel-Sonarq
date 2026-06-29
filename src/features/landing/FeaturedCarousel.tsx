import type { Book } from "@/features/books/books";
import { useFeatureCarousel } from "@/features/landing/hooks/useFeatureCarousel";
import carouselCards from "./FeaturedCards";

interface FeaturedCarouselProps {
  items: Book[];
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const { slides, active, prevIndex, nextIndex, goPrev, goNext } =
    useFeatureCarousel(items);

  if (!slides.length) return null;

  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-clip">
      <div className="relative h-[320px] overflow-x-clip sm:h-[400px] md:h-[460px]">
        {carouselCards(slides, active, prevIndex, nextIndex)}

        <button
          type="button"
          onClick={goPrev}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-border bg-surface/90 px-3 py-2 text-sm font-semibold text-text shadow-sm backdrop-blur hover:border-primary hover:text-primary"
        >
          ←
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-border bg-surface/90 px-3 py-2 text-sm font-semibold text-text shadow-sm backdrop-blur hover:border-primary hover:text-primary"
        >
          →
        </button>
      </div>
    </div>
  );
}
