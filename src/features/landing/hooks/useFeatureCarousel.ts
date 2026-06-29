import { useMemo, useState } from "react";
import type { Book } from "@/features/books/books";

const useFeatureCarousel = (items: Book[]) => {
  const slides = useMemo(() => items.slice(0, 3), [items]);
  const [active, setActive] = useState(0);

  const prevIndex = (active - 1 + slides.length) % slides.length;
  const nextIndex = (active + 1) % slides.length;

  const goPrev = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  return { slides, active, prevIndex, nextIndex, goPrev, goNext };
};

export { useFeatureCarousel };
