import type { Metadata } from "next"
import CargoQuoteForm from "@/components/cargo-quote-form"
import CargoServices from "@/components/cargo-services"
import { FadeIn } from "@/components/animations/fade-in"
import { Package, BarChart3, Plane, TruckIcon, Clock, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Air Cargo Services | D&M Travel Agency",
  description: "Get quotes for air cargo shipping between Ethiopia and UAE. Fast, reliable, and secure cargo services.",
}

export default function CargoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-red-600/10 rounded-full mb-4">
              <Plane className="h-5 w-5 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Air Cargo Services</h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Fast and reliable air cargo shipping between Ethiopia and UAE with competitive rates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Quote Form Section */}
            <div className="lg:col-span-7 order-1">
              <div className="sticky top-24">
                <CargoQuoteForm />
              </div>
            </div>
            
            {/* Service Information Section */}
            <div className="lg:col-span-5 order-2">
              <CargoServices />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-bold mb-3">Our Cargo Features</h2>
            <p className="text-gray-600">Everything you need for reliable cargo shipping</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Clock className="h-5 w-5 text-red-600" />, text: "Express Delivery" },
              { icon: <Shield className="h-5 w-5 text-red-600" />, text: "Secure Handling" },
              { icon: <Plane className="h-5 w-5 text-red-600" />, text: "Regular Flights" },
              { icon: <BarChart3 className="h-5 w-5 text-red-600" />, text: "Competitive Rates" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="p-3 bg-red-600/10 rounded-full">
                  {item.icon}
                </div>
                <div className="font-medium">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Process Section */}
      <section className="py-10 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-bold mb-3">How It Works</h2>
            <p className="text-gray-600">Our simple four-step shipping process</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Request Quote",
                description: "Fill out our form for an instant quote",
              },
              {
                step: "2",
                title: "Book Service",
                description: "Confirm your booking and schedule pickup",
              },
              {
                step: "3",
                title: "Prepare Shipment",
                description: "We'll help with packaging and customs",
              },
              {
                step: "4",
                title: "Track & Receive",
                description: "Track your shipment in real-time",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Connector line between steps */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-red-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
