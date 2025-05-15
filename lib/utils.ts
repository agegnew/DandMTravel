import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Currency conversion rates (simplified fixed rates for demo)
const CURRENCY_RATES = {
  USD: 1,
  AED: 3.6725, // 1 USD = 3.6725 AED (fixed rate for demo)
};

export type SupportedCurrency = keyof typeof CURRENCY_RATES;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency based on selected currency type
export function formatCurrency(amount: number, currency: SupportedCurrency = 'USD'): string {
  const convertedAmount = convertCurrency(amount, 'USD', currency);
  
  if (currency === 'AED') {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  }
  
  // Default USD formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedAmount);
}

// Convert amount from one currency to another
export function convertCurrency(
  amount: number, 
  fromCurrency: SupportedCurrency = 'USD', 
  toCurrency: SupportedCurrency = 'USD'
): number {
  // Convert from source currency to USD first (if needed)
  const amountInUSD = fromCurrency === 'USD' 
    ? amount 
    : amount / CURRENCY_RATES[fromCurrency];
  
  // Then convert from USD to target currency
  return amountInUSD * CURRENCY_RATES[toCurrency];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getHotelSuggestions(origin: string, destination: string, dates: { checkIn: string; checkOut: string }) {
  // This would be an API call in a real application
  // For now, we'll return mock data
  return [
    {
      id: "hotel1",
      name: "Grand Hyatt Dubai",
      location: "Dubai Creek",
      price: 120,
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      id: "hotel2",
      name: "Rove Downtown Dubai",
      location: "Downtown Dubai",
      price: 85,
      rating: 4,
      image: "/placeholder.svg",
    },
    {
      id: "hotel3",
      name: "Premier Inn Dubai Airport",
      location: "Dubai Airport",
      price: 65,
      rating: 3,
      image: "/placeholder.svg",
    },
  ]
}

export function getPackageDeals(flightId: string) {
  // This would be an API call in a real application
  // For now, we'll return mock data
  return [
    {
      id: "pkg1",
      name: "Dubai City Explorer",
      location: "Dubai, UAE",
      price: 299,
      duration: "3 days",
      image: "/placeholder.svg",
    },
    {
      id: "pkg2",
      name: "Abu Dhabi Highlights",
      location: "Abu Dhabi, UAE",
      price: 249,
      duration: "2 days",
      image: "/placeholder.svg",
    },
  ]
}
