"use client"

import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === product.id)
      if (item) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + (product.quantity || 1) } : i
        )
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }]
    })
  }

  const updateQuantity = (id, qty) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)))
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
