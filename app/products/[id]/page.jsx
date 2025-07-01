"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import { products } from "@/lib/products"
import { useCart } from "@/context/CartContext"

export default function ProductDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  // Load product data when the page loads
  useEffect(() => {
    const productId = parseInt(id)
    const found = products.find((p) => p.id === productId)

    if (found) {
      setProduct(found)
    } else {
      router.push("/") // Go back if not found
    }

    setLoading(false)
  }, [id, router])

  // Add product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity })
    }
  }

  // Loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Not found state
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => router.back()} className="text-gray-600 flex items-center mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to products
        </button>

        <div className="bg-white rounded shadow-md p-6 md:flex gap-6">
          {/* Product Image */}
          <div className="relative w-full md:w-1/2 h-80">
            <Image src={product.image || "/shirt1.jpg"} alt={product.name} fill className="object-cover rounded" />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            {/* Rating */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
              ))}
              <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-gray-800 mb-4">${product.price.toFixed(2)}</p>

            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center mb-4">
              <label className="mr-3">Quantity:</label>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2">-</button>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center border mx-2"
              />
              <button onClick={() => setQuantity(quantity + 1)} className="px-2">+</button>
            </div>

            {/* Add to Cart Button */}
            <Button onClick={handleAddToCart} className="w-full flex gap-2 items-center">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
