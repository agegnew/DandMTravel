"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import FlightContactForm from "@/components/flight-contact-form"

function FlightContactContent() {
  const searchParams = useSearchParams()
  
  const origin = searchParams.get('origin') || "Addis Ababa (ADD)"
  const destination = searchParams.get('destination') || "Dubai (DXB)"
  const departDate = searchParams.get('departDate') || ""
  const returnDate = searchParams.get('returnDate') || ""
  const tripType = searchParams.get('tripType') || "roundtrip"
  const passengers = parseInt(searchParams.get('passengers') || "1")

  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Complete Your Flight Request</h1>
      <p className="text-muted-foreground mb-6">
        Please provide your contact details so we can find the best flight options for you
      </p>
      
      <FlightContactForm
        origin={origin}
        destination={destination}
        departDate={departDate}
        returnDate={returnDate}
        tripType={tripType}
        passengers={passengers}
      />
    </div>
  )
}

export default function FlightContactPage() {
  return (
    <Suspense fallback={<div className="container py-8">Loading flight details...</div>}>
      <FlightContactContent />
    </Suspense>
  )
} 