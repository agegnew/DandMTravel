import { Suspense } from "react"
import FlightsContent from "../../components/flights-content"

export const metadata = {
  title: "Flight Search | D&M Travel Agency",
  description: "Search for flights between Ethiopia, UAE, and beyond with personalized service.",
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="container py-8">Loading flight search...</div>}>
      <FlightsContent />
    </Suspense>
  )
}
