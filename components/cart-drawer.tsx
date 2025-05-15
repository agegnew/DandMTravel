"use client"

import { ShoppingCart, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, clearCart, getTotal } = useCart()
  const { currency } = useCurrency()
  const router = useRouter()

  const handleCheckout = () => {
    onOpenChange(false)
    router.push("/checkout")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">Add items to your cart to continue</p>
            <Button onClick={() => onOpenChange(false)}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </p>
                    {item.details && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.type === "flight" && (
                          <p>
                            {item.details.origin} → {item.details.destination}
                            {item.details.departureDate && ` | ${item.details.departureDate}`}
                          </p>
                        )}
                        {item.type === "hotel" && (
                          <p>
                            {item.details.location}
                            {item.details.checkInDate && ` | ${item.details.checkInDate}`}
                          </p>
                        )}
                        {item.type === "package" && (
                          <p>
                            {item.details.location} | {item.details.duration}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">{formatCurrency(item.price, currency)}</p>
                    <Button variant="ghost" size="icon" className="h-8 w-8 mt-auto" onClick={() => removeItem(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(getTotal(), currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span>{formatCurrency(getTotal() * 0.1, currency)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(getTotal() * 1.1, currency)}</span>
              </div>
            </div>

            <SheetFooter className="mt-6 flex-col gap-2 sm:flex-col">
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                  Continue Shopping
                </Button>
                <Button variant="outline" size="icon" className="flex-shrink-0" onClick={clearCart}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
