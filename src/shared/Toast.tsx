import { useEffect } from 'react'

export type ToastSeverity = 'success' | 'error' | 'info' | 'warning'
export type ToastCloseReason = 'timeout' | 'manual'

interface Props {
  message: string
  title?: string
  severity?: ToastSeverity
  life?: number
  onClose: (reason: ToastCloseReason) => void
}

const SEVERITY_STYLES: Record<ToastSeverity, { bar: string; icon: string; text: string }> = {
  success: { bar: 'border-l-success',   icon: '✓', text: 'text-success' },
  error:   { bar: 'border-l-error',     icon: '✕', text: 'text-error' },
  info:    { bar: 'border-l-primary',   icon: 'ℹ', text: 'text-primary' },
  warning: { bar: 'border-l-secondary', icon: '!', text: 'text-secondary' },
}

export function Toast({ message, title, severity = 'info', life = 3000, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => onClose('timeout'), life)
    return () => clearTimeout(timer)
  }, [life, onClose])

  const styles = SEVERITY_STYLES[severity]

  return (
    <div
      role="alert"
      className={`flex min-w-70 max-w-sm items-start gap-3 rounded-lg border border-border border-l-4 ${styles.bar} bg-surface p-4 shadow-lg`}
    >
      <span className={`text-lg font-bold leading-none ${styles.text}`}>{styles.icon}</span>
      <div className="flex-1">
        {title && <p className="text-sm font-semibold text-heading">{title}</p>}
        <p className="text-sm text-text">{message}</p>
      </div>
      <button
        type="button"
        onClick={() => onClose('manual')}
        aria-label="Cerrar"
        className="text-muted transition-colors hover:text-text"
      >
        ×
      </button>
    </div>
  )
}
