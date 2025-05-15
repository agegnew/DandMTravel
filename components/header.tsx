"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plane, Package, FileText, Truck, Building2, Menu, X, ChevronDown, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/context/cart-context"
import { CartDrawer } from "@/components/cart-drawer"
import CurrencySelector from "@/components/currency-selector"

const navItems = [
  { name: "Flights", href: "/flights", icon: Plane },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "Visa", href: "/visa", icon: FileText },
  { name: "Cargo", href: "/cargo", icon: Truck },
  { name: "Hotels", href: "/hotels", icon: Building2 },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-full animate-in fade-in zoom-in-50 duration-500">
              <Plane className="h-8 w-8 text-white rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">D&M Travel</span>
              <span className="text-xs text-gray-500 -mt-1">Travel & Tourism</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all hover:text-red-600 hover:bg-red-50 ${
                    isActive 
                      ? "text-red-600 bg-red-50" 
                      : "text-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium rounded-full hover:bg-red-50 hover:text-red-600 px-4">
                  More
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer hover:bg-red-50 hover:text-red-600">
                  <Link href="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer hover:bg-red-50 hover:text-red-600">
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer hover:bg-red-50 hover:text-red-600">
                  <Link href="/faq">FAQ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer hover:bg-red-50 hover:text-red-600">
                  <Link href="/terms">Terms & Conditions</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <CurrencySelector />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="relative mr-2"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
          
          <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

          <Button variant="default" className="hidden md:inline-flex bg-red-600 hover:bg-red-700">
            <Link href="/contact" className="text-white">Contact Us</Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top duration-300">
          <div className="container py-6 space-y-6">
            <nav className="grid gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive 
                        ? "text-red-600 bg-red-50" 
                        : "text-gray-800 hover:bg-red-50 hover:text-red-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}

              <div className="pt-4 mt-2 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-3 px-4">More</p>
                <div className="grid gap-2">
                  <Link 
                    href="/about" 
                    className="flex px-4 py-3 rounded-xl text-sm text-gray-800 hover:bg-red-50 hover:text-red-600 transition-all" 
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    href="/contact" 
                    className="flex px-4 py-3 rounded-xl text-sm text-gray-800 hover:bg-red-50 hover:text-red-600 transition-all" 
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link 
                    href="/faq" 
                    className="flex px-4 py-3 rounded-xl text-sm text-gray-800 hover:bg-red-50 hover:text-red-600 transition-all" 
                    onClick={() => setIsOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link 
                    href="/terms" 
                    className="flex px-4 py-3 rounded-xl text-sm text-gray-800 hover:bg-red-50 hover:text-red-600 transition-all" 
                    onClick={() => setIsOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </nav>
            
            <div className="flex justify-between items-center">
              <CurrencySelector />
              <Button className="bg-red-600 hover:bg-red-700">
                <Link href="/contact" className="text-white">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
