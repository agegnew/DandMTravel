"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { SupportedCurrency } from "@/lib/utils"

type CurrencyContextType = {
  currency: SupportedCurrency
  setCurrency: (currency: SupportedCurrency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Default to USD, but try to load from localStorage on client
  const [currency, setCurrency] = useState<SupportedCurrency>("USD")

  // Load saved currency preference from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency")
    if (savedCurrency && (savedCurrency === "USD" || savedCurrency === "AED")) {
      setCurrency(savedCurrency as SupportedCurrency)
    }
  }, [])

  // Save currency preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currency", currency)
  }, [currency])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
} 