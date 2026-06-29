export function formatPrice(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(iso))
}
