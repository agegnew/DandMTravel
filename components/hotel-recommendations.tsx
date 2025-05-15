"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"

interface HotelRecommendationsProps {
  origin: string
  destination: string
  checkInDate: string
  checkOutDate: string
}

// Mock hotel data
const mockHotels = [
  {
    id: "hotel1",
    name: "Grand Hyatt Dubai",
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
    location: "Dubai Creek",
    distanceFromAirport: 2.5,
    price: 120,
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
    description: "Luxury hotel with stunning views of Dubai Creek.",
  },
  {
    id: "hotel2",
    name: "Rove Downtown Dubai",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4,
    location: "Downtown Dubai",
    distanceFromAirport: 3.2,
    price: 85,
    amenities: ["Free WiFi", "Pool", "Gym", "Restaurant"],
    description: "Modern hotel in the heart of Downtown Dubai.",
  },
  {
    id: "hotel3",
    name: "Premier Inn Dubai Airport",
    image: "/placeholder.svg?height=200&width=300",
    rating: 3,
    location: "Dubai Airport",
    distanceFromAirport: 0.8,
    price: 65,
    amenities: ["Free WiFi", "Shuttle", "Restaurant"],
    description: "Convenient hotel near Dubai International Airport.",
  },
]

export default function HotelRecommendations({
  origin,
  destination,
  checkInDate,
  checkOutDate,
}: HotelRecommendationsProps) {
  const [hotels, setHotels] = useState<typeof mockHotels>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    // Simulate API call to get hotel recommendations
    const getHotelSuggestions = async () => {
      setLoading(true)

      try {
        // In a real implementation, this would be an API call
        // const response = await fetch('/api/hotels/recommendations', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     origin,
        //     destination,
        //     checkInDate,
        //     checkOutDate
        //   })
        // })
        // const data = await response.json()

        // For now, use mock data
        setTimeout(() => {
          // Filter hotels that are less than $150 and within 3km of airport
          const filteredHotels = mockHotels
            .filter((hotel) => hotel.price < 150 && hotel.distanceFromAirport <= 3)
            .slice(0, 3)

          setHotels(filteredHotels)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching hotel recommendations:", error)
        setLoading(false)
      }
    }

    getHotelSuggestions()
  }, [origin, destination, checkInDate, checkOutDate])

  const handleAddToCart = (hotel: (typeof mockHotels)[0]) => {
    addItem({
      id: hotel.id,
      name: hotel.name,
      price: hotel.price,
      type: "hotel",
      image: hotel.image,
      details: {
        location: hotel.location,
        checkInDate,
        checkOutDate,
        rating: hotel.rating,
      },
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No hotel recommendations available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Top 3 hotels near your destination:</p>

      {hotels.map((hotel) => (
        <Card key={hotel.id} className="hotel-card overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-[100px_1fr] gap-3">
              <div className="relative h-full">
                <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
              </div>

              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{hotel.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < hotel.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-bold text-primary">
                    {formatCurrency(hotel.price)}
                    <span className="text-xs font-normal text-gray-500">/night</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{hotel.distanceFromAirport} km from airport</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-1">
                    {hotel.amenities.slice(0, 2).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleAddToCart(hotel)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
