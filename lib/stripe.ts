import { type Stripe, loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// This would be used in server-side code
export async function createCheckoutSession(items: any[]) {
  // This would be an API call to your server endpoint
  const response = await fetch("/api/checkout/create-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  })

  const { sessionId } = await response.json()
  return sessionId
}

// Helper function to format line items for Stripe
export function formatLineItems(items: any[]) {
  return items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.image],
        metadata: {
          id: item.id,
          type: item.type,
        },
      },
      unit_amount: item.price * 100, // Stripe expects amounts in cents
    },
    quantity: 1,
  }))
}
