import { useEffect, type ReactNode } from 'react'

export type DialogCloseReason = 'backdrop' | 'escape' | 'manual'

interface Props {
  open: boolean
  title?: string
  children: ReactNode
  footer?: ReactNode
  onClose: (reason: DialogCloseReason) => void
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

export function Dialog({
  open,
  title,
  children,
  footer,
  onClose,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: Props) {
  useEffect(() => {
    if (!open || !closeOnEscape) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose('escape')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeOnEscape, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'dialog-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => closeOnBackdrop && onClose('backdrop')}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          {title && (
            <h2 id="dialog-title" className="text-lg font-semibold text-heading">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={() => onClose('manual')}
            aria-label="Cerrar"
            className="ml-auto text-muted transition-colors hover:text-text"
          >
            ×
          </button>
        </div>

        <div className="text-sm text-text">{children}</div>

        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
