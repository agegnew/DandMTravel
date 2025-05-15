"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Users, Star, Search, Filter, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { FadeIn, FadeInStagger } from "@/components/animations/fade-in"

// Mock package data
const mockPackages = [
  {
    id: "pkg1",
    name: "Dubai Family Adventure",
    image: "/placeholder.svg?height=300&width=500",
    price: 899,
    duration: "5 days",
    location: "Dubai, UAE",
    rating: 4.8,
    category: "family",
    highlights: ["Burj Khalifa", "Desert Safari", "Aquaventure Waterpark"],
    description: "Perfect family getaway with activities for all ages in the heart of Dubai.",
  },
  {
    id: "pkg2",
    name: "Abu Dhabi Luxury Escape",
    image: "/placeholder.svg?height=300&width=500",
    price: 1299,
    duration: "4 days",
    location: "Abu Dhabi, UAE",
    rating: 4.9,
    category: "luxury",
    highlights: ["Emirates Palace", "Sheikh Zayed Mosque", "Yas Island"],
    description: "Indulge in the finest luxury experiences Abu Dhabi has to offer.",
  },
  {
    id: "pkg3",
    name: "Desert Adventure Safari",
    image: "/placeholder.svg?height=300&width=500",
    price: 649,
    duration: "3 days",
    location: "Dubai, UAE",
    rating: 4.7,
    category: "adventure",
    highlights: ["Dune Bashing", "Camel Riding", "Bedouin Camp"],
    description: "Experience the thrill of the desert with this action-packed adventure package.",
  },
  {
    id: "pkg4",
    name: "Romantic Dubai Getaway",
    image: "/placeholder.svg?height=300&width=500",
    price: 1199,
    duration: "6 days",
    location: "Dubai, UAE",
    rating: 4.9,
    category: "honeymoon",
    highlights: ["Private Beach Dinner", "Yacht Cruise", "Couples Spa"],
    description: "Create unforgettable memories with your loved one in the romantic settings of Dubai.",
  },
  {
    id: "pkg5",
    name: "Sharjah Cultural Tour",
    image: "/placeholder.svg?height=300&width=500",
    price: 549,
    duration: "3 days",
    location: "Sharjah, UAE",
    rating: 4.6,
    category: "cultural",
    highlights: ["Sharjah Museum", "Heritage Area", "Art Galleries"],
    description: "Immerse yourself in the rich cultural heritage of Sharjah.",
  },
  {
    id: "pkg6",
    name: "Ethiopian Highlands Adventure",
    image: "/placeholder.svg?height=300&width=500",
    price: 1299,
    duration: "8 days",
    location: "Simien Mountains, Ethiopia",
    rating: 4.7,
    category: "adventure",
    highlights: ["Trekking", "Wildlife Viewing", "Local Villages"],
    description: "Explore the breathtaking landscapes of the Ethiopian highlands.",
  },
]

const categories = [
  { value: "all", label: "All Packages" },
  { value: "family", label: "Family" },
  { value: "luxury", label: "Luxury" },
  { value: "adventure", label: "Adventure" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "cultural", label: "Cultural" },
]

export default function PackagesContent() {
  const { addItem } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredPackages, setFilteredPackages] = useState(mockPackages)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter packages based on search term and category
    const filtered = mockPackages.filter((pkg) => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPackages(filtered);
  }, [searchTerm, selectedCategory]);

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
    <div className="container py-8 md:py-12">
      <FadeIn direction="up">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Explore Travel Packages</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover handcrafted travel experiences tailored to your preferences. 
            From family adventures to romantic getaways, find the perfect package for your journey.
          </p>
        </div>
      </FadeIn>

      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl mb-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative">
            <Input
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex overflow-x-auto md:justify-center space-x-2 py-1 md:col-span-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category.value
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
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
      ) : (
        <>
          {filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-50 mb-4">
                <Search className="h-10 w-10 text-red-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No packages found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={() => {setSearchTerm(''); setSelectedCategory('all');}} className="bg-red-600 hover:bg-red-700">
                Clear Filters
              </Button>
            </div>
          ) : (
            <FadeInStagger staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                  <FadeIn key={pkg.id} direction="up">
                    <Card className="overflow-hidden h-full flex flex-col package-card bg-white border-none shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
                      <div className="relative h-60 overflow-hidden">
                        <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-red-600/90 backdrop-blur-sm text-white px-2.5 py-1">
                            {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                          </Badge>
                          {pkg.rating >= 4.8 && (
                            <Badge className="bg-amber-500/90 backdrop-blur-sm text-white px-2.5 py-1">
                              Top Rated
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-amber-500 rounded-full px-2 py-1">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          <span className="text-xs font-medium">{pkg.rating}</span>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-grow">
                        <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                          <MapPin className="h-4 w-4 text-red-600" />
                          <span>{pkg.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-600">{pkg.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-600">2-4 people</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Package Highlights:</div>
                          <ul className="space-y-1">
                            {pkg.highlights.slice(0, 3).map((highlight) => (
                              <li key={highlight} className="flex items-start gap-1.5 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-6 pt-0 border-t border-gray-100">
                        <div className="flex flex-col w-full gap-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500">Price per person</p>
                              <p className="text-2xl font-bold text-red-600">${pkg.price}</p>
                            </div>
                            <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-red-50 hover:text-red-600 border-red-100">
                              <Link href={`/packages/${pkg.id}`} className="flex items-center gap-1">
                                View Details
                                <ArrowRight className="h-3.5 w-3.5 ml-1" />
                              </Link>
                            </Button>
                          </div>
                          <Button onClick={() => handleAddToCart(pkg)} className="w-full bg-red-600 hover:bg-red-700">
                            Add to Cart
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </FadeInStagger>
          )}
        </>
      )}
    </div>
  )
} 