"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Phone, Navigation, Shield } from "lucide-react"

import { useEffect } from "react"

const clinics = [
  {
    id: 1,
    name: "Nairobi Hospital",
    rating: 4.8,
    distance: "2.5 km",
    address: "Argwings Kodhek Road, Nairobi",
    services: ["General Practice", "Diagnostics", "Emergency"],
    priceRange: "KES 2,000 - 8,000",
    status: "Open Now",
    nhifAccepted: true,
    shifAccepted: true,
    image: "/placeholder.svg?height=120&width=180",
  },
  {
    id: 2,
    name: "Kenyatta National Hospital",
    rating: 4.5,
    distance: "3.8 km",
    address: "Hospital Road, Nairobi",
    services: ["Emergency", "Specialist Care", "Surgery"],
    priceRange: "KES 500 - 5,000",
    status: "Open 24/7",
    nhifAccepted: true,
    shifAccepted: true,
    image: "/placeholder.svg?height=120&width=180",
  },
  {
    id: 3,
    name: "Aga Khan Hospital",
    rating: 4.9,
    distance: "4.1 km",
    address: "3rd Parklands Avenue, Nairobi",
    services: ["Pediatrics", "Cardiology", "Maternity"],
    priceRange: "KES 3,000 - 12,000",
    status: "Open Now",
    nhifAccepted: true,
    shifAccepted: false,
    image: "/placeholder.svg?height=120&width=180",
  },
  {
    id: 4,
    name: "Mater Hospital",
    rating: 4.7,
    distance: "5.0 km",
    address: "Dunga Road, South B, Nairobi",
    services: ["Maternity", "Pediatrics", "General Practice"],
    priceRange: "KES 1,500 - 6,000",
    status: "Open Now",
    nhifAccepted: true,
    shifAccepted: true,
    image: "/placeholder.svg?height=120&width=180",
  },
  {
    id: 5,
    name: "Gertrude's Children's Hospital",
    rating: 4.6,
    distance: "3.9 km",
    address: "Muthaiga Road, Nairobi",
    services: ["Pediatrics", "Child Specialist Care"],
    priceRange: "KES 2,500 - 8,000",
    status: "Open Now",
    nhifAccepted: true,
    shifAccepted: true,
    image: "/placeholder.svg?height=120&width=180",
  },
  {
    id: 6,
    name: "MP Shah Hospital",
    rating: 4.8,
    distance: "6.2 km",
    address: "Shivachi Road, Parklands, Nairobi",
    services: ["Cardiology", "Oncology", "Diagnostics"],
    priceRange: "KES 4,000 - 15,000",
    status: "Open Now",
    nhifAccepted: true,
    shifAccepted: false,
    image: "/placeholder.svg?height=120&width=180",
  },
]

const filterOptions = [
  { id: "open-now", label: "Open Now", active: true },
  { id: "nhif", label: "NHIF Accepted", active: false },
  { id: "shif", label: "SHIF Accepted", active: false },
  { id: "emergency", label: "Emergency", active: false },
  { id: "maternity", label: "Maternity", active: false },
]

export default function ClinicLocatorPage() {
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null)
  const [clinicsData, setClinicsData] = useState<any[]>([])
  const [recommended, setRecommended] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords
          setUserLocation({ lat: coords.latitude, lon: coords.longitude })
        },
        () => setError("Could not get your location."),
        { enableHighAccuracy: true, timeout: 10000 }
      )
    } else {
      setError("Geolocation not supported.")
    }
  }, [])

  useEffect(() => {
    if (userLocation) {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_ML_API_URL}/nearby-clinics/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userLocation),
      })
        .then(res => res.json())
        .then(data => {
          setClinicsData(data.clinics)
          setRecommended(data.recommended)
        })
        .catch(() => setError("Failed to fetch clinics."))
        .finally(() => setLoading(false))
    }
  }, [userLocation])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("distance")
  const [filters, setFilters] = useState(filterOptions)
  const [showMap, setShowMap] = useState(false)

  const toggleFilter = (filterId: string) => {
    setFilters(filters.map((filter) => (filter.id === filterId ? { ...filter, active: !filter.active } : filter)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Healthcare Facilities Near You</h1>
          <p className="text-gray-600 mb-6">Discover NHIF/SHIF approved clinics and hospitals across Kenya</p>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search clinics, hospitals, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button variant="outline" className="h-12 px-6 bg-transparent">
                <Navigation className="h-4 w-4 mr-2" />
                Use Location
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={filter.active ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter.id)}
                  className={filter.active ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={() => setShowMap(!showMap)} className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {showMap ? "Hide Map" : "Show Map"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Clinic List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Healthcare Facilities in Nairobi</h2>
            {clinics.map((clinic) => (
              <Card key={clinic.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={clinic.image || "/placeholder.svg"}
                      alt={clinic.name}
                      className="w-24 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{clinic.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{clinic.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{clinic.distance}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant={
                              clinic.status === "Open Now" || clinic.status === "Open 24/7" ? "default" : "secondary"
                            }
                          >
                            {clinic.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{clinic.address}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {clinic.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        {clinic.nhifAccepted && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <Shield className="h-3 w-3 mr-1" />
                            NHIF
                          </Badge>
                        )}
                        {clinic.shifAccepted && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            <Shield className="h-3 w-3 mr-1" />
                            SHIF
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-600">{clinic.priceRange}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map View */}
          <div className="lg:col-span-1">
  <Card className="sticky top-4">
    <CardContent className="p-0">
      <div className="h-96 bg-gray-200 rounded-lg overflow-hidden relative">
        {userLocation ? (
          <iframe
            title="Clinic Map"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '384px' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${userLocation.lat},${userLocation.lon}&zoom=12&maptype=roadmap`}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Location unavailable</div>
        )}
        {/* Overlay clinic pins as a legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 rounded p-2 text-xs shadow">
          <div className="mb-1 font-semibold text-blue-700">Legend:</div>
          <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span> Clinic</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span> Recommended</div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
