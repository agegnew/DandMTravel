"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, parse } from "date-fns"
import { Search, Calendar, Users, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FlightSearchProps {
  initialOrigin?: string
  initialDestination?: string
  initialDepartDate?: string
  initialReturnDate?: string
  initialTripType?: string
  initialPassengers?: number
}

export default function FlightSearch({
  initialOrigin = "Addis Ababa (ADD)",
  initialDestination = "Dubai (DXB)",
  initialDepartDate,
  initialReturnDate,
  initialTripType = "roundtrip",
  initialPassengers = 1,
}: FlightSearchProps) {
  const router = useRouter()
  const [origin, setOrigin] = useState(initialOrigin)
  const [destination, setDestination] = useState(initialDestination)
  const [departDate, setDepartDate] = useState<Date | undefined>(
    initialDepartDate ? parse(initialDepartDate, "yyyy-MM-dd", new Date()) : undefined,
  )
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    initialReturnDate ? parse(initialReturnDate, "yyyy-MM-dd", new Date()) : undefined,
  )
  const [tripType, setTripType] = useState(initialTripType)
  const [passengers, setPassengers] = useState(initialPassengers)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query params
    const params = new URLSearchParams()
    params.append("origin", origin)
    params.append("destination", destination)
    params.append("tripType", tripType)

    if (departDate) {
      params.append("departDate", format(departDate, "yyyy-MM-dd"))
    }

    if (returnDate && tripType === "roundtrip") {
      params.append("returnDate", format(returnDate, "yyyy-MM-dd"))
    }

    params.append("passengers", passengers.toString())

    // Navigate to contact form page with search params instead of showing flight results
    router.push(`/flights/contact?${params.toString()}`)
  }

  const swapLocations = () => {
    setOrigin(destination)
    setDestination(origin)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative space-y-2">
              <Label htmlFor="origin">From</Label>
              <Input
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="City or airport"
                className="h-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-7 md:right-[-22px] md:top-1/2 md:transform md:-translate-y-1/2"
                onClick={swapLocations}
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">To</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="City or airport"
                className="h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="depart">Depart</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="depart"
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal",
                      !departDate && "text-muted-foreground",
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {departDate ? format(departDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={departDate} onSelect={setDepartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="return">Return</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="return"
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground",
                    )}
                    disabled={tripType === "oneway"}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                    disabled={(date) => (departDate ? date < departDate : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <div className="flex items-center h-12 border rounded-md px-3">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full h-full bg-transparent focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  checked={tripType === "roundtrip"}
                  onChange={() => setTripType("roundtrip")}
                  className="h-4 w-4 text-red-600"
                />
                <span>Round Trip</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={tripType === "oneway"}
                  onChange={() => setTripType("oneway")}
                  className="h-4 w-4 text-red-600"
                />
                <span>One Way</span>
              </label>
            </div>

            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Search className="mr-2 h-4 w-4" />
              Search Flights
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
