import { Link } from "react-router-dom";
import type { Book } from "../books";

type FeaturedCarouselCardProps = {
  book: Book;
  className: string;
};

export default function FeaturedCarouselCard({
  book,
  className,
}: FeaturedCarouselCardProps) {
  return (
    <Link to={`/books/${book.id}`} className={className}>
      <div className="aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-raised">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="line-clamp-2 text-sm font-semibold text-heading">
          {book.title}
        </h4>
        <p className="mt-1 text-xs text-muted">{book.author}</p>
      </div>
    </Link>
  );
}
