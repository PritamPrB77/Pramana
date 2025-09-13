"use client"

import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Package, Truck, MapPin, Hash, Shield, Factory, BarChart3 } from "lucide-react"
import ChatbotWidget from "@/components/chatbot-widget"

// Dummy distributor data
const distributorData = {
  "distributor-001": {
    profile: {
      name: "Herbal Logistics Ltd.",
      email: "operations@herballogistics.com",
      image: "/distributor-company-logo.png",
      phone: "+91 98765 43212",
      license: "AYU-DIST-2024-001",
      established: "2015",
      gstNumber: "27ABCDE1234F1Z5",
    },
    distribution: {
      batchId: "ASH-2024-001",
      herbName: "Ashwagandha",
      quantityReceived: "500 kg",
      quantityProcessed: "480 kg",
      packagingType: "Vacuum Sealed",
      distributionDate: "2024-01-22",
      expiryDate: "2026-01-22",
      qualityCheck: "Passed",
      barcodeGenerated: true,
    },
    logistics: {
      warehouseLocation: "Mumbai Distribution Center",
      vehicleFleet: "15 vehicles",
      deliveryRadius: "500 km",
      averageDeliveryTime: "24-48 hours",
      temperatureControlled: true,
      gpsTracking: true,
      lastMilePartners: ["BlueDart", "DTDC", "Local Couriers"],
    },
    performance: {
      monthlyVolume: "50,000 kg",
      onTimeDelivery: "98.5%",
      customerSatisfaction: "4.8/5",
      returnRate: "0.2%",
      networkCoverage: "12 states",
    },
    location: {
      facility: "Mumbai Distribution Hub",
      address: "Andheri Industrial Estate, Mumbai, Maharashtra, India",
      coordinates: "19.1136° N, 72.8697° E",
      warehouseSize: "25,000 sq ft",
    },
    blockchain: {
      signatureHash: "0x3c4d5e6f7890abcdef1234567890abcd",
      transactionHash: "0xcdef1234567890abcdef1234567890cd",
      blockNumber: "15,234,569",
      timestamp: "2024-01-22T10:45:00Z",
    },
  },
}

export default function DistributorDashboard() {
  const router = useRouter()
  const params = useParams()
  const distributorId = params.id as string

  const distributor = distributorData[distributorId as keyof typeof distributorData]

  if (!distributor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Distributor not found</p>
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
              <h1 className="text-2xl font-bold text-foreground">Distributor Dashboard</h1>
              <p className="text-muted-foreground">Distribution processing and logistics information</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distributor Profile */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-primary" />
                Distributor Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <img
                  src={distributor.profile.image || "/placeholder.svg"}
                  alt={distributor.profile.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-primary"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{distributor.profile.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {distributor.profile.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    License: {distributor.profile.license}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Est. {distributor.profile.established}</Badge>
                    <Badge variant="outline">GST: {distributor.profile.gstNumber}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Distribution Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Batch ID</p>
                  <p className="font-semibold">{distributor.distribution.batchId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Herb Name</p>
                  <p className="font-semibold">{distributor.distribution.herbName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Received</p>
                  <p className="font-semibold">{distributor.distribution.quantityReceived}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processed</p>
                  <p className="font-semibold">{distributor.distribution.quantityProcessed}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Packaging</p>
                  <p className="font-semibold">{distributor.distribution.packagingType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality Check</p>
                  <Badge className="bg-green-100 text-green-800">{distributor.distribution.qualityCheck}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Distribution Date</p>
                  <p className="font-semibold">
                    {new Date(distributor.distribution.distributionDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p className="font-semibold">{new Date(distributor.distribution.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics Network */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Logistics Network
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Fleet</p>
                  <p className="font-semibold">{distributor.logistics.vehicleFleet}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Radius</p>
                  <p className="font-semibold">{distributor.logistics.deliveryRadius}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
                  <p className="font-semibold">{distributor.logistics.averageDeliveryTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Warehouse</p>
                  <p className="font-semibold">{distributor.logistics.warehouseLocation}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {distributor.logistics.temperatureControlled && (
                  <Badge variant="secondary">Temperature Controlled</Badge>
                )}
                {distributor.logistics.gpsTracking && <Badge variant="secondary">GPS Tracking</Badge>}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Last Mile Partners</p>
                <div className="flex gap-2 flex-wrap">
                  {distributor.logistics.lastMilePartners.map((partner) => (
                    <Badge key={partner} variant="outline">
                      {partner}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Volume</p>
                  <p className="font-semibold text-lg">{distributor.performance.monthlyVolume}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                  <p className="font-semibold text-lg text-green-600">{distributor.performance.onTimeDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Rating</p>
                  <p className="font-semibold text-lg text-yellow-600">
                    {distributor.performance.customerSatisfaction}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Return Rate</p>
                  <p className="font-semibold text-lg text-green-600">{distributor.performance.returnRate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Network Coverage</p>
                <p className="font-semibold">{distributor.performance.networkCoverage}</p>
              </div>
            </CardContent>
          </Card>

          {/* Facility Information */}
          <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Facility Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Facility Name</p>
                  <p className="font-semibold">{distributor.location.facility}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-semibold">{distributor.location.coordinates}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Warehouse Size</p>
                  <p className="font-semibold">{distributor.location.warehouseSize}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-semibold">{distributor.location.address}</p>
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
              <CardDescription>Cryptographic verification details for this distribution transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Signature Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">
                    {distributor.blockchain.signatureHash}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">
                    {distributor.blockchain.transactionHash}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Number</p>
                  <p className="font-semibold">{distributor.blockchain.blockNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-semibold">
                    {new Date(distributor.blockchain.timestamp).toLocaleDateString("en-IN", {
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
