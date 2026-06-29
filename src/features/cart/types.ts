import type { Book } from '@/features/books'

export interface CartItem {
  book: Book
  quantity: number
}
