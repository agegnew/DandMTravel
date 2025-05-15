import Link from "next/link"
import { Plane, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-red-600 p-2 rounded-full">
                <Plane className="h-6 w-6 text-white rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">D&M Travel</span>
                <span className="text-xs text-gray-500 -mt-1">Travel & Tourism</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-8 max-w-md">
              Your gateway to seamless travel experiences between Ethiopia, UAE, and beyond. We provide high-quality travel services with personalized customer care.
            </p>
            <div className="flex space-x-5 mb-10 md:mb-0">
              <a 
                href="#" 
                className="bg-white p-2.5 rounded-full text-gray-500 hover:text-primary hover:shadow-md transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white p-2.5 rounded-full text-gray-500 hover:text-primary hover:shadow-md transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white p-2.5 rounded-full text-gray-500 hover:text-primary hover:shadow-md transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white p-2.5 rounded-full text-gray-500 hover:text-primary hover:shadow-md transition-all"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/flights" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Flights</span>
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Hotels</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Travel Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/visa" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Visa Services</span>
                </Link>
              </li>
              <li>
                <Link href="/cargo" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Cargo Services</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-all hover:translate-x-1 duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full flex-shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium mb-1">Office Location</p>
                  <span className="text-gray-600">Bole Road, Addis Ababa, Ethiopia</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium mb-1">Call Us</p>
                  <a href="tel:+251911234567" className="text-gray-600 hover:text-primary transition-colors">
                    +251 911 234 567
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium mb-1">Email Us</p>
                  <a
                    href="mailto:info@dmtravel.com"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    info@dmtravel.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} D&M Travel Agency. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <Link href="/terms" className="text-gray-500 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
