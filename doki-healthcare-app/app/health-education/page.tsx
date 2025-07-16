"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, BookOpen, Phone, HelpCircle } from "lucide-react"
import Image from "next/image"

const ussdSteps = [
  {
    step: 1,
    title: "Dial the USSD Code",
    description: "Simply dial *123# from any mobile phone to access DOKI's health information and triage services.",
    icon: Phone,
  },
  {
    step: 2,
    title: "Receive the Main Menu",
    description:
      "Get presented with a simple menu with options for health education, symptom checker, and clinic locator.",
    icon: MessageSquare,
  },
  {
    step: 3,
    title: "Navigate & Get Information",
    description:
      "Follow the prompts by replying with numbers to navigate through health information and get personalized guidance.",
    icon: BookOpen,
  },
]

const benefits = [
  {
    title: "Accessible Health Education",
    description: "Access vital health information and educational content directly from your mobile phone.",
    features: ["Basic health tips", "Preventive care guidance", "Emergency procedures", "Medication reminders"],
  },
  {
    title: "Basic Symptom Triage",
    description: "Get preliminary health assessments and guidance on when to seek medical care.",
    features: ["Symptom assessment", "Urgency classification", "Care recommendations", "Emergency protocols"],
  },
  {
    title: "Offline Access",
    description: "Get health information even without internet connectivity through USSD technology.",
    features: ["No internet required", "Works on feature phones", "Instant responses", "Low-cost access"],
  },
  {
    title: "Simple & Intuitive",
    description: "Easy-to-use text-based interface designed for users of all technical backgrounds.",
    features: ["Text-based navigation", "Clear instructions", "Multi-language support", "User-friendly design"],
  },
]

const faqs = [
  {
    question: "What is USSD and how does DOKI use it?",
    answer:
      "USSD (Unstructured Supplementary Service Data) is a communication protocol that allows users to access services via simple text menus on any mobile phone, even without internet connectivity.",
  },
  {
    question: "Do I need a smartphone to use DOKI's USSD service?",
    answer:
      "No, DOKI's USSD service works on any mobile phone, including basic feature phones. You just need to be able to dial numbers and receive text messages.",
  },
  {
    question: "Is there a cost to use the USSD service?",
    answer:
      "The USSD service is designed to be low-cost and accessible. Standard USSD rates from your mobile operator may apply, but the service itself is free to use.",
  },
  {
    question: "What kind of health information can I get?",
    answer:
      "You can access basic health education, symptom triage, preventive care tips, medication reminders, and guidance on when to seek medical care.",
  },
  {
    question: "How accurate is the symptom triage?",
    answer:
      "The USSD symptom triage provides basic guidance and should not replace professional medical advice. Always consult healthcare professionals for serious health concerns.",
  },
]

import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function HealthEducationPage() {
  // ...existing state, handleRecommend, etc.

  // UI for recommendation search
  // Place this just after the Header and before the rest of the content
  // Show loading, error, and recommended article in a polished card

  const [query, setQuery] = useState("")
  const [recommended, setRecommended] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setRecommended(null)
    setError(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ML_API_URL}/recommend-education/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      if (!res.ok) throw new Error('Failed to get recommendation')
      const data = await res.json()
      setRecommended(data.recommended)
    } catch {
      setError("Failed to get recommendation.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <Header />

      {/* Health Education Recommendation Search */}
      <section className="mb-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Ask a Health Question or Topic</h2>
          <form onSubmit={handleRecommend} className="w-full flex gap-2">
            <Input
              type="text"
              placeholder="e.g., How to prevent malaria?"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="flex-1 h-12 border-blue-200 focus:border-blue-500"
              disabled={loading}
            />
            <Button type="submit" className="h-12 bg-blue-600 hover:bg-blue-700" disabled={loading || !query.trim()}>
              {loading ? 'Searching...' : 'Recommend'}
            </Button>
          </form>
          {error && <div className="text-red-600 mt-2">{error}</div>}
          {recommended && (
            <div className="w-full mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-lg text-blue-700 mb-2">Recommended Article</h3>
              <div className="text-gray-900 text-base mb-1">{recommended.title}</div>
              <div className="text-gray-700 text-sm">{recommended.content}</div>
            </div>
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <Image
              src="/placeholder.svg"
              alt="Health education illustration"
              width={480}
              height={280}
              className="rounded-xl shadow-lg object-cover w-full max-w-2xl h-auto"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Education, Offline & On-Demand.</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            DOKI's USSD service brings health education and basic triage directly to your mobile phone, ensuring vital
            health information is accessible to everyone, everywhere.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">Learn More about USSD</Button>
        </div>

        {/* Phone Demo */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=250"
              alt="USSD Demo on Phone"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* How USSD Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How DOKI USSD Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Accessing reliable health information has never been easier. Follow these simple steps to use DOKI's USSD
            service on any mobile phone.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {ussdSteps.map((step) => (
              <Card key={step.step} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">{step.step}</span>
                  </div>
                  <step.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Benefits & Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/placeholder.svg"
                      alt={`${benefit.title} illustration`}
                      width={72}
                      height={72}
                      className="rounded-lg shadow object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                  <CardDescription className="text-gray-600">{benefit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12">
            Have questions about DOKI's USSD service? Find answers to common queries below.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <HelpCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Access Health Information Anywhere?</h2>
          <p className="text-xl mb-8 opacity-90">
            Try DOKI's USSD service today and get instant access to health education and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-blue-600">
              <Phone className="h-5 w-5 mr-2" />
              Dial *123# Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
