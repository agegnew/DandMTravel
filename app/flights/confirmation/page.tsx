"use client"

import Link from "next/link"
import { CheckCircle, Mail, ArrowRight, Home } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FlightConfirmationPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl">Request Submitted Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your flight inquiry. We have received your request and our team will start processing it right away.
          </p>
          
          <div className="bg-slate-50 rounded-lg p-6 my-6">
            <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
            <ol className="text-left space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-primary h-6 w-6 flex items-center justify-center text-white font-medium">1</div>
                <div>
                  <p className="font-medium">Our team reviews your request</p>
                  <p className="text-sm text-muted-foreground">
                    We'll check availability with airlines and find the best options for your journey
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-primary h-6 w-6 flex items-center justify-center text-white font-medium">2</div>
                <div>
                  <p className="font-medium">You'll receive a personalized quote</p>
                  <p className="text-sm text-muted-foreground">
                    Within 24 hours, we'll email you with available flight options and pricing
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-primary h-6 w-6 flex items-center justify-center text-white font-medium">3</div>
                <div>
                  <p className="font-medium">Confirm and book your journey</p>
                  <p className="text-sm text-muted-foreground">
                    Once you select your preferred option, we'll guide you through the booking process
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-primary">
            <Mail className="h-5 w-5" />
            <p>Check your email for updates on your request</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/flights">
              Search More Flights
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 