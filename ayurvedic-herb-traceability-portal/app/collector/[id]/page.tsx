"use client"

import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Mail, Package, Truck, MapPin, Hash, Shield } from "lucide-react"
import ChatbotWidget from "@/components/chatbot-widget"

// Dummy collector data
const collectorData = {
  "collector-001": {
    profile: {
      name: "Ayurvedic Herbs Co.",
      email: "operations@ayurvedicco.in",
      image: "/collector-company-logo.png",
      phone: "+91 98765 43211",
      license: "AYU-COL-2024-001",
      established: "2018",
    },
    collection: {
      batchId: "ASH-2024-001",
      herbName: "Ashwagandha",
      quantityCollected: "500 kg",
      qualityGrade: "Premium A+",
      collectionDate: "2024-01-20",
      storageCondition: "Climate Controlled",
      moistureContent: "8.5%",
      purityLevel: "99.2%",
    },
    logistics: {
      vehicleNumber: "KL-07-AB-1234",
      driverName: "Suresh Nair",
      routeOptimized: true,
      estimatedDelivery: "2024-01-22",
      trackingId: "TRK-ASH-20240120-001",
      temperatureMonitored: true,
    },
    location: {
      facility: "Kochi Processing Center",
      address: "Industrial Area, Kochi, Kerala, India",
      coordinates: "9.9312° N, 76.2673° E",
      storageCapacity: "10,000 kg",
    },
    blockchain: {
      signatureHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
      transactionHash: "0xbcdef1234567890abcdef1234567890b",
      blockNumber: "15,234,568",
      timestamp: "2024-01-20T14:15:00Z",
    },
  },
}

export default function CollectorDashboard() {
  const router = useRouter()
  const params = useParams()
  const collectorId = params.id as string

  const collector = collectorData[collectorId as keyof typeof collectorData]

  if (!collector) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Collector not found</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Scanner
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Collector Dashboard</h1>
              <p className="text-muted-foreground">Quality collection and processing information</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Collector Profile */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Collector Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <img
                  src={collector.profile.image || "/placeholder.svg"}
                  alt={collector.profile.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-primary"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{collector.profile.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {collector.profile.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    License: {collector.profile.license}
                  </div>
                  <Badge variant="secondary">Est. {collector.profile.established}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collection Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Collection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Batch ID</p>
                  <p className="font-semibold">{collector.collection.batchId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Herb Name</p>
                  <p className="font-semibold">{collector.collection.herbName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold">{collector.collection.quantityCollected}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality Grade</p>
                  <Badge className="bg-green-100 text-green-800">{collector.collection.qualityGrade}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Moisture Content</p>
                  <p className="font-semibold">{collector.collection.moistureContent}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purity Level</p>
                  <p className="font-semibold">{collector.collection.purityLevel}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Logistics & Transport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Number</p>
                  <p className="font-semibold">{collector.logistics.vehicleNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Driver</p>
                  <p className="font-semibold">{collector.logistics.driverName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tracking ID</p>
                  <p className="font-mono text-sm">{collector.logistics.trackingId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Date</p>
                  <p className="font-semibold">
                    {new Date(collector.logistics.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {collector.logistics.routeOptimized && <Badge variant="secondary">Route Optimized</Badge>}
                {collector.logistics.temperatureMonitored && <Badge variant="secondary">Temperature Monitored</Badge>}
              </div>
            </CardContent>
          </Card>

          {/* Facility Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Facility Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Facility Name</p>
                <p className="font-semibold">{collector.location.facility}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-semibold">{collector.location.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-semibold">{collector.location.coordinates}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage Capacity</p>
                  <p className="font-semibold">{collector.location.storageCapacity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Information */}
          <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Blockchain Information
              </CardTitle>
              <CardDescription>Cryptographic verification details for this collection transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Signature Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">
                    {collector.blockchain.signatureHash}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">
                    {collector.blockchain.transactionHash}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Number</p>
                  <p className="font-semibold">{collector.blockchain.blockNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-semibold">
                    {new Date(collector.blockchain.timestamp).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  )
}
