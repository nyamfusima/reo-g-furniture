import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, Product } from '../types/product'

type CartContextValue = {
  items: CartItem[]
  count: number
  notice: string | null
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  clearNotice: () => void
}

const STORAGE_KEY = 'reo-g-cart'
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 2400)
    return () => window.clearTimeout(timer)
  }, [notice])

  const addItem = (product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...current, { product, quantity }]
    })
    setNotice(`${product.name} added to your quote`)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.product.id !== productId))
      return
    }
    setItems((current) =>
      current.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    )
  }

  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => setItems([])
  const clearNotice = () => setNotice(null)

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      notice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      clearNotice,
    }),
    [items, notice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
