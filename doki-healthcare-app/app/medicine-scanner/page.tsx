"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Scan, Shield, AlertTriangle, CheckCircle, XCircle, Camera, Search } from "lucide-react"

const recentScans = [
  {
    id: 1,
    name: "PainRelief Plus",
    date: "2024-07-28",
    status: "authentic",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "VitalBoost Syrup",
    date: "2024-07-27",
    status: "counterfeit",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "ImmunoDefend Tablets",
    date: "2024-07-26",
    status: "authentic",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "SleepEase Capsules",
    date: "2024-07-25",
    status: "unknown",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "DigestAid Forte",
    date: "2024-07-24",
    status: "authentic",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const safetyResources = [
  {
    icon: AlertTriangle,
    title: "Common Counterfeit Medicines",
    description: "Learn to identify frequently faked medications and stay safe.",
    color: "text-red-600",
  },
  {
    icon: Shield,
    title: "Reporting Suspected Fakes",
    description: "Know the steps to take if you encounter a suspicious medicine.",
    color: "text-orange-600",
  },
  {
    icon: CheckCircle,
    title: "Safe Medicine Disposal",
    description: "Proper methods for disposing of expired or unused medications.",
    color: "text-blue-600",
  },
  {
    icon: Search,
    title: "Understanding Drug Labels",
    description: "A guide to reading and understanding pharmaceutical packaging and labels.",
    color: "text-green-600",
  },
]

export default function MedicineScannerPage() {
  const [barcode, setBarcode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<{barcode: string, medicine: any} | null>(null)

  const handleImageScan = async (file: File) => {
    setIsScanning(true)
    setScanResult(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${process.env.NEXT_PUBLIC_ML_API_URL}/scan-barcode/`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Scan failed')
      const data = await res.json()
      setScanResult({ barcode: data.barcode, medicine: data.medicine })
    } catch (err) {
      // Optionally show toast
    } finally {
      setIsScanning(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "authentic":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Authentic</Badge>
      case "counterfeit":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Counterfeit</Badge>
      case "unknown":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Status Unknown</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "authentic":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "counterfeit":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Scan Your Medicine,
                <br />
                Ensure Your Safety.
              </h1>
              <p className="text-lg text-gray-600">
                Utilize DOKI's AI-powered scanner to instantly verify medicine authenticity and protect yourself from
                counterfeit products.
              </p>
              <label className="block">
                <span className="sr-only">Upload medicine barcode image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) handleImageScan(e.target.files[0]);
                  }}
                  disabled={isScanning}
                />
              </label>
              {isScanning && <div className="text-blue-600 mt-2">Scanning image...</div>}
              {scanResult && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow border border-blue-100">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">Scan Result</h3>
                  <div className="flex flex-col gap-2">
                    <div><span className="font-medium">Barcode:</span> {scanResult.barcode}</div>
                    {scanResult.medicine ? (
                      <div>
                        <span className="font-medium">Medicine:</span> {scanResult.medicine.name} <span className={`ml-2 px-2 py-1 rounded text-xs ${scanResult.medicine.status === 'authentic' ? 'bg-green-100 text-green-800' : scanResult.medicine.status === 'counterfeit' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{scanResult.medicine.status}</span>
                      </div>
                    ) : (
                      <div className="text-yellow-700">Medicine not found in database.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Medicine Scanner"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Manual Barcode Entry */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Manual Barcode Entry</CardTitle>
                <CardDescription>
                  Enter the barcode number or medicine name below if scanning isn't an option.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., 889850506009 or Paracetamol"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Use Camera
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Scans */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Recent Scans</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid gap-4">
              {recentScans.map((scan) => (
                <Card key={scan.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={scan.image || "/placeholder.svg"}
                        alt={scan.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(scan.status)}
                          <h3 className="font-semibold text-gray-900">{scan.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{scan.date}</p>
                      </div>
                      <div className="text-right">{getStatusBadge(scan.status)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Safety Alerts & Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <resource.icon className={`h-12 w-12 mx-auto mb-4 ${resource.color}`} />
                  <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
