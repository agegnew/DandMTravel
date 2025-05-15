"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"

interface PackageRecommendationsProps {
  flightId: string
  destination: string
}

// Mock package data - simplified to always show these two packages
const mockPackages = [
  {
    id: "package1",
    name: "Dubai City Explorer",
    image: "/placeholder.svg?height=200&width=300",
    duration: "3 days",
    highlights: ["Burj Khalifa", "Dubai Mall", "Desert Safari"],
    price: 299,
    location: "Dubai, UAE",
  },
  {
    id: "package2",
    name: "Abu Dhabi Highlights",
    image: "/placeholder.svg?height=200&width=300",
    duration: "2 days",
    highlights: ["Sheikh Zayed Mosque", "Ferrari World", "Corniche"],
    price: 249,
    location: "Abu Dhabi, UAE",
  },
]

export default function PackageRecommendations({ flightId, destination }: PackageRecommendationsProps) {
  const { addItem } = useCart()

  const handleAddToCart = (pkg: typeof mockPackages[0]) => {
    addItem({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      type: "package",
      image: pkg.image,
      details: {
        location: pkg.location,
        duration: pkg.duration,
        highlights: pkg.highlights.join(", "),
      },
    })
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Recommended packages for your trip:</p>

      {mockPackages.map((pkg) => (
        <Card key={pkg.id} className="hotel-card overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-[100px_1fr] gap-3">
              <div className="relative h-full">
                <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
              </div>

              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{pkg.name}</h4>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                  <p className="font-bold text-primary">{formatCurrency(pkg.price)}</p>
                </div>

                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{pkg.location}</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-1">
                    {pkg.highlights.slice(0, 2).map((highlight) => (
                      <Badge key={highlight} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {pkg.highlights.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{pkg.highlights.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleAddToCart(pkg)}>
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
