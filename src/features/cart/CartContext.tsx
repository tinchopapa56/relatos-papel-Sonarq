import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Book } from '@/features/books'
import type { CartItem } from './types'

interface CartContextValue {
  items: CartItem[]
  addItem: (book: Book) => void
  removeItem: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(book: Book) {
    setItems((prev) => {
      const existing = prev.find((i) => i.book.id === book.id)
      if (existing) {
        return prev.map((i) =>
          i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { book, quantity: 1 }]
    })
  }

  function removeItem(bookId: string) {
    setItems((prev) => prev.filter((i) => i.book.id !== bookId))
  }

  function updateQuantity(bookId: string, quantity: number) {
    if (quantity < 1) {
      removeItem(bookId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.book.id === bookId ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = items.reduce((sum, i) => sum + i.book.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
