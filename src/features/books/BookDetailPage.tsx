import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "./books";
import { useCart } from "@/features/cart";
import { QuantityCounter, Toast, type ToastSeverity } from "@/shared";

type ToastState = { severity: ToastSeverity; title: string; message: string };

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, updateQuantity, removeItem, items } = useCart();
  const [toast, setToast] = useState<ToastState | null>(null);

  const book = books.find((b) => b.id === id);
  const quantityInCart = items.find((i) => i.book.id === id)?.quantity ?? 0;

  const handleFirstAdd = () => {
    addItem(book!);
    setToast({
      severity: "info",
      title: "Agregado al carrito",
      message: `${book!.title} se añadió a tu carrito.`,
    });
  };

  const handleDecrement = () => {
    updateQuantity(book!.id, quantityInCart - 1);
    if (quantityInCart === 1) {
      setToast({
        severity: "warning",
        title: "Eliminado del carrito",
        message: `${book!.title} ya no está en tu carrito.`,
      });
    }
  };

  const handleRemove = () => {
    removeItem(book!.id);
    setToast({
      severity: "warning",
      title: "Eliminado del carrito",
      message: `${book!.title} ya no está en tu carrito.`,
    });
  };

  // If the book isn't in the cart yet, show the "Add" button.
  // Once added, replace it with a quantity counter so the user can adjust without leaving the page.
  const cartControl =
    quantityInCart === 0 ? (
      <button
        onClick={handleFirstAdd}
        className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-hover active:scale-95"
      >
        Añadir al carrito
      </button>
    ) : (
      <div className="flex flex-col items-end gap-2">
        <QuantityCounter
          quantity={quantityInCart}
          onIncrement={() => addItem(book!)}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
        />
        <p className="text-xs text-muted">
          {quantityInCart === 1 ? "1 unidad" : `${quantityInCart} unidades`} en
          tu carrito
        </p>
      </div>
    );

  // Si el libro no existe (ej. ID inválido en la URL)
  if (!book) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-heading">Libro no encontrado</h2>
        <button
          onClick={() => navigate("/books")}
          className="mt-4 text-primary hover:underline"
        >
          Volver al catálogo
        </button>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col p-6 sm:p-12 lg:px-24">
      {/* Botón Volver */}
      <button
        onClick={() => navigate("/books")}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
      >
        ← Volver al catálogo
      </button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        {/* Imagen del Libro */}
        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-raised shadow-md">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-heading sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-primary font-medium">
              {book.author}
            </p>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted">
              Sinopsis
            </span>
            <p className="leading-relaxed text-text">{book.description}</p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-3xl font-bold text-heading">
              ${book.price.toFixed(2)}
            </span>
            {cartControl}
          </div>

          <div className="rounded-lg bg-raised p-4">
            <p className="text-xs text-muted">
              * Envío gratuito en compras mayores a $50.00
            </p>
            <p className="text-xs text-muted mt-1">
              * Disponibilidad inmediata para entrega.
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed right-6 bottom-6 z-50">
          <Toast
            key={`${toast.severity}-${toast.message}`}
            title={toast.title}
            message={toast.message}
            severity={toast.severity}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </main>
  );
}
