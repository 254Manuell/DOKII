import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image
              src="/placeholder.svg"
              alt="Healthcare platform illustration"
              width={480}
              height={280}
              className="rounded-xl shadow-lg object-cover w-full max-w-2xl h-auto"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Empowering Health with AI</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            DOKI provides AI-powered medical diagnostics, counterfeit medicine detection, and health education tailored
            for Kenya's healthcare needs. Access quality healthcare guidance anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              Pata Uchunguzi / Get AI Diagnosis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Jifunze Zaidi / Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}
