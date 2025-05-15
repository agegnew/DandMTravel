"use client"

import React from "react"
import { DollarSign, Banknote } from "lucide-react"
import { useCurrency } from "@/context/currency-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SupportedCurrency } from "@/lib/utils"

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  const currencies: { value: SupportedCurrency; label: string; icon: React.ReactNode }[] = [
    { 
      value: "USD", 
      label: "USD - US Dollar", 
      icon: <DollarSign className="h-4 w-4" /> 
    },
    { 
      value: "AED", 
      label: "AED - UAE Dirham", 
      icon: <Banknote className="h-4 w-4" /> 
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          {currency === "USD" ? <DollarSign className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
          {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currencyOption) => (
          <DropdownMenuItem
            key={currencyOption.value}
            onClick={() => setCurrency(currencyOption.value)}
            className={currency === currencyOption.value ? "bg-muted" : ""}
          >
            <div className="flex items-center gap-2">
              {currencyOption.icon}
              <span>{currencyOption.label}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 