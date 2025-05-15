import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

// This is your Stripe webhook secret for testing your endpoint locally
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const payload = await request.text()
  const sig = request.headers.get("stripe-signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // Fulfill the order
    await fulfillOrder(session)
  }

  return NextResponse.json({ received: true })
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  // TODO: In a real implementation, this would update your database
  // For example, mark the booking as paid in Supabase

  console.log(`Order fulfilled: ${session.id}`)

  // Example of what you might do:
  // const { data, error } = await supabaseClient
  //   .from('bookings')
  //   .update({ paid: true, payment_id: session.id })
  //   .eq('order_id', session.metadata.order_id);

  // if (error) {
  //   console.error('Error updating booking:', error);
  //   throw new Error('Failed to update booking status');
  // }

  // You might also want to send a confirmation email to the customer
}
