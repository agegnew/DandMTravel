"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  type: "flight" | "hotel" | "package" | "visa" | "cargo"
  image: string
  details: Record<string, any>
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on client side
  useEffect(() => {
    const savedCart = localStorage.getItem("skygate-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("skygate-cart", JSON.stringify(items))
    }
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex >= 0) {
        // Replace the existing item
        const newItems = [...prevItems]
        newItems[existingItemIndex] = item
        return newItems
      } else {
        // Add new item
        return [...prevItems, item]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))

    // If cart is empty after removal, clear localStorage
    if (items.length === 1) {
      localStorage.removeItem("skygate-cart")
    }
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("skygate-cart")
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price, 0)
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, getTotal }}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
