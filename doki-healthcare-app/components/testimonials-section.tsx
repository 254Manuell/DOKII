import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Grace Wanjiku",
    location: "Nairobi",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "DOKI has transformed how I approach my family's health. The AI diagnostics helped me understand my child's symptoms before visiting the clinic. Finding NHIF-approved facilities nearby has never been easier!",
  },
  {
    name: "Dr. Samuel Kiprotich",
    location: "Eldoret",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "As a healthcare provider, I recommend DOKI to my patients. The medicine scanner is crucial in fighting counterfeit drugs in Kenya. It's an essential tool for patient safety and health education.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">
            Hear from Kenyans who have experienced the positive impact of DOKI in their healthcare journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
