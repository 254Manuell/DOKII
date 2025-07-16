import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Shield, MapPin } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Brain,
    title: "AI Diagnostics",
    description:
      "Get instant, accurate health insights by describing your symptoms. Our AI provides preliminary diagnosis to help you make informed healthcare decisions.",
    cta: "Jifunze Zaidi / Learn More",
  },
  {
    icon: Shield,
    title: "Medicine Scanner",
    description:
      "Protect yourself from counterfeit medicines common in Kenya. Scan medicine barcodes to verify authenticity and ensure your safety.",
    cta: "Jifunze Zaidi / Learn More",
  },
  {
    icon: MapPin,
    title: "Clinic Locator",
    description:
      "Find nearby clinics, hospitals, and healthcare facilities across Kenya with estimated costs and NHIF/SHIF acceptance information.",
    cta: "Jifunze Zaidi / Learn More",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            DOKI integrates cutting-edge AI to provide accessible and reliable healthcare solutions designed
            specifically for Kenya's healthcare landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt={`${feature.title} illustration`}
                    width={96}
                    height={96}
                    className="rounded-lg shadow object-cover mb-2"
                  />
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-6 text-base">{feature.description}</CardDescription>
                <Button variant="outline" className="w-full bg-transparent">
                  {feature.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
