import { Link } from 'react-router-dom'
import type { Book } from '../books'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      to={`/books/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Portada */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-raised">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Información */}
      <div className="flex flex-col p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-heading group-hover:text-primary">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-muted">
          {book.author}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-primary">
            ${book.price.toFixed(2)}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted opacity-0 transition-opacity group-hover:opacity-100">
            Ver detalle →
          </span>
        </div>
      </div>
    </Link>
  )
}
