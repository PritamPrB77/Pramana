"use client"

import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Package, Factory, MapPin, Hash, Shield, Beaker } from "lucide-react"
import ChatbotWidget from "@/components/chatbot-widget"

// Dummy manufacturer data
const manufacturerData = {
  "manufacturer-001": {
    profile: {
      name: "Pure Ayurveda Pvt Ltd.",
      email: "quality@pureayurveda.com",
      image: "/manufacturer-company-logo.png",
      phone: "+91 98765 43213",
      license: "AYU-MFG-2024-001",
      established: "2010",
      gmpCertified: true,
      isoCertified: "ISO 9001:2015",
    },
    manufacturing: {
      batchId: "ASH-2024-001",
      herbName: "Ashwagandha",
      quantityReceived: "480 kg",
      finalProducts: [
        { name: "Ashwagandha Powder", quantity: "200 kg", packaging: "500g pouches" },
        { name: "Ashwagandha Capsules", quantity: "150,000 capsules", packaging: "60-count bottles" },
        { name: "Ashwagandha Extract", quantity: "50 kg", packaging: "100ml bottles" },
      ],
      manufacturingDate: "2024-01-25",
      expiryDate: "2026-01-25",
      qualityTests: ["Heavy Metals", "Microbial", "Pesticide Residue", "Potency"],
      batchCertificate: "BC-ASH-2024-001",
    },
    qualityControl: {
      labTested: true,
      testingLab: "NABL Accredited Lab",
      testResults: {
        purity: "99.8%",
        potency: "5.2% Withanolides",
        heavyMetals: "Within Limits",
        microbial: "Passed",
        pesticides: "Not Detected",
      },
      certifications: ["AYUSH", "FSSAI", "GMP", "ISO"],
    },
    facility: {
      name: "Pune Manufacturing Unit",
      address: "MIDC Industrial Area, Pune, Maharashtra, India",
      coordinates: "18.5204° N, 73.8567° E",
      capacity: "100 tons/month",
      cleanRoomGrade: "Grade D",
      employees: "150+",
    },
    blockchain: {
      signatureHash: "0x4d5e6f7890abcdef1234567890abcdef",
      transactionHash: "0xdef1234567890abcdef1234567890def",
      blockNumber: "15,234,570",
      timestamp: "2024-01-25T16:20:00Z",
    },
  },
}

export default function ManufacturerDashboard() {
  const router = useRouter()
  const params = useParams()
  const manufacturerId = params.id as string

  const manufacturer = manufacturerData[manufacturerId as keyof typeof manufacturerData]

  if (!manufacturer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Manufacturer not found</p>
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
              <h1 className="text-2xl font-bold text-foreground">Manufacturer Dashboard</h1>
              <p className="text-muted-foreground">Final processing and quality assurance information</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Manufacturer Profile */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-primary" />
                Manufacturer Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <img
                  src={manufacturer.profile.image || "/placeholder.svg"}
                  alt={manufacturer.profile.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-primary"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{manufacturer.profile.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {manufacturer.profile.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    License: {manufacturer.profile.license}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">Est. {manufacturer.profile.established}</Badge>
                    {manufacturer.profile.gmpCertified && <Badge className="bg-green-100 text-green-800">GMP</Badge>}
                    <Badge variant="outline">{manufacturer.profile.isoCertified}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manufacturing Details */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Manufacturing Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Batch ID</p>
                  <p className="font-semibold">{manufacturer.manufacturing.batchId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Raw Material</p>
                  <p className="font-semibold">{manufacturer.manufacturing.herbName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity Received</p>
                  <p className="font-semibold">{manufacturer.manufacturing.quantityReceived}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Batch Certificate</p>
                  <p className="font-semibold">{manufacturer.manufacturing.batchCertificate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Manufacturing Date</p>
                  <p className="font-semibold">
                    {new Date(manufacturer.manufacturing.manufacturingDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p className="font-semibold">
                    {new Date(manufacturer.manufacturing.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Products */}
          <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Final Products
              </CardTitle>
              <CardDescription>Products manufactured from this batch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {manufacturer.manufacturing.finalProducts.map((product, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Quantity:</span> {product.quantity}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Packaging:</span> {product.packaging}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Control */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-primary" />
                Quality Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Testing Laboratory</p>
                <p className="font-semibold">{manufacturer.qualityControl.testingLab}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Purity</p>
                  <p className="font-semibold text-green-600">{manufacturer.qualityControl.testResults.purity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Potency</p>
                  <p className="font-semibold text-green-600">{manufacturer.qualityControl.testResults.potency}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Heavy Metals</p>
                  <p className="font-semibold text-green-600">{manufacturer.qualityControl.testResults.heavyMetals}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pesticides</p>
                  <p className="font-semibold text-green-600">{manufacturer.qualityControl.testResults.pesticides}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Quality Tests Performed</p>
                <div className="flex gap-2 flex-wrap">
                  {manufacturer.manufacturing.qualityTests.map((test) => (
                    <Badge key={test} className="bg-blue-100 text-blue-800">
                      {test}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                <div className="flex gap-2 flex-wrap">
                  {manufacturer.qualityControl.certifications.map((cert) => (
                    <Badge key={cert} className="bg-green-100 text-green-800">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facility Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Manufacturing Facility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Facility Name</p>
                <p className="font-semibold">{manufacturer.facility.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-semibold">{manufacturer.facility.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold">{manufacturer.facility.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clean Room Grade</p>
                  <p className="font-semibold">{manufacturer.facility.cleanRoomGrade}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employees</p>
                  <p className="font-semibold">{manufacturer.facility.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-semibold">{manufacturer.facility.coordinates}</p>
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
              <CardDescription>Cryptographic verification details for this manufacturing transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Signature Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">
                    {manufacturer.blockchain.signatureHash}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">
                    {manufacturer.blockchain.transactionHash}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Number</p>
                  <p className="font-semibold">{manufacturer.blockchain.blockNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-semibold">
                    {new Date(manufacturer.blockchain.timestamp).toLocaleDateString("en-IN", {
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
