"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plane, Package, AlertCircle, CheckCircle2, Loader2, ArrowRightIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function CargoQuoteForm() {
  const [origin, setOrigin] = useState("ADD")
  const [destination, setDestination] = useState("DXB")
  const [cargoType, setCargoType] = useState("general")
  const [weight, setWeight] = useState(10)
  const [dimensions, setDimensions] = useState({ length: 50, width: 50, height: 50 })
  const [isHazardous, setIsHazardous] = useState(false)
  const [isFragile, setIsFragile] = useState(false)
  const [isRefrigerated, setIsRefrigerated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quote, setQuote] = useState<null | {
    baseRate: number
    additionalFees: Record<string, number>
    total: number
  }>(null)

  const calculateQuote = () => {
    setIsSubmitting(true)

    // Simulate API call to calculate quote
    setTimeout(() => {
      // Calculate volume in cubic meters
      const volume = (dimensions.length * dimensions.width * dimensions.height) / 1000000

      // Base rate calculation
      let baseRate = 0
      if (origin === "ADD" && destination === "DXB") {
        baseRate = 5.5 * Math.max(weight, volume * 167) // Using volumetric weight if heavier
      } else if (origin === "ADD" && destination === "SHJ") {
        baseRate = 5.7 * Math.max(weight, volume * 167)
      } else if (origin === "DXB" && destination === "ADD") {
        baseRate = 6.2 * Math.max(weight, volume * 167)
      } else if (origin === "SHJ" && destination === "ADD") {
        baseRate = 6.4 * Math.max(weight, volume * 167)
      }

      // Additional fees
      const additionalFees: Record<string, number> = {}

      if (isHazardous) {
        additionalFees["Hazardous Material Handling"] = baseRate * 0.3
      }

      if (isFragile) {
        additionalFees["Fragile Item Handling"] = baseRate * 0.15
      }

      if (isRefrigerated) {
        additionalFees["Temperature Control"] = baseRate * 0.25
      }

      // Add fixed fees
      additionalFees["Documentation"] = 25
      additionalFees["Fuel Surcharge"] = baseRate * 0.1
      additionalFees["Security Screening"] = 15

      // Calculate total
      const total = baseRate + Object.values(additionalFees).reduce((sum, fee) => sum + fee, 0)

      setQuote({
        baseRate: Math.round(baseRate),
        additionalFees,
        total: Math.round(total),
      })

      setIsSubmitting(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateQuote()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-red-50 rounded-t-xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-red-600/10 p-2 rounded-full">
            <Plane className="h-5 w-5 text-red-600" />
          </div>
          <CardTitle>Get a Cargo Quote</CardTitle>
        </div>
        <CardDescription>
          Complete the form below for an instant air cargo shipping estimate
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <Tabs defaultValue="quote-form" className="w-full">
          <TabsList className="grid grid-cols-2 mb-5">
            <TabsTrigger value="quote-form">Quote Form</TabsTrigger>
            <TabsTrigger value="results" disabled={!quote}>
              {quote ? "Quote Results" : "Results"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quote-form">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger id="origin" className="bg-white">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADD">Addis Ababa (ADD)</SelectItem>
                      <SelectItem value="DXB">Dubai (DXB)</SelectItem>
                      <SelectItem value="SHJ">Sharjah (SHJ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger id="destination" className="bg-white">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADD">Addis Ababa (ADD)</SelectItem>
                      <SelectItem value="DXB">Dubai (DXB)</SelectItem>
                      <SelectItem value="SHJ">Sharjah (SHJ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cargoType" className="block mb-2">Cargo Type</Label>
                  <Select value={cargoType} onValueChange={setCargoType}>
                    <SelectTrigger id="cargoType" className="bg-white">
                      <SelectValue placeholder="Select cargo type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Cargo</SelectItem>
                      <SelectItem value="perishable">Perishable Goods</SelectItem>
                      <SelectItem value="valuable">Valuable Items</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="1"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block mb-2">Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Input
                        id="length"
                        type="number"
                        min="1"
                        value={dimensions.length}
                        onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                        className="bg-white"
                        placeholder="Length"
                      />
                    </div>
                    <div>
                      <Input
                        id="width"
                        type="number"
                        min="1"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                        className="bg-white"
                        placeholder="Width"
                      />
                    </div>
                    <div>
                      <Input
                        id="height"
                        type="number"
                        min="1"
                        value={dimensions.height}
                        onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                        className="bg-white"
                        placeholder="Height"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="block mb-2">Special Handling</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hazardous"
                      checked={isHazardous}
                      onCheckedChange={(checked) => setIsHazardous(checked === true)}
                    />
                    <Label htmlFor="hazardous" className="cursor-pointer text-sm">Hazardous</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fragile"
                      checked={isFragile}
                      onCheckedChange={(checked) => setIsFragile(checked === true)}
                    />
                    <Label htmlFor="fragile" className="cursor-pointer text-sm">Fragile</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="refrigerated"
                      checked={isRefrigerated}
                      onCheckedChange={(checked) => setIsRefrigerated(checked === true)}
                    />
                    <Label htmlFor="refrigerated" className="cursor-pointer text-sm">Temperature Controlled</Label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full py-5 bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    Get Instant Quote
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="results">
            {quote && (
              <div className="space-y-5">
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Quote Generated Successfully</p>
                    <p className="text-sm text-green-700">Estimated quote for your shipment</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Route</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{origin}</span>
                        <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{destination}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Cargo Type</p>
                      <div className="font-medium capitalize">{cargoType}</div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Weight</p>
                      <div className="font-medium">{weight} kg</div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Volume</p>
                      <div className="font-medium">
                        {((dimensions.length * dimensions.width * dimensions.height) / 1000000).toFixed(2)} m³
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Cost Breakdown</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <span>Base Shipping Rate</span>
                        <span className="font-medium">{formatCurrency(quote.baseRate)}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {Object.entries(quote.additionalFees).map(([fee, amount]) => (
                        <div key={fee} className="flex justify-between text-sm">
                          <span className="text-gray-600">{fee}</span>
                          <span>{formatCurrency(amount)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-red-50 px-4 py-3 border-t border-red-100">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Cost</span>
                        <span className="font-bold text-lg text-red-600">{formatCurrency(quote.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3 pt-3">
                  <Button className="py-5 bg-red-600 hover:bg-red-700">
                    Book This Shipment
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => setQuote(null)}>
                    Modify Quote
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="bg-red-50 px-5 py-3 text-sm text-gray-500 rounded-b-xl">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-red-600" />
          <p>All quotes are estimates and subject to final verification</p>
        </div>
      </CardFooter>
    </Card>
  )
}
