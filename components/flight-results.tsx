"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plane, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"
import HotelRecommendations from "@/components/hotel-recommendations"
import PackageRecommendations from "@/components/package-recommendations"
import { useCurrency } from "@/context/currency-context"

interface FlightResultsProps {
  origin: string
  destination: string
  departDate?: string
  returnDate?: string
  tripType: string
  passengers: number
}

// Mock flight data
const mockFlights = [
  {
    id: "flight1",
    airline: "Ethiopian Airlines",
    airlineCode: "ET",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "ET706",
    origin: "ADD",
    destination: "DXB",
    departureTime: "08:30",
    arrivalTime: "13:45",
    duration: "5h 15m",
    stops: 0,
    price: 450,
    seatsAvailable: 12,
    aircraft: "Boeing 787-9",
    departureDate: "2024-06-15",
    returnDate: "2024-06-22",
    cabinClass: "Economy",
  },
  {
    id: "flight2",
    airline: "Emirates",
    airlineCode: "EK",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "EK724",
    origin: "ADD",
    destination: "DXB",
    departureTime: "14:15",
    arrivalTime: "19:30",
    duration: "5h 15m",
    stops: 0,
    price: 520,
    seatsAvailable: 8,
    aircraft: "Boeing 777-300ER",
    departureDate: "2024-06-15",
    returnDate: "2024-06-22",
    cabinClass: "Economy",
  },
  {
    id: "flight3",
    airline: "Etihad Airways",
    airlineCode: "EY",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "EY851",
    origin: "ADD",
    destination: "AUH",
    departureTime: "21:45",
    arrivalTime: "02:55",
    duration: "5h 10m",
    stops: 0,
    price: 480,
    seatsAvailable: 15,
    aircraft: "Boeing 787-9",
    departureDate: "2024-06-15",
    returnDate: "2024-06-22",
    cabinClass: "Economy",
  },
  {
    id: "flight4",
    airline: "flydubai",
    airlineCode: "FZ",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "FZ692",
    origin: "ADD",
    destination: "DXB",
    departureTime: "16:30",
    arrivalTime: "21:45",
    duration: "5h 15m",
    stops: 0,
    price: 410,
    seatsAvailable: 6,
    aircraft: "Boeing 737-800",
    departureDate: "2024-06-15",
    returnDate: "2024-06-22",
    cabinClass: "Economy",
  },
  {
    id: "flight5",
    airline: "Ethiopian Airlines",
    airlineCode: "ET",
    airlineLogo: "/placeholder.svg?height=40&width=40",
    flightNumber: "ET612",
    origin: "ADD",
    destination: "SHJ",
    departureTime: "10:15",
    arrivalTime: "15:30",
    duration: "5h 15m",
    stops: 0,
    price: 435,
    seatsAvailable: 10,
    aircraft: "Airbus A350-900",
    departureDate: "2024-06-15",
    returnDate: "2024-06-22",
    cabinClass: "Economy",
  },
]

