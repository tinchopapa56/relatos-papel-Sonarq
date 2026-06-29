import type { Book } from "../books";
import FeaturedCarouselCard from "./CarouselCard";
import getSlideClassName from "@/features/landing/hooks/useCarouselCards";

export default function carouselCards(
  slides: Book[],
  active: number,
  prevIndex: number,
  nextIndex: number,
) {
  return slides.map((book, index) => {
    const slideClassName = getSlideClassName(
      index,
      active,
      prevIndex,
      nextIndex,
    );

    return (
      <FeaturedCarouselCard
        key={book.id}
        book={book}
        className={slideClassName}
      />
    );
  });
}
