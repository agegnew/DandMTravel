"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, parse } from "date-fns"
import { Search, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HotelSearchProps {
  initialLocation?: string
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
}

export default function HotelSearch({
  initialLocation = "",
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 1,
}: HotelSearchProps) {
  const router = useRouter()
  const [location, setLocation] = useState(initialLocation)
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    initialCheckIn ? parse(initialCheckIn, "yyyy-MM-dd", new Date()) : undefined,
  )
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    initialCheckOut ? parse(initialCheckOut, "yyyy-MM-dd", new Date()) : undefined,
  )
  const [guests, setGuests] = useState(initialGuests)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query params
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (checkIn) params.append("checkIn", format(checkIn, "yyyy-MM-dd"))
    if (checkOut) params.append("checkOut", format(checkOut, "yyyy-MM-dd"))
    params.append("guests", guests.toString())

    // Navigate to hotels page with search params
    router.push(`/hotels?${params.toString()}`)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="location">Destination</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or hotel name"
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-in">Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="check-in"
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out">Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="check-out"
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      disabled={(date) => (checkIn ? date < checkIn : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <div className="flex items-center h-12 border rounded-md px-3">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-full bg-transparent focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button type="submit" size="lg" className="px-8">
              <Search className="h-4 w-4 mr-2" />
              Search Hotels
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
