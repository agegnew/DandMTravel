"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn, FadeInStagger } from "@/components/animations/fade-in"
import { MapPin, ArrowRight, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock destinations data
const destinations = [
  {
    id: "dest1",
    name: "Dubai",
    country: "United Arab Emirates",
    image: "/placeholder.svg?height=300&width=500",
    description: "Experience the luxury and modernity of Dubai with its iconic skyscrapers and vibrant culture.",
    flightPrice: 450,
    popularSeason: "Oct-Apr",
    duration: "3-7 days"
  },
  {
    id: "dest2",
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    image: "/placeholder.svg?height=300&width=500",
    description: "Discover the perfect blend of tradition and innovation in the UAE's capital city.",
    flightPrice: 480,
    popularSeason: "Nov-Mar",
    duration: "4-6 days"
  },
  {
    id: "dest3",
    name: "Sharjah",
    country: "United Arab Emirates",
    image: "/placeholder.svg?height=300&width=500",
    description: "Explore the cultural heart of the UAE with its museums, heritage sites, and art galleries.",
    flightPrice: 435,
    popularSeason: "Oct-Mar",
    duration: "3-5 days"
  },
  {
    id: "dest4",
    name: "Addis Ababa",
    country: "Ethiopia",
    image: "/placeholder.svg?height=300&width=500",
    description: "Visit Ethiopia's capital, a vibrant city with rich history and diverse cultural attractions.",
    flightPrice: 380,
    popularSeason: "Sep-May",
    duration: "5-7 days"
  },
  {
    id: "dest5",
    name: "Lalibela",
    country: "Ethiopia",
    image: "/placeholder.svg?height=300&width=500",
    description: "Marvel at the rock-hewn churches, a UNESCO World Heritage site and spiritual center.",
    flightPrice: 520,
    popularSeason: "Oct-Jan",
    duration: "3-4 days"
  },
  {
    id: "dest6",
    name: "Axum",
    country: "Ethiopia",
    image: "/placeholder.svg?height=300&width=500",
    description: "Step back in time in this ancient city, home to the legendary Ark of the Covenant.",
    flightPrice: 490,
    popularSeason: "Oct-Mar",
    duration: "2-4 days"
  },
]

export default function FeaturedDestinations() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden animate-pulse shadow-lg">
            <div className="h-56 bg-slate-200" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FadeInStagger>
        {destinations.map((destination) => (
          <FadeIn key={destination.id} direction="up">
            <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl package-card border-0">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-white/80 text-red-600 hover:bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium border-0">
                    Best Time: {destination.popularSeason}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60"></div>
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="mb-3">
                  <h3 className="font-bold text-xl">{destination.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span>{destination.country}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-5 flex-grow">{destination.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-gray-600">{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-gray-600">2+ people</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Flights from</p>
                    <p className="font-bold text-xl text-red-600">${destination.flightPrice}</p>
                  </div>
                  <Button asChild variant="default" className="rounded-full px-5 h-10 btn-animated bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 shadow-md shadow-red-600/10">
                    <Link href={`/flights?destination=${destination.name}`} className="flex items-center gap-1">
                      Explore
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </FadeInStagger>
    </div>
  )
}
