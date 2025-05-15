import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Package, Clock, Shield, Globe, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

const cargoFeatures = [
  {
    title: "Express Air Cargo",
    description: "Fast delivery within 1-2 business days for urgent shipments.",
    icon: <Clock className="h-6 w-6 text-red-600" />,
    features: [
      "Priority handling and loading",
      "Real-time tracking",
      "Door-to-door service available",
      "Customs clearance assistance",
    ],
  },
  {
    title: "Standard Air Cargo",
    description: "Cost-effective solution with delivery within 3-5 business days.",
    icon: <Package className="h-6 w-6 text-red-600" />,
    features: [
      "Competitive rates", 
      "Regular flight schedules", 
      "Online tracking", 
      "Insurance options available"
    ],
  },
  {
    title: "Specialized Cargo",
    description: "Tailored solutions for special handling requirements.",
    icon: <Shield className="h-6 w-6 text-red-600" />,
    features: [
      "Temperature-controlled shipping",
      "Hazardous materials transport",
      "Oversized cargo handling",
      "Fragile items packaging",
    ],
  },
]

const benefits = [
  { text: "Competitive pricing", icon: <Globe className="h-4 w-4 text-red-600" /> },
  { text: "Reliable delivery schedules", icon: <Clock className="h-4 w-4 text-red-600" /> },
  { text: "Experienced handling team", icon: <Shield className="h-4 w-4 text-red-600" /> },
  { text: "End-to-end tracking", icon: <Package className="h-4 w-4 text-red-600" /> },
  { text: "Customs clearance assistance", icon: <Truck className="h-4 w-4 text-red-600" /> },
  { text: "Insurance options", icon: <CheckCircle2 className="h-4 w-4 text-red-600" /> },
]

export default function CargoServices() {
  return (
    <div className="space-y-6">
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-red-50 border-b pb-4">
          <CardTitle className="text-xl">Our Cargo Services</CardTitle>
          <CardDescription>
            Reliable cargo shipping between Ethiopia and UAE
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          {cargoFeatures.map((feature, index) => (
            <div 
              key={feature.title} 
              className={cn(
                "p-4 border-b last:border-b-0",
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100/40 rounded-full shrink-0">
                  {feature.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                  
                  <ul className="grid grid-cols-1 gap-y-1">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="bg-red-50 rounded-lg p-4 border border-red-100 flex items-center gap-4">
        <div className="p-3 bg-white rounded-full shadow-sm">
          <Truck className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Need a Custom Solution?</h3>
          <p className="text-sm text-gray-600">
            Contact us at <span className="font-medium">+251 911 123 456</span> for specialized shipping assistance
          </p>
        </div>
      </div>
    </div>
  )
}
