"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Plane, Globe, Shield, Star, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/hero-image.png"
            alt="Scenic view of Ethiopian landscape at sunset"
            fill
            priority
            quality={100}
            className="object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 to-red-900/50 mix-blend-multiply"></div>
        </div>

        <div className="relative h-[700px] md:h-[800px] flex items-center justify-center z-10">
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          
          <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6">
                  <Badge className="bg-red-600 border-0 mr-2">New</Badge>
                  <span className="text-white/90 text-sm">Premium travel experiences</span>
                </div>
                
                <FadeIn direction="up" className="mb-6" duration={0.7}>
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-md">
                    Your Gateway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-200">Unforgettable</span> Journeys
                  </h1>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.1} duration={0.7}>
                  <p className="text-xl text-white/90 mb-8 max-w-xl drop-shadow-sm">
                    Experience premium travel between Ethiopia, UAE, and beyond with personalized service at unbeatable prices.
                  </p>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.2} duration={0.7}>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-lg shadow-red-900/30 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 transition-all">
                      <Link href="/flights" className="flex items-center gap-2">
                        Explore Destinations
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base border-2 border-red-100 bg-white/10 text-red-100 backdrop-blur-sm hover:bg-white/10 hover:text-white hover:border-white shadow-lg shadow-black/5 transition-all">
                      <Link href="/about">
                        About D&M Travel
                      </Link>
                    </Button>
                  </div>
                </FadeIn>
              </div>
              
              <FadeIn direction="up" delay={0.2} duration={0.7} className="hidden lg:block">
                <div className="relative h-[500px] w-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-4 border-dashed border-white/20 animate-spin-slow"></div>
                  
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [-20, 20, -20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10"
                  >
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl w-[240px]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-red-600 p-3 rounded-xl">
                          <Plane className="h-6 w-6 text-white rotate-45" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">UAE Flights</h3>
                          <p className="text-white/70 text-sm">Starting from $399</p>
                        </div>
                      </div>
                      <div className="bg-white/10 h-1 w-full rounded-full mb-4">
                        <div className="bg-red-600 h-1 w-3/4 rounded-full"></div>
                      </div>
                      <div className="text-white/70 text-xs">Limited seats available</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [15, -15, 15] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 left-10"
                  >
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl w-[240px]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-red-600 p-3 rounded-xl">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">Dubai Packages</h3>
                          <p className="text-white/70 text-sm">3 days from $699</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">Luxury</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">All-inclusive</Badge>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="bg-red-600/90 backdrop-blur-md p-6 rounded-full border border-white/10 shadow-xl w-[180px] h-[180px] flex flex-col items-center justify-center text-center">
                      <div className="mb-2">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-xl">D&M Travel</h3>
                      <p className="text-white/90 text-sm">Travel & Tourism</p>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        <div className="relative bg-white py-16 z-10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { 
                  icon: <Plane className="h-6 w-6 text-red-600" />, 
                  title: "Direct Flights", 
                  description: "Regular flights between Ethiopia and UAE"
                },
                { 
                  icon: <Shield className="h-6 w-6 text-red-600" />, 
                  title: "Secure Booking", 
                  description: "Safe and transparent payment options"
                },
                { 
                  icon: <Star className="h-6 w-6 text-red-600" />, 
                  title: "Premium Service", 
                  description: "Personalized customer support 24/7"
                },
                { 
                  icon: <MapPin className="h-6 w-6 text-red-600" />, 
                  title: "Ethiopian Beauty", 
                  description: "Discover the natural wonders of Ethiopia"
                }
              ].map((feature, index) => (
                <FadeIn key={index} direction="up" delay={0.1 * index} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-all">
                  <div className="bg-red-100 p-4 rounded-2xl mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
