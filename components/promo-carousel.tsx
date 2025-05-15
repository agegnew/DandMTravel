"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Plane, Clock, Tag, CircleUser, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"

// Enhanced promo data with more appealing images
const promoDeals = [
  {
    id: "promo1",
    title: "Weekend Getaway to Dubai",
    description: "Escape to Dubai for a luxurious weekend. Includes flight and 3-night hotel stay.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-gradient-to-br from-blue-50 to-white",
    accentColor: "bg-red-600",
    textColor: "text-gray-800",
    borderColor: "border-blue-100",
    highlightColor: "bg-blue-50",
    price: 599,
    oldPrice: 799,
    departureDate: "2024-06-15",
    returnDate: "2024-06-18",
    origin: "ADD",
    destination: "DXB",
    type: "package" as const,
    label: "Best Seller",
    features: ["Luxury Hotel", "City Tour", "Airport Transfer"],
  },
  {
    id: "promo2",
    title: "Business Class to Abu Dhabi",
    description: "Fly in comfort with our special business class fares to Abu Dhabi.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-gradient-to-br from-indigo-50 to-white",
    accentColor: "bg-red-600",
    textColor: "text-gray-800",
    borderColor: "border-indigo-100",
    highlightColor: "bg-indigo-50",
    price: 899,
    oldPrice: 1299,
    departureDate: "2024-07-10",
    returnDate: "2024-07-17",
    origin: "ADD",
    destination: "AUH",
    type: "flight" as const,
    label: "Limited Offer",
    features: ["Priority Boarding", "Lounge Access", "Extra Baggage"],
  },
  {
    id: "promo3",
    title: "Family Holiday Package",
    description: "All-inclusive family package with activities and meals in Dubai.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-gradient-to-br from-purple-50 to-white",
    accentColor: "bg-red-600",
    textColor: "text-gray-800",
    borderColor: "border-purple-100",
    highlightColor: "bg-purple-50",
    price: 1299,
    oldPrice: 1599,
    departureDate: "2024-08-05",
    returnDate: "2024-08-12",
    origin: "ADD",
    destination: "DXB",
    type: "package" as const,
    label: "Family Deal",
    features: ["Kids Activities", "All Meals", "Theme Park Tickets"],
  },
  {
    id: "promo4",
    title: "Sharjah Cultural Experience",
    description: "Explore the rich cultural heritage of Sharjah with this special tour package.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-gradient-to-br from-teal-50 to-white",
    accentColor: "bg-red-600",
    textColor: "text-gray-800",
    borderColor: "border-teal-100",
    highlightColor: "bg-teal-50",
    price: 749,
    oldPrice: 899,
    departureDate: "2024-09-20",
    returnDate: "2024-09-25",
    origin: "ADD",
    destination: "SHJ",
    type: "package" as const,
    label: "Cultural Tour",
    features: ["Museum Visits", "Heritage Tour", "Local Cuisine"],
  },
]

export default function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const [touchStartX, setTouchStartX] = useState(0)

  // Handle carousel navigation
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const goToNextSlide = () => {
    if (!isTransitioning) {
      const nextIndex = (currentIndex + 1) % promoDeals.length
      goToSlide(nextIndex)
    }
  }

  const goToPrevSlide = () => {
    if (!isTransitioning) {
      const prevIndex = (currentIndex - 1 + promoDeals.length) % promoDeals.length
      goToSlide(prevIndex)
    }
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide()
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [currentIndex, isTransitioning])

  // Handle touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    // Minimum swipe distance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next slide
        goToNextSlide()
      } else {
        // Swipe right - previous slide
        goToPrevSlide()
      }
    }
  }

  const handleAddToCart = (deal: (typeof promoDeals)[0]) => {
    addItem({
      id: deal.id,
      name: deal.title,
      price: deal.price,
      type: deal.type,
      image: deal.image,
      details: {
        origin: deal.origin,
        destination: deal.destination,
        departureDate: deal.departureDate,
        returnDate: deal.returnDate,
      },
    })
  }

  // Calculate discount percentage
  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100)
  }

  // Format date in a nice way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <div className="relative">
      {/* Main carousel container */}
      <div 
        className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Current Slide */}
        <div 
          ref={trackRef}
          className="transition-all duration-700 ease-in-out"
          style={{ height: "600px" }}
        >
          <div className={`absolute inset-0 ${promoDeals[currentIndex].color} overflow-hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Deal Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="px-3 py-1 rounded-full bg-red-600 text-white text-sm font-medium">
                      {promoDeals[currentIndex].label}
                    </div>
                    <div className="text-xs bg-white px-2 py-1 rounded-full text-red-600 border border-red-100">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        Save {calculateDiscount(promoDeals[currentIndex].oldPrice, promoDeals[currentIndex].price)}%
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    {promoDeals[currentIndex].title}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    {promoDeals[currentIndex].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Plane className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Route</p>
                        <p className="font-medium">{promoDeals[currentIndex].origin} → {promoDeals[currentIndex].destination}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Travel Period</p>
                        <p className="font-medium text-sm">{formatDate(promoDeals[currentIndex].departureDate)} - {formatDate(promoDeals[currentIndex].returnDate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="mb-8">
                    <div className="text-sm font-medium mb-2 text-gray-700">Included in this offer:</div>
                    <ul className="grid grid-cols-1 gap-2">
                      {promoDeals[currentIndex].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="h-4 w-4 rounded-full bg-red-100 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-red-600"></div>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price and action buttons */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatCurrency(promoDeals[currentIndex].price)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 line-through text-sm">
                        {formatCurrency(promoDeals[currentIndex].oldPrice)}
                      </span>
                      <span className="text-xs text-red-600 font-medium">
                        per person
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white px-5 shadow-md"
                      onClick={() => handleAddToCart(promoDeals[currentIndex])}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" asChild className="border-red-200 text-red-600 hover:bg-red-50">
                      <Link
                        href={
                          promoDeals[currentIndex].type === "flight" 
                            ? "/flights" 
                            : "/packages"
                        }
                      >
                        Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Visual side with image and decorative elements */}
              <div className="hidden md:block relative">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/30"></div>
                  <Image
                    src={promoDeals[currentIndex].image}
                    alt={promoDeals[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="relative h-full flex flex-col items-center justify-center">
                  <div className="absolute top-8 right-8 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${promoDeals[currentIndex].type === 'package' ? 'bg-indigo-600' : 'bg-red-600'} text-white border-0 hover:bg-opacity-90 hover:text-white`}>
                        {promoDeals[currentIndex].type === 'package' ? 'Package Deal' : 'Flight Deal'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={goToPrevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center border border-gray-100 opacity-80 hover:opacity-100 transition-opacity z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center border border-gray-100 opacity-80 hover:opacity-100 transition-opacity z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
      
      {/* Carousel Controls - Dots */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md border border-gray-100">
        {promoDeals.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`
              transition-all duration-300 ease-out rounded-full
              ${index === currentIndex 
                ? `h-3 w-3 bg-red-600` 
                : 'h-2 w-2 bg-gray-300 hover:bg-gray-400'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
