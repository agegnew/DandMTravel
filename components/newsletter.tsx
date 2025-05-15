"use client"

import type React from "react"

import { useState } from "react"
import { Send, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { FadeIn } from "@/components/animations/fade-in"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-95 -z-10"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3 text-white">
              <FadeIn direction="up" className="w-full">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/20 mb-6">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Stay Up to Date with <br className="hidden md:block" />Travel Deals & Tips</h2>
                <p className="text-white/90 text-lg mb-6 max-w-lg">
                  Subscribe to receive personalized travel deals, destination guides, and exclusive offers straight to your inbox.
                </p>
                <div className="flex gap-2 items-center mb-6 md:mb-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/90"></div>
                  <p className="text-sm text-white/90">No spam, just travel inspiration</p>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn direction="right" delay={0.2} className="md:col-span-2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white border-transparent h-14 pl-5 rounded-xl text-gray-900 placeholder:text-gray-500 focus-visible:ring-red-600/50 focus-visible:border-red-600/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="default" 
                  disabled={isSubmitting}
                  className="h-14 rounded-xl text-base font-medium bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 btn-animated"
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-white/70 text-center">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
