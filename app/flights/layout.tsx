import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Flight Search | SkyGate Travel",
  description: "Search and book flights between Ethiopia, UAE, and beyond at the best prices.",
}

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 