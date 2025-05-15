import { Suspense } from "react"
import Hero from "@/components/hero"
import PromoCarousel from "@/components/promo-carousel"
import FeaturedDestinations from "@/components/featured-destinations"
import TravelServices from "@/components/travel-services"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import { Skeleton } from "@/components/ui/skeleton"
import { FadeIn } from "@/components/animations/fade-in"
import { MapPin, Sparkles, TrendingUp, Globe, Tag, Clock, CircleUser, Plane } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Redesigned Hot Deals Section */}
      <section className="py-16 md:py-24 pb-24 md:pb-32 relative overflow-hidden bg-gradient-to-b from-red-50/50 to-white">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-red-200 to-red-100 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-red-100 to-transparent blur-3xl"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border-[40px] border-red-100/40"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16">
            <FadeIn direction="up" className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500/90 via-red-600 to-red-700 shadow-xl rounded-lg overflow-hidden transform rotate-6 group hover:rotate-0 transition-all duration-300">
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full"></div>
                    <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition-opacity"></div>
                    
                    {/* Modern discount tag design */}
                    <div className="relative z-10 text-white flex flex-col items-center justify-center">
                      <span className="font-bold text-xl tracking-tight">50%</span>
                      <span className="text-xs font-medium -mt-1 tracking-wider">OFF</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  Exclusive Travel Deals
                </h2>
              </div>
              
              <p className="text-gray-600 text-base md:text-lg max-w-xl">
                Limited-time offers on flights and packages between Ethiopia and UAE with incredible savings
              </p>
            </FadeIn>
            
            <div className="hidden md:flex items-center gap-6 text-sm mt-8 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-gray-600">Flight Deals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                <span className="text-gray-600">Package Deals</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-600">Up to 50% Off</span>
              </div>
            </div>
          </div>
          
          <div className="mx-auto max-w-[1200px] relative">
            <div className="absolute -top-10 left-8 hidden md:block">
              <div className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-medium text-red-600 flex items-center gap-2 border border-red-100 animate-pulse">
                <Sparkles className="h-4 w-4" />
                Hot Deals Updated Today
              </div>
            </div>
            
            <div className="relative">
              <Suspense fallback={<div className="h-[700px] w-full bg-slate-100 animate-pulse rounded-3xl" />}>
                <PromoCarousel />
              </Suspense>
              
              <div className="md:absolute md:-bottom-14 md:left-1/2 md:transform md:-translate-x-1/2 bg-white shadow-xl rounded-xl p-5 border border-red-100 mt-6 md:mt-0 flex flex-wrap justify-center gap-4 md:gap-10 max-w-3xl mx-auto z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 rounded-full">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Minute</p>
                    <p className="font-medium text-gray-800">Flash Sales</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 rounded-full">
                    <Plane className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Direct Flights</p>
                    <p className="font-medium text-gray-800">No Layovers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 rounded-full">
                    <CircleUser className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Flexible</p>
                    <p className="font-medium text-gray-800">Free Changes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations with Improved Layout */}
      <section className="py-16 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <FadeIn direction="up" className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-white shadow-sm border border-gray-100 rounded-full mb-4">
              <Globe className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover handpicked destinations with the best experiences and accommodations
            </p>
          </FadeIn>
          
          <Suspense fallback={<DestinationsSkeleton />}>
            <FeaturedDestinations />
          </Suspense>
        </div>
      </section>

      {/* Travel Services with Enhanced Visual Design */}
      <section className="py-16 md:py-28 relative overflow-hidden">
        {/* Modern geometric background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        <div className="container relative z-10">
          <FadeIn direction="up" className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-white shadow-sm border border-gray-100 rounded-full mb-4">
              <Sparkles className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive travel solutions tailored to your specific needs and preferences
            </p>
          </FadeIn>
          
          <TravelServices />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <FadeIn direction="up" className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-white shadow-sm border border-gray-100 rounded-full mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11C14.481 11 16.5 8.981 16.5 6.5C16.5 4.019 14.481 2 12 2C9.519 2 7.5 4.019 7.5 6.5Z" stroke="currentColor" strokeWidth="2" />
                <path d="M2 22C2 17.286 5.84267 13.5 10.6185 13.5H13.3815C18.1573 13.5 22 17.286 22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Customer Stories</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Read testimonials from travelers who've experienced our services firsthand
            </p>
          </FadeIn>
          
          <Testimonials />
        </div>
      </section>

      {/* Newsletter remains at the bottom */}
      <Newsletter />
    </div>
  )
}

function DestinationsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden shadow-lg animate-pulse">
          <Skeleton className="h-56 w-full" />
          <div className="p-6 space-y-3">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between items-center pt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
