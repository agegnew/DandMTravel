"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"

// Mock testimonials data
const testimonials = [
  {
    id: "t1",
    name: "Sarah Johnson",
    location: "Addis Ababa, Ethiopia",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "SkyGate Travel made our family trip to Dubai absolutely seamless. From flight bookings to hotel arrangements and tour packages, everything was perfectly organized. The visa assistance was particularly helpful!",
    service: "Family Vacation Package"
  },
  {
    id: "t2",
    name: "Mohammed Ali",
    location: "Dubai, UAE",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "I've been using SkyGate for my business trips between Dubai and Addis Ababa for over a year now. Their service is consistently excellent, and their team is always responsive to my needs.",
    service: "Business Travel"
  },
  {
    id: "t3",
    name: "Tigist Bekele",
    location: "Bahir Dar, Ethiopia",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "The package tour to Abu Dhabi exceeded my expectations. The itinerary was well-planned, and the guide was knowledgeable. I'll definitely book with SkyGate again for my next vacation.",
    service: "Abu Dhabi City Tour"
  },
  {
    id: "t4",
    name: "Ahmed Hassan",
    location: "Sharjah, UAE",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Their cargo service is reliable and efficient. I regularly ship items between Ethiopia and UAE for my business, and SkyGate has never disappointed me with their timely deliveries.",
    service: "Cargo Services"
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextTestimonial = () => {
    if (isTransitioning) return
    setDirection(1)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setIsTransitioning(false)
    }, 300)
  }

  const prevTestimonial = () => {
    if (isTransitioning) return
    setDirection(-1)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <div className="relative py-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-red-50 rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-50 rounded-full -z-10"></div>
      <div className="absolute top-20 left-10 w-16 h-16 bg-red-100 rounded-full -z-10"></div>
      
      <div className="overflow-hidden py-8">
        <div
          className={`px-6 md:px-10 transition-all duration-300 ${
            isTransitioning
              ? direction > 0
                ? "opacity-0 translate-x-10"
                : "opacity-0 -translate-x-10"
              : "opacity-100 translate-x-0"
          }`}
        >
          <Card className="border border-gray-100 shadow-lg rounded-2xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-7">
                <div className="md:col-span-2 bg-gradient-to-br from-red-50 to-red-100/70 p-8 flex flex-col items-center justify-center text-center">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">{testimonials[currentIndex].name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{testimonials[currentIndex].location}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonials[currentIndex].rating ? "text-red-500 fill-red-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-red-600">{testimonials[currentIndex].service}</p>
                </div>
                
                <div className="md:col-span-5 p-8 md:p-10 flex items-center relative">
                  <Quote className="absolute top-6 left-6 h-10 w-10 text-red-100" />
                  <div className="relative z-10">
                    <p className="text-gray-700 text-lg leading-relaxed">"{testimonials[currentIndex].text}"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
          onClick={prevTestimonial}
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-5 w-5 text-red-600" />
        </Button>

        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-red-600 w-8" 
                  : "bg-gray-300 hover:bg-red-300"
              }`}
              onClick={() => {
                if (isTransitioning) return
                setDirection(index > currentIndex ? 1 : -1)
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsTransitioning(false)
                }, 300)
              }}
              disabled={isTransitioning}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
          onClick={nextTestimonial}
          disabled={isTransitioning}
        >
          <ChevronRight className="h-5 w-5 text-red-600" />
        </Button>
      </div>
    </div>
  )
}
