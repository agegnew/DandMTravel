"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2, Upload, Check, AlertCircle, FileText, Trash2, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface FileUpload {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "complete" | "error"
  error?: string
}

export default function VisaUploadForm() {
  const [step, setStep] = useState(1)
  const [visaType, setVisaType] = useState("")
  const [nationality, setNationality] = useState("")
  const [destination, setDestination] = useState("")
  const [processingTime, setProcessingTime] = useState("standard")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [passportNumber, setPassportNumber] = useState("")
  const [passportExpiry, setPassportExpiry] = useState("")
  const [travelDateFrom, setTravelDateFrom] = useState("")
  const [travelDateTo, setTravelDateTo] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [files, setFiles] = useState<FileUpload[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "uploading" as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((file) => {
        const interval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    progress: Math.min(f.progress + 10, 100),
                    status: f.progress + 10 >= 100 ? "complete" : "uploading",
                  }
                : f,
            ),
          )

          if (file.progress >= 100) {
            clearInterval(interval)
          }
        }, 500)
      })
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Prepare file information - only send metadata, not actual files
      const fileInfo = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));

      // Send data to our API endpoint
      const response = await fetch('/api/save-visa-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visaType,
          nationality,
          destination,
          processingTime,
          firstName,
          lastName,
          email,
          phone,
          passportNumber,
          passportExpiry,
          travelDateFrom,
          travelDateTo,
          uploadedFiles: fileInfo,
          additionalNotes
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to save your application data');
      }
      
      // Show success state
      setIsComplete(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      // Keep the form visible so user can try again
      setIsSubmitting(false);
    }
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  if (isComplete) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Application Submitted!</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Your visa application has been successfully submitted. You will receive a confirmation email with tracking details shortly.
        </p>
        <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">Submit Another Application</Button>
      </div>
    )
  }

  // Progress indicator
  const totalSteps = 3
  const progress = Math.round((step / totalSteps) * 100)

  return (
    <form onSubmit={handleSubmit}>
      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-12 mt-4">
        <div className="flex justify-between mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full border-2 text-xs font-medium",
                step > i + 1 ? "bg-red-600 border-red-600 text-white" : 
                step === i + 1 ? "border-red-600 text-red-600" : 
                "border-gray-300 text-gray-400"
              )}
            >
              {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
              <div className="absolute -bottom-6 w-max whitespace-nowrap text-xs font-medium">
                {i === 0 ? "Visa Details" : i === 1 ? "Personal Info" : "Documents"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-2 mt-2 w-full overflow-hidden rounded-full bg-red-100">
          <div 
            className="h-full w-full flex-1 bg-red-600 transition-all"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-8">
          <Card className="border-none shadow-none bg-red-50">
            <CardContent className="p-5">
              <h3 className="font-medium mb-2">Select Visa Type & Destination</h3>
              <p className="text-sm text-gray-500 mb-0">Choose the visa that best fits your travel plans</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="visa-type">Visa Type</Label>
              <Select value={visaType} onValueChange={setVisaType}>
                <SelectTrigger id="visa-type">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourist-30">Tourist Visa (30 days)</SelectItem>
                  <SelectItem value="tourist-60">Tourist Visa (60 days)</SelectItem>
                  <SelectItem value="tourist-90">Tourist Visa (90 days)</SelectItem>
                  <SelectItem value="business">Business Visa</SelectItem>
                  <SelectItem value="transit">Transit Visa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select value={nationality} onValueChange={setNationality}>
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethiopia">Ethiopia</SelectItem>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="south-africa">South Africa</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dubai">Dubai</SelectItem>
                  <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                  <SelectItem value="sharjah">Sharjah</SelectItem>
                  <SelectItem value="ajman">Ajman</SelectItem>
                  <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Processing Time</Label>
            <RadioGroup 
              value={processingTime} 
              onValueChange={setProcessingTime}
              className="grid grid-cols-1 gap-2"
            >
              <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                <RadioGroupItem value="standard" id="standard" className="text-red-600" />
                <div className="flex-1">
                  <Label htmlFor="standard" className="font-medium">Standard Processing</Label>
                  <p className="text-sm text-gray-500">3-5 working days</p>
                </div>
                <div className="text-right font-medium">Included</div>
              </div>
              <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                <RadioGroupItem value="express" id="express" className="text-red-600" />
                <div className="flex-1">
                  <Label htmlFor="express" className="font-medium">Express Processing</Label>
                  <p className="text-sm text-gray-500">24-48 hours</p>
                </div>
                <div className="text-right font-medium">+$50</div>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-8">
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={!visaType || !nationality}
              className="w-full py-6 text-base bg-red-600 hover:bg-red-700"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <Card className="border-none shadow-none bg-red-50">
            <CardContent className="p-5">
              <h3 className="font-medium mb-2">Personal Information</h3>
              <p className="text-sm text-gray-500 mb-0">Enter details exactly as they appear on your passport</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input 
                id="first-name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input 
                id="last-name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passport-number">Passport Number</Label>
              <Input 
                id="passport-number" 
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passport-expiry">Passport Expiry Date</Label>
              <Input 
                id="passport-expiry" 
                type="date" 
                value={passportExpiry}
                onChange={(e) => setPassportExpiry(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travel-dates">Travel Dates</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                id="travel-dates-from" 
                type="date" 
                placeholder="From" 
                value={travelDateFrom}
                onChange={(e) => setTravelDateFrom(e.target.value)}
              />
              <Input 
                id="travel-dates-to" 
                type="date" 
                placeholder="To" 
                value={travelDateTo}
                onChange={(e) => setTravelDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-8 flex gap-4">
            <Button variant="outline" type="button" onClick={prevStep} className="flex-1 py-6 text-base border-red-200 hover:bg-red-50 text-red-600">
              Back
            </Button>
            <Button type="button" onClick={nextStep} className="flex-1 py-6 text-base bg-red-600 hover:bg-red-700">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8">
          <Card className="border-none shadow-none bg-red-50">
            <CardContent className="p-5">
              <h3 className="font-medium mb-2">Required Documents</h3>
              <p className="text-sm text-gray-500 mb-0">Upload clear, high-quality scans of all documents</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Passport scan (all pages)
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Passport-sized photo (white background)
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Flight itinerary (if available)
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Hotel booking confirmation (if available)
              </li>
            </ul>

            <div className="mt-4">
              <Label htmlFor="file-upload" className="sr-only">
                Choose files
              </Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-red-200 rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-red-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  <p className="text-xs text-gray-500 italic mt-1">Note: This is a demo implementation. File metadata will be saved, but files are not actually uploaded to a server.</p>
                </div>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-4">
                <h4 className="font-medium">Uploaded Files</h4>
                <ul className="space-y-2">
                  {files.map((file) => (
                    <li key={file.id} className="bg-white border border-red-100 rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium truncate max-w-[180px]">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.status === "uploading" ? (
                            <Loader2 className="h-4 w-4 text-red-600 animate-spin" />
                          ) : file.status === "complete" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {file.status === "uploading" && (
                        <div className="relative h-1 mt-2 w-full overflow-hidden rounded-full bg-red-100">
                          <div 
                            className="h-full w-full flex-1 bg-red-600 transition-all"
                            style={{ transform: `translateX(-${100 - file.progress}%)` }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="space-y-2 pt-4">
              <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
              <Textarea 
                id="additional-notes" 
                placeholder="Any special requirements or information" 
                className="min-h-[100px]"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-8 flex gap-4">
            <Button variant="outline" type="button" onClick={prevStep} className="flex-1 py-6 text-base border-red-200 hover:bg-red-50 text-red-600">
              Back
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || files.length === 0} 
              className="flex-1 py-6 text-base bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
