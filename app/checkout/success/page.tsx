"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart after successful payment
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <div className="container py-12 max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your booking</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Your booking has been confirmed. You will receive a confirmation email shortly.</p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
            <p className="font-medium">{sessionId ? sessionId.substring(0, 8).toUpperCase() : "SKG-12345"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/dashboard">View My Bookings</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container py-12 max-w-md mx-auto">Loading checkout confirmation...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
