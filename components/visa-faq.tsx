"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqItems = [
  {
    question: "What types of UAE visas can I apply for through D&M Travel?",
    answer:
      "D&M Travel offers assistance with tourist visas (30, 60, and 90 days), business visas, transit visas, and multiple-entry visas for UAE destinations including Dubai, Abu Dhabi, and Sharjah.",
  },
  {
    question: "What documents are required for a UAE tourist visa?",
    answer:
      "Required documents include a passport valid for at least 6 months, passport-sized photographs with white background, flight itinerary, hotel booking confirmation, bank statements for the last 3 months, and travel insurance. Additional documents may be required based on your nationality.",
  },
  {
    question: "How long does the visa processing take?",
    answer:
      "Standard processing time is 3-5 working days. Express processing is available for an additional fee, which can reduce the processing time to 24-48 hours, subject to embassy workload.",
  },
  {
    question: "Can I track my visa application status?",
    answer:
      "Yes, once you submit your application, you will receive a tracking number. You can use this number on our website to check the real-time status of your application.",
  },
  {
    question: "What is the visa approval rate for Ethiopian citizens?",
    answer:
      "The approval rate varies based on individual circumstances, but we have a high success rate for Ethiopian citizens applying for UAE visas. Ensuring all documentation is complete and accurate significantly increases approval chances.",
  },
  {
    question: "Do I need to visit your office to apply for a visa?",
    answer:
      "No, our visa application process is fully online. You can upload all required documents through our secure portal and complete the entire process remotely.",
  },
  {
    question: "What happens if my visa application is rejected?",
    answer:
      "If your application is rejected, we will notify you immediately and provide the reason if available. We offer a reapplication service with revised documentation based on the rejection reason, or a partial refund as per our terms and conditions.",
  },
  {
    question: "Can I extend my visa while in the UAE?",
    answer:
      "Yes, most visas can be extended while you are in the UAE. We offer visa extension services that you can initiate through our website or by contacting our customer service team.",
  },
  {
    question: "Do you offer visa services for countries other than the UAE?",
    answer:
      "Currently, we specialize in UAE visas. However, we are expanding our services to include other Gulf countries and popular destinations. Please contact our customer service for specific inquiries.",
  },
  {
    question: "What payment methods do you accept for visa services?",
    answer:
      "We accept credit/debit cards, bank transfers, and mobile money services. All payments are processed through secure payment gateways to ensure your financial information is protected.",
  },
]

export default function VisaFAQ() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
        <HelpCircle className="h-4 w-4" />
        <span>Click on a question to see the answer</span>
      </div>
    
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border border-red-100 rounded-lg mb-3 overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="text-left px-4 py-3 hover:bg-red-50 text-base font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-4 text-gray-600 bg-red-50 border-t border-red-100">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
