"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Star, Wifi, Car, Coffee, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"

interface HotelGridProps {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  priceRange: string
  rating: string
}

// Mock hotel data
const mockHotels = [
  {
    id: "hotel1",
    name: "Grand Hyatt Dubai",
    image: "/placeholder.svg?height=300&width=500",
    price: 220,
    originalPrice: 280,
    location: "Dubai Creek, Dubai",
    rating: 5,
    reviews: 1245,
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym", "Airport Shuttle"],
    distanceFromCenter: 2.5,
    description: "Luxury hotel with stunning views of Dubai Creek.",
  },
  {
    id: "hotel2",
    name: "Atlantis The Palm",
    image: "/placeholder.svg?height=300&width=500",
    price: 450,
    originalPrice: 550,
    location: "Palm Jumeirah, Dubai",
    rating: 5,
    reviews: 3210,
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Beach Access", "Water Park"],
    distanceFromCenter: 11.2,
    description: "Iconic resort located at the apex of Palm Jumeirah.",
  },
  {
    id: "hotel3",
    name: "Rove Downtown Dubai",
    image: "/placeholder.svg?height=300&width=500",
    price: 120,
    originalPrice: 150,
    location: "Downtown Dubai",
    rating: 4,
    reviews: 2156,
    amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    distanceFromCenter: 1.8,
    description: "Modern hotel in the heart of Downtown Dubai.",
  },
  {
    id: "hotel4",
    name: "Emirates Palace",
    image: "/placeholder.svg?height=300&width=500",
    price: 380,
    originalPrice: 450,
    location: "Corniche Road, Abu Dhabi",
    rating: 5,
    reviews: 1876,
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Beach Access", "Butler Service"],
    distanceFromCenter: 3.5,
    description: "Opulent hotel offering the ultimate in luxury.",
  },
  {
    id: "hotel5",
    name: "Premier Inn Dubai Airport",
    image: "/placeholder.svg?height=300&width=500",
    price: 85,
    originalPrice: 110,
    location: "Dubai Airport",
    rating: 3,
    reviews: 1543,
    amenities: ["Free WiFi", "Shuttle", "Restaurant", "Parking"],
    distanceFromCenter: 7.2,
    description: "Convenient hotel near Dubai International Airport.",
  },
  {
    id: "hotel6",
    name: "Sheraton Abu Dhabi",
    image: "/placeholder.svg?height=300&width=500",
    price: 160,
    originalPrice: 200,
    location: "Corniche Road, Abu Dhabi",
    rating: 4,
    reviews: 1324,
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Beach Access"],
    distanceFromCenter: 2.8,
    description: "Beachfront hotel with excellent dining options.",
  },
  {
    id: "hotel7",
    name: "Hilton Sharjah",
    image: "/placeholder.svg?height=300&width=500",
    price: 140,
    originalPrice: 180,
    location: "Corniche Road, Sharjah",
    rating: 4,
    reviews: 987,
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Parking"],
    distanceFromCenter: 1.5,
    description: "Elegant hotel overlooking Sharjah's waterfront.",
  },
  {
    id: "hotel8",
    name: "Burj Al Arab",
    image: "/placeholder.svg?height=300&width=500",
    price: 1200,
    originalPrice: 1500,
    location: "Jumeirah, Dubai",
    rating: 5,
    reviews: 2345,
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Butler Service", "Helipad"],
    distanceFromCenter: 9.7,
    description: "The world's most luxurious hotel with iconic sail-shaped design.",
  },
]

export default function HotelGrid({
  location,
  checkIn,
  checkOut,
  guests,
  priceRange = "all",
  rating = "all",
}: HotelGridProps) {
  const [hotels, setHotels] = useState<typeof mockHotels>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    // Simulate API call to fetch hotels with filters
    const fetchHotels = async () => {
      setLoading(true)

      try {
        // In a real implementation, this would be an API call to one of the hotel APIs
        // const response = await fetch('/api/hotels', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     location,
        //     checkIn,
        //     checkOut,
        //     guests,
        //     priceRange,
        //     rating
        //   })
        // })
        // const data = await response.json()

        // For now, filter the mock data
        setTimeout(() => {
          let filteredHotels = [...mockHotels]

          // Apply location filter
          if (location) {
            filteredHotels = filteredHotels.filter((hotel) =>
              hotel.location.toLowerCase().includes(location.toLowerCase()),
            )
          }

          // Apply price range filter
          if (priceRange !== "all") {
            const [min, max] = priceRange.split("-").map((p) => Number.parseInt(p))
            if (max) {
              filteredHotels = filteredHotels.filter((hotel) => hotel.price >= min && hotel.price <= max)
            } else {
              // Handle cases like "500+"
              filteredHotels = filteredHotels.filter((hotel) => hotel.price >= min)
            }
          }

          // Apply rating filter
          if (rating !== "all") {
            const ratingValue = Number.parseInt(rating)
            filteredHotels = filteredHotels.filter((hotel) => hotel.rating >= ratingValue)
          }

          setHotels(filteredHotels)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching hotels:", error)
        setLoading(false)
      }
    }

    fetchHotels()
  }, [location, checkIn, checkOut, guests, priceRange, rating])

  const handleAddToCart = (hotel: (typeof mockHotels)[0]) => {
    addItem({
      id: hotel.id,
      name: hotel.name,
      price: hotel.price * guests,
      type: "hotel",
      image: hotel.image,
      details: {
        location: hotel.location,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests,
        rating: hotel.rating,
      },
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border animate-pulse">
            <div className="h-48 bg-slate-200" />
            <div className="p-4 space-y-2">
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No hotels found matching your criteria.</p>
        <p className="text-gray-500 mt-2">Try adjusting your search parameters for more results.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel, index) => (
        <motion.div
          key={hotel.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="hotel-card"
        >
          <Card className="h-full flex flex-col overflow-hidden">
            <div className="relative h-48">
              <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
              {hotel.originalPrice > hotel.price && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-600 text-white border-0">
                    {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-red-500 text-red-500" />
                  <span className="font-medium">{hotel.rating}</span>
                  <span className="text-xs text-gray-500">({hotel.reviews})</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 text-red-600/80" />
                <span>{hotel.location}</span>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{hotel.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {hotel.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity === "Free WiFi" ? (
                      <Wifi className="h-3 w-3 mr-1" />
                    ) : amenity === "Parking" ? (
                      <Car className="h-3 w-3 mr-1" />
                    ) : amenity === "Restaurant" ? (
                      <Coffee className="h-3 w-3 mr-1" />
                    ) : null}
                    {amenity}
                  </Badge>
                ))}
                {hotel.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{hotel.amenities.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-end justify-between mt-auto">
                <div>
                  <p className="text-sm text-gray-500">Price per night</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-red-600">{formatCurrency(hotel.price)}</p>
                    {hotel.originalPrice > hotel.price && (
                      <p className="text-sm text-gray-500 line-through">{formatCurrency(hotel.originalPrice)}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" className="border-red-200 hover:bg-red-50 hover:text-red-600" onClick={() => handleAddToCart(hotel)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" asChild>
                  <Link href={`/hotels/${hotel.id}`}>View Details</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
