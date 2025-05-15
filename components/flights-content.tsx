"use client"

import { useSearchParams } from "next/navigation"
import FlightSearch from "@/components/flight-search"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function FlightsContent() {
  const searchParams = useSearchParams();
  
  const origin = searchParams.get('origin') || "Addis Ababa (ADD)";
  const destination = searchParams.get('destination') || "Dubai (DXB)";
  const departDate = searchParams.get('departDate') || "";
  const returnDate = searchParams.get('returnDate') || "";
  const tripType = searchParams.get('tripType') || "roundtrip";
  const passengers = parseInt(searchParams.get('passengers') || "1");

  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Flight Search</h1>
      <p className="text-muted-foreground mb-6">
        Fill in your travel details below, and we'll find the best flight options for you
      </p>

      <FlightSearch
        initialOrigin={origin}
        initialDestination={destination}
        initialDepartDate={departDate}
        initialReturnDate={returnDate}
        initialTripType={tripType}
        initialPassengers={passengers}
      />

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">How Our Flight Booking Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-3">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Search for Flights</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your travel details in the search form above to initiate your request
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-3">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">Share Your Details</h3>
                <p className="text-sm text-muted-foreground">
                  Provide your contact information so we can find and share personalized options
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-3">
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Receive Custom Options</h3>
                <p className="text-sm text-muted-foreground">
                  We'll contact you with tailored flight recommendations within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-12 w-12 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Why book with us?</h3>
                <p className="text-muted-foreground">
                  We specialize in flights between Ethiopia and UAE, offering personalized service, competitive rates, and 
                  exclusive deals not available through online booking engines. Our travel experts will handle all details
                  to ensure a smooth travel experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 