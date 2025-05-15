import type { Metadata } from "next"
import PackagesContent from "../../components/packages-content"

export const metadata: Metadata = {
  title: "Travel Packages | D&M Travel Agency",
  description: "Discover handcrafted travel packages between Ethiopia, UAE, and beyond.",
}

export default function PackagesPage() {
  return <PackagesContent />
}
