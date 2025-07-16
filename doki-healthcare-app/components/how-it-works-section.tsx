import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, Brain, Users } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    step: 1,
    icon: Stethoscope,
    title: "Input Symptoms",
    description: "Securely describe your health concerns and any symptoms you are experiencing.",
  },
  {
    step: 2,
    icon: Brain,
    title: "Get AI Insights",
    description: "Receive immediate AI-driven diagnostic suggestions and personalized health guidance.",
  },
  {
    step: 3,
    icon: Users,
    title: "Connect with Care",
    description: "Explore nearby clinics, access health education resources, and make informed decisions.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How DOKI Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to empower your health journey with DOKI's intelligent platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card
              key={step.step}
              className="text-center border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt={`${step.title} illustration`}
                    width={80}
                    height={80}
                    className="rounded-lg shadow object-cover mb-2"
                  />
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">{step.step}</span>
                  </div>
                </div>
                <step.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
