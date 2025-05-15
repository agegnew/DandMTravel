import type { Metadata } from "next"
import VisaFAQ from "@/components/visa-faq"
import VisaUploadForm from "@/components/visa-upload-form"
import { Sparkles, Shield, Clock, FileCheck } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"

export const metadata: Metadata = {
  title: "Visa Services | D&M Travel Agency",
  description: "Apply for UAE visas with our streamlined document upload and processing service.",
}

export default function VisaPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-red-100 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">UAE Visa Services</h1>
            <p className="text-gray-600 text-lg mb-6">
              Fast, reliable visa processing for your travel to the United Arab Emirates
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              {[
                { icon: <Clock className="h-5 w-5 text-red-600" />, text: "Fast Processing" },
                { icon: <Shield className="h-5 w-5 text-red-600" />, text: "Secure & Reliable" },
                { icon: <Sparkles className="h-5 w-5 text-red-600" />, text: "High Success Rate" },
                { icon: <FileCheck className="h-5 w-5 text-red-600" />, text: "Online Application" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm">
                  <div className="p-2 bg-red-50 rounded-full mb-2">
                    {item.icon}
                  </div>
                  <div className="text-sm font-medium">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visa Application Form */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <FadeIn>
                <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold mb-8">Apply for a Visa</h2>
                  <VisaUploadForm />
                </div>
              </FadeIn>
            </div>
            
            {/* FAQ Section */}
            <div className="order-1 lg:order-2">
              <FadeIn>
                <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-8 border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">Visa Information</h2>
                  <div className="space-y-3 mb-8">
                    <p className="text-gray-700">
                      Our visa services make traveling to UAE destinations simple and hassle-free. We handle all the documentation so you can focus on planning your trip.
                    </p>
                    <div className="py-2 px-3 bg-red-50 border-l-4 border-red-600 rounded">
                      <p className="text-sm font-medium text-red-800">All visa applications are processed within 3-5 business days.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <VisaFAQ />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