export default function FlightResults({
  origin,
  destination,
  departDate,
  returnDate,
  tripType,
  passengers,
}: FlightResultsProps) {
  const [flights, setFlights] = useState<typeof mockFlights>([])
  const [loading, setLoading] = useState(true)
  const [selectedFlight, setSelectedFlight] = useState<(typeof mockFlights)[0] | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()
  const { currency } = useCurrency()

  useEffect(() => {
    // Call Amadeus Flight Offer Search API via our API route
    const fetchFlights = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/flights/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            origin,
            destination,
            departDate,
            returnDate,
            tripType,
            passengers,
            currency
          })
        })
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch flights');
        }
        
        const data = await response.json();
        
        // If we get flights data, use it
        if (data.flights && data.flights.length > 0) {
          setFlights(data.flights);
        } else {
          // If no flights found, fallback to mock data for demo purposes
          console.log('No flights found, using mock data');
          setFlights(mockFlights);
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError('Failed to load flight data. Please try again later.');
        // Fallback to mock data for demonstration
        setFlights(mockFlights);
      } finally {
        setLoading(false);
      }
    }

    if (origin && destination && departDate) {
      fetchFlights();
    } else {
      setFlights(mockFlights);
      setLoading(false);
    }
  }, [origin, destination, departDate, returnDate, tripType, passengers, currency])

  const handleSelectFlight = (flight: (typeof mockFlights)[0]) => {
    setSelectedFlight(flight)
    setSidebarOpen(true)
  }

  const handleAddToCart = (flight: (typeof mockFlights)[0]) => {
    addItem({
      id: flight.id,
      name: `${flight.airline} (${flight.flightNumber})`,
      price: flight.price * passengers,
      type: "flight",
      image: flight.airlineLogo,
      details: {
        origin: flight.origin,
        destination: flight.destination,
        departureDate: flight.departureDate,
        returnDate: flight.returnDate,
        passengers,
        flightNumber: flight.flightNumber,
      },
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-2xl p-4 space-y-4 animate-pulse">
            <div className="flex justify-between">
              <div className="h-8 w-40 bg-slate-200 rounded"></div>
              <div className="h-8 w-24 bg-slate-200 rounded"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-slate-200 rounded"></div>
              <div className="h-4 w-20 bg-slate-200 rounded"></div>
              <div className="h-6 w-32 bg-slate-200 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-6 w-24 bg-slate-200 rounded"></div>
              <div className="h-10 w-28 bg-slate-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-600">{error}</p>
        <p className="text-gray-500 mt-2">Please check your connection and try again.</p>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No flights found for your search criteria.</p>
        <p className="text-gray-500 mt-2">Try adjusting your search parameters.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-4">
        {flights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="flight-card overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border">
                      <Image
                        src={flight.airlineLogo || "/airlines/default.svg"}
                        alt={flight.airline}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          // If image fails to load, fall back to default airline logo
                          const target = e.target as HTMLImageElement;
                          target.src = "/airlines/default.svg";
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{flight.airline}</p>
                      <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between md:px-6">
                    <div className="text-center">
                      <p className="text-lg font-semibold">{flight.departureTime}</p>
                      <p className="text-sm text-gray-500">{flight.origin}</p>
                    </div>

                    <div className="flex flex-col items-center my-2 md:my-0">
                      <p className="text-xs text-gray-500 mb-1">{flight.duration}</p>
                      <div className="relative w-32 md:w-40">
                        <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                          <Plane className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold">{flight.arrivalTime}</p>
                      <p className="text-sm text-gray-500">{flight.destination}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-2xl font-bold text-primary">{formatCurrency(flight.price, currency)}</p>
                    <p className="text-sm text-gray-500 mb-3">per person</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleSelectFlight(flight)}>
                        Details
                      </Button>
                      <Button size="sm" onClick={() => handleAddToCart(flight)}>
                        Select
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 px-4 py-2 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white">
                      {flight.cabinClass}
                    </Badge>
                    <span className="text-gray-500">{flight.seatsAvailable} seats left</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Info className="h-3.5 w-3.5" />
                    <span>{flight.aircraft}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Flight Details</SheetTitle>
            <SheetDescription>
              {selectedFlight?.airline} ({selectedFlight?.flightNumber})
            </SheetDescription>
          </SheetHeader>

          {selectedFlight && (
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border">
                    <Image
                      src={selectedFlight.airlineLogo || "/airlines/default.svg"}
                      alt={selectedFlight.airline}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // If image fails to load, fall back to default airline logo
                        const target = e.target as HTMLImageElement;
                        target.src = "/airlines/default.svg";
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{selectedFlight.airline}</p>
                    <p className="text-sm text-gray-500">{selectedFlight.flightNumber}</p>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">{selectedFlight.departureTime}</p>
                        <p className="text-sm text-gray-500">{selectedFlight.departureDate}</p>
                        <p className="font-medium mt-1">{selectedFlight.origin}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">{selectedFlight.duration}</p>
                        <div className="relative w-20 my-1">
                          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-300"></div>
                          <ArrowRight className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                        <p className="text-xs text-gray-500">
                          {selectedFlight.stops === 0
                            ? "Direct"
                            : `${selectedFlight.stops} stop${selectedFlight.stops > 1 ? "s" : ""}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{selectedFlight.arrivalTime}</p>
                        <p className="text-sm text-gray-500">{selectedFlight.departureDate}</p>
                        <p className="font-medium mt-1">{selectedFlight.destination}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-dashed flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">Aircraft</p>
                        <p className="font-medium">{selectedFlight.aircraft}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Cabin</p>
                        <p className="font-medium">{selectedFlight.cabinClass}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium">{selectedFlight.duration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Price per person</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(selectedFlight.price, currency)}</p>
                  </div>
                  <Button onClick={() => handleAddToCart(selectedFlight)}>Add to Cart</Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Tabs defaultValue="hotels">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="hotels">Hotel Recommendations</TabsTrigger>
                    <TabsTrigger value="packages">Package Deals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hotels" className="mt-4">
                    <HotelRecommendations
                      origin={selectedFlight.origin}
                      destination={selectedFlight.destination}
                      checkInDate={selectedFlight.departureDate}
                      checkOutDate={selectedFlight.returnDate}
                    />
                  </TabsContent>
                  <TabsContent value="packages" className="mt-4">
                    <PackageRecommendations flightId={selectedFlight.id} destination={selectedFlight.destination} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
