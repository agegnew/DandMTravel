import { Plane, Building2, Package, FileText, Truck, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FadeIn, FadeInStagger } from "@/components/animations/fade-in"

const services = [
  {
    title: "Flight Bookings",
    description: "Find the best deals on flights between Ethiopia, UAE, and beyond with our personalized service.",
    icon: Plane,
    href: "/flights",
    color: "bg-red-50",
    iconColor: "text-red-600",
    hoverColor: "group-hover:bg-red-600",
  },
  {
    title: "Hotel Reservations",
    description: "Book luxury, mid-range or budget accommodations that suit your style and preferences.",
    icon: Building2,
    href: "/hotels",
    color: "bg-red-50/70",
    iconColor: "text-red-500",
    hoverColor: "group-hover:bg-red-500",
  },
  {
    title: "Travel Packages",
    description: "Explore our curated packages for unforgettable experiences with all-inclusive options.",
    icon: Package,
    href: "/packages",
    color: "bg-red-50",
    iconColor: "text-red-700",
    hoverColor: "group-hover:bg-red-700",
  },
  {
    title: "Visa Services",
    description: "Streamlined visa application process for UAE destinations with expert guidance.",
    icon: FileText,
    href: "/visa",
    color: "bg-red-50/70",
    iconColor: "text-red-600",
    hoverColor: "group-hover:bg-red-600",
  },
  {
    title: "Cargo Services",
    description: "Reliable air cargo shipping between Ethiopia and UAE with tracking and insurance.",
    icon: Truck,
    href: "/cargo",
    color: "bg-red-50",
    iconColor: "text-red-800",
    hoverColor: "group-hover:bg-red-800",
  },
]

export default function TravelServices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FadeInStagger staggerDelay={0.1}>
        {services.map((service) => {
          const Icon = service.icon

          return (
            <FadeIn key={service.title} direction="up">
              <Link href={service.href} className="block group">
                <Card className="h-full border border-gray-100 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative">
                    <div className={`absolute inset-0 ${service.color} opacity-90 transition-all duration-300`}></div>
                    <CardHeader className="pb-2 relative z-10">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${service.color} ${service.iconColor} mb-4 transition-all duration-300 ${service.hoverColor} group-hover:text-white shadow-sm`}>
                        <Icon className="h-8 w-8 transition-transform group-hover:scale-110 duration-300" />
                      </div>
                      <CardTitle className="text-xl font-bold transition-colors group-hover:text-red-600">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-600 text-base mb-6">{service.description}</CardDescription>
                      <div className="flex items-center text-red-600 font-medium transition-all transform translate-x-0 group-hover:translate-x-2 duration-300">
                        <span className="mr-2">Learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          )
        })}
      </FadeInStagger>
    </div>
  )
}
