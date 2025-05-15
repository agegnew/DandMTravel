import { Suspense } from "react"
import type { Metadata } from "next"
import HotelSearch from "@/components/hotel-search"
import HotelGrid from "@/components/hotel-grid"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Hotels | D&M Travel Agency",
  description: "Search and book hotels in Dubai, Abu Dhabi, and across UAE at the best prices.",
}

export default function HotelsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const location = (searchParams.location as string) || ""
  const checkIn = (searchParams.checkIn as string) || ""
  const checkOut = (searchParams.checkOut as string) || ""
  const guests = Number.parseInt((searchParams.guests as string) || "1")
  const priceRange = (searchParams.priceRange as string) || "all"
  const rating = (searchParams.rating as string) || "all"

  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Hotel Search</h1>
      <p className="text-gray-600 mb-8">Find the perfect accommodation for your stay in UAE</p>

      <HotelSearch
        initialLocation={location}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialGuests={guests}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Available Hotels</h2>
        <Suspense fallback={<HotelGridSkeleton />}>
          <HotelGrid
            location={location}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            priceRange={priceRange}
            rating={rating}
          />
        </Suspense>
      </div>
    </div>
  )
}

function HotelGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
