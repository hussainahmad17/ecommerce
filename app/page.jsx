"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import Navbar from "@/components/Navbar"
import { products } from "@/lib/products"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Get 6 random products for the featured section
    const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 6)
    setFeaturedProducts(randomProducts)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Shop the Latest</span>
              <span className="block text-indigo-600">Products</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover our curated collection of high-quality products at competitive prices.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="#products"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Electronics</h3>
              <p className="mt-2 text-sm text-gray-500">Shop the latest gadgets and tech accessories.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Clothing</h3>
              <p className="mt-2 text-sm text-gray-500">Discover trendy fashion for all seasons.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Home & Kitchen</h3>
              <p className="mt-2 text-sm text-gray-500">Upgrade your living space with stylish essentials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
