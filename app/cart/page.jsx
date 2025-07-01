"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import { useCart } from "@/context/CartContext"

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(total)
  }, [cart])

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, value)
    updateQuantity(id, qty)
  }

const renderCartItem = (item) => (
    <li key={item.id} className="flex gap-4 p-4 border-b">
      <div className="relative w-24 h-24">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <Link href={`/products/${item.id}`} className="font-medium text-gray-900 hover:underline">
            {item.name}
          </Link>
          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex border rounded">
            <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2">-</button>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
              className="w-12 text-center border-0"
            />
            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2">+</button>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-red-500 flex items-center">
            <Trash2 className="h-4 w-4 mr-1" /> Remove
          </button>
        </div>
      </div>
    </li>
  )

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-xl mx-auto p-8 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500">You haven't added any products yet.</p>
          <Link href="/">
            <Button className="mt-6">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const shipping = 5
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <Link href="/" className="flex items-center text-gray-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>

        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded shadow">
            <ul>{cart.map(renderCartItem)}</ul>
          </div>

          {/* Summary */}
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-6">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
