interface Props {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

export function QuantityCounter({ quantity, onIncrement, onDecrement, onRemove }: Props) {
  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Reducir cantidad"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold text-text">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Aumentar cantidad"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
      >
        +
      </button>

      {/* Delete all — pinned to top-right corner */}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Eliminar del carrito"
        className="absolute -right-2 -top-4 flex h-4 w-4 items-center justify-center rounded-full bg-raised text-[10px] text-muted transition-colors hover:bg-error hover:text-white"
      >
        ×
      </button>
    </div>
  )
}
