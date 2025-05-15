"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getStripe, createCheckoutSession } from "@/lib/stripe"
import { useCart } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const { currency } = useCurrency()
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // Redirect to home if cart is empty
    if (items.length === 0) {
      router.push("/")
    }
  }, [items, router])

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would create a Stripe checkout session
      // and redirect to Stripe Checkout
      const sessionId = await createCheckoutSession(items)
      const stripe = await getStripe()

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        })

        if (error) {
          console.error("Error redirecting to checkout:", error)
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your items before payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>
                      {item.details && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.type === "flight" && (
                            <p>
                              {item.details.origin} → {item.details.destination}
                              {item.details.departureDate && ` | ${item.details.departureDate}`}
                            </p>
                          )}
                          {item.type === "hotel" && (
                            <p>
                              {item.details.location}
                              {item.details.checkInDate && ` | ${item.details.checkInDate}`}
                            </p>
                          )}
                          {item.type === "package" && (
                            <p>
                              {item.details.location} | {item.details.duration}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="font-medium">{formatCurrency(item.price, currency)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(getTotal(), currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span>{formatCurrency(getTotal() * 0.1, currency)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(getTotal() * 1.1, currency)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
