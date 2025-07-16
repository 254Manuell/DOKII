"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stethoscope, Brain, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DiagnosticsPage() {
  const [symptoms, setSymptoms] = useState("")
  const [duration, setDuration] = useState("")
  const [severity, setSeverity] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [diagnosisResult, setDiagnosisResult] = useState<{diagnosis: string, confidence: number} | null>(null)

  const handleDiagnosis = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe your symptoms to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setDiagnosisResult(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ML_API_URL}/diagnose/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      })
      if (!res.ok) throw new Error('Diagnosis failed')
      const data = await res.json()
      setDiagnosisResult({ diagnosis: data.diagnosis, confidence: data.confidence })
      toast({
        title: "Diagnosis Complete",
        description: data.diagnosis,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to get diagnosis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Stethoscope className="h-8 w-8 text-blue-600" />
                Describe Your Symptoms
              </h1>
              <p className="text-gray-600">
                Provide detailed information to help our AI provide an accurate preliminary diagnosis.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Symptom Information</CardTitle>
                <CardDescription>Please provide as much detail as possible for accurate analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Main Symptoms *</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="e.g., Fever, headache, fatigue, sore throat, cough..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 days, 1 week, since yesterday"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select value={severity} onValueChange={setSeverity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="history">Relevant Medical History (Optional)</Label>
                  <Textarea
                    id="history"
                    placeholder="e.g., Allergies, chronic conditions, recent travel"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                  />
                </div>

                <Button onClick={handleDiagnosis} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  <Brain className="h-4 w-4 mr-2" />
                  {isLoading ? "Analyzing..." : "Get AI Diagnosis"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="AI-Powered Diagnostics"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Brain className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">AI-Powered Diagnostics</h3>
                  <p className="text-lg">
                    Input your symptoms and let DOKI's advanced AI provide a preliminary diagnostic insight. Empower
                    yourself with knowledge for better health decisions.
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-800">Important Disclaimer</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      This AI diagnosis is for informational purposes only and should not replace professional medical
                      advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full bg-transparent">
              Start Your Health Check →
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
