import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { books } from "./books";
import BookCard from "./components/BookCard";

const ITEMS_PER_PAGE = 8;

export default function BookCatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = useMemo(() => {
    return new URLSearchParams(location.search).get("q") ?? "";
  }, [location.search]);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return books.filter((book) => book.title.toLowerCase().includes(query));
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const handleSearchChange = (value: string) => {
    const clean = value.trim();
    const params = new URLSearchParams();

    if (clean) {
      params.set("q", clean);
    }

    navigate(
      { pathname: "/books", search: params.toString() },
      { replace: true },
    );
    setCurrentPage(1);
  };

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  return (
    <main className="flex flex-1 flex-col overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
            Catálogo de Libros
          </h1>
          <p className="mt-2 text-sm text-muted">
            Explora nuestra colección y encuentra tu próxima lectura
            {searchQuery ? ` para "${searchQuery}"` : ""} (
            {filteredBooks.length} resultados).
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-full border border-border bg-surface px-5 py-2.5 pl-12 text-sm text-text outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary-subtle"
          />
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle
              cx="11"
              cy="11"
              r="6.25"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M16 16l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {paginatedBooks.length > 0 ? (
        <div className="flex flex-1 flex-col gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 py-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted"
                aria-label="Anterior"
              >
                ←
              </button>

              <div className="flex items-center gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum = i + 1;

                  if (currentPage > 3 && totalPages > 5) {
                    pageNum = Math.min(currentPage - 2 + i, totalPages);
                    if (pageNum + (5 - i) > totalPages) {
                      pageNum = totalPages - 4 + i;
                    }
                  }

                  if (pageNum <= 0) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? "bg-primary text-white shadow-md"
                          : "hover:bg-primary-subtle hover:text-primary"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted"
                aria-label="Siguiente"
              >
                →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-heading">
            No se encontraron libros
          </p>
          <p className="text-sm text-muted">Intenta con otro título.</p>
        </div>
      )}
    </main>
  );
}
