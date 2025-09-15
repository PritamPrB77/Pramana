// "use client"

// import { useState } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   Leaf,
//   Thermometer,
//   Droplets,
//   Cloud,
//   MapPin,
//   Hash,
//   Camera,
//   CheckCircle,
// } from "lucide-react"
// import dynamic from "next/dynamic"
// import ChatbotWidget from "@/components/chatbot-widget"

// // Dynamically import the map component to avoid SSR issues
// const MapComponent = dynamic(() => import("@/components/map-component"), {
//   ssr: false,
//   loading: () => <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">Loading map...</div>,
// })

// // Dummy farmer data
// const farmerData = {
//   "farmer-001": {
//     profile: {
//       name: "Rajesh Kumar",
//       email: "rajesh.kumar@ayurvedic-farm.in",
//       image: "",
    
//       experience: "10 years",
//     },
//     crop: {
//       name: "Ashwagandha",
//       variant: "Withania Somnifera",
//       quantity: "500 kg",
//       condition: "Excellent",
//       harvestDate: "2024-01-15",
//       certifications: ["Organic", "Ayush Certified"],
//     },
//     weather: {
//       temperature: "28°C",
//       humidity: "65%",
//       rainfall: "120mm",
//       season: "Post-Monsoon",
//       soilMoisture: "Optimal",
//     },
//     location: {
//       latitude: 10.8505,
//       longitude: 76.2711,
//       address: "Khordha District, Bhubaneswar, India",
//       farmSize: "5 acres",
//     },
//     blockchain: {
//       signatureHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
//       transactionHash: "0xabcdef1234567890abcdef1234567890",
//       blockNumber: "15,234,567",
//       timestamp: "2024-01-15T08:30:00Z",
//     },
//   },
// }

// export default function FarmerDashboard() {
//   const router = useRouter()
//   const params = useParams()
//   const farmerId = params.id as string
//   const [predictionResult, setPredictionResult] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const farmer = farmerData[farmerId as keyof typeof farmerData]

//   if (!farmer) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card>
//           <CardContent className="pt-6">
//             <p>Farmer not found</p>
//             <Button onClick={() => router.push("/")} className="mt-4">
//               Back to Scanner
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   const handlePredictHerb = async () => {
//     setIsLoading(true)
//     // Simulate API call
//     setTimeout(() => {
//       setPredictionResult("Ashwagandha Detected ✅")
//       setIsLoading(false)
//     }, 2000)
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border bg-card">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
//               <ArrowLeft className="w-4 h-4" />
//               Back
//             </Button>
//             <div>
//               <h1 className="text-2xl font-bold text-foreground">Farmer Dashboard</h1>
//               <p className="text-muted-foreground">Detailed information about the herb producer</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Farmer Profile */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <User className="w-5 h-5 text-primary" />
//                 Farmer Profile
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-start gap-4">
//                 <img
//                   src={farmer.profile.image || "/placeholder.svg"}
//                   alt={farmer.profile.name}
//                   className="w-20 h-20 rounded-full object-cover border-2 border-primary"
//                 />
//                 <div className="flex-1 space-y-2">
//                   <h3 className="text-xl font-semibold">{farmer.profile.name}</h3>
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <Mail className="w-4 h-4" />
//                     {farmer.profile.email}
//                   </div>
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <User className="w-4 h-4" />
//                     {farmer.profile.experience} experience
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Crop Information */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Leaf className="w-5 h-5 text-primary" />
//                 Crop Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Herb Name</p>
//                   <p className="font-semibold">{farmer.crop.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Variant</p>
//                   <p className="font-semibold">{farmer.crop.variant}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Quantity</p>
//                   <p className="font-semibold">{farmer.crop.quantity}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Condition</p>
//                   <Badge className="bg-green-100 text-green-800">{farmer.crop.condition}</Badge>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 {farmer.crop.certifications.map((cert) => (
//                   <Badge key={cert} variant="secondary">
//                     {cert}
//                   </Badge>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Weather Information */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Cloud className="w-5 h-5 text-primary" />
//                 Weather Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center gap-2">
//                   <Thermometer className="w-4 h-4 text-orange-500" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Temperature</p>
//                     <p className="font-semibold">{farmer.weather.temperature}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Droplets className="w-4 h-4 text-blue-500" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Humidity</p>
//                     <p className="font-semibold">{farmer.weather.humidity}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Cloud className="w-4 h-4 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Rainfall</p>
//                     <p className="font-semibold">{farmer.weather.rainfall}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Leaf className="w-4 h-4 text-green-500" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Season</p>
//                     <p className="font-semibold">{farmer.weather.season}</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Location Information with Map */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-primary" />
//                 Location Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Latitude</p>
//                   <p className="font-semibold">{farmer.location.latitude}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Longitude</p>
//                   <p className="font-semibold">{farmer.location.longitude}</p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Address</p>
//                 <p className="font-semibold">{farmer.location.address}</p>
//               </div>
//               <div className="w-full h-64 rounded-lg overflow-hidden border">
//                 <MapComponent
//                   latitude={farmer.location.latitude}
//                   longitude={farmer.location.longitude}
//                   address={farmer.location.address}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Blockchain Information */}
//           <Card className="shadow-lg lg:col-span-2">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Hash className="w-5 h-5 text-primary" />
//                 Blockchain Information
//               </CardTitle>
//               <CardDescription>Cryptographic verification details for this transaction</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Signature Hash</p>
//                   <p className="font-mono text-sm break-all bg-muted p-2 rounded">{farmer.blockchain.signatureHash}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Transaction Hash</p>
//                   <p className="font-mono text-sm break-all bg-muted p-2 rounded">
//                     {farmer.blockchain.transactionHash}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Block Number</p>
//                   <p className="font-semibold">{farmer.blockchain.blockNumber}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Timestamp</p>
//                   <p className="font-semibold">
//                     {new Date(farmer.blockchain.timestamp).toLocaleDateString("en-IN", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Herb Prediction */}
//           <Card className="shadow-lg lg:col-span-2">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Camera className="w-5 h-5 text-primary" />
//                 Herb Prediction from Image
//               </CardTitle>
//               <CardDescription>Use AI to identify and verify the herb from uploaded images</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <Button onClick={handlePredictHerb} disabled={isLoading} className="bg-primary hover:bg-primary/90">
//                   <Camera className="w-4 h-4 mr-2" />
//                   {isLoading ? "Analyzing..." : "Predict Herb from Image"}
//                 </Button>
//                 {predictionResult && (
//                   <div className="flex items-center gap-2 text-green-600">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">{predictionResult}</span>
//                   </div>
//                 )}
//               </div>
//               {isLoading && (
//                 <div className="w-full bg-muted rounded-full h-2">
//                   <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "60%" }} />
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </main>

//       {/* Chatbot Widget */}
//       <ChatbotWidget />
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  User,
  Mail,
  Leaf,
  Thermometer,
  Droplets,
  Cloud,
  MapPin,
  Hash,
  Camera,
  CheckCircle,
} from "lucide-react"
import dynamic from "next/dynamic"
import ChatbotWidget from "@/components/chatbot-widget"

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">Loading map...</div>,
})

// Dummy farmer data
const farmerData = {
  "farmer-001": {
    profile: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@ayurvedic-farm.in",
      image: "",
      experience: "10 years",
    },
    crop: {
      name: "Ashwagandha",
      variant: "Withania Somnifera",
      quantity: "500 kg",
      condition: "Excellent",
      harvestDate: "2024-01-15",
      certifications: ["Organic", "Ayush Certified"],
    },
    weather: {
      temperature: "28°C",
      humidity: "65%",
      rainfall: "120mm",
      season: "Post-Monsoon",
      soilMoisture: "Optimal",
    },
    location: {
      latitude: 10.8505,
      longitude: 76.2711,
      address: "Khordha District, Bhubaneswar, India",
      farmSize: "5 acres",
      // apiKey:"7a67e4ad91464b5881b5f9f28d57ee5f"
    },
    blockchain: {
      signatureHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      transactionHash: "0xabcdef1234567890abcdef1234567890",
      blockNumber: "15,234,567",
      timestamp: "2024-01-15T08:30:00Z",
    },
  },
}

export default function FarmerDashboard() {
  const router = useRouter()
  const params = useParams()
  const farmerId = params.id as string
  const farmer = farmerData[farmerId as keyof typeof farmerData]

  // State for herb prediction
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [organ, setOrgan] = useState("leaf")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!farmer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Farmer not found</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Scanner
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  // Handle herb prediction API
  const handlePredictHerb = async () => {
    if (!image) {
      alert("Please select an image first!")
      return
    }
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("organ", organ)

      const response = await fetch("http://localhost:5000/api/identify", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Server error")

      const data = await response.json()
      if (data.results && data.results.length > 0) {
        setResult(data.results[0])
      } else {
        setError("No results found")
      }
    } catch (err) {
      console.error(err)
      setError("Failed to identify herb")
    } finally {
      setLoading(false)
    }
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
              <h1 className="text-2xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Detailed information about the herb producer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Farmer Profile */}
          {/* ---- KEEPING SAME SECTIONS ---- */}
          {/* Crop Info, Weather Info, Location Info, Blockchain Info remain unchanged */}
           <Card className="shadow-lg">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <User className="w-5 h-5 text-primary" />
                 Farmer Profile
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="flex items-start gap-4">
                  <img
                  src={farmer.profile.image || "/placeholder.svg"}
                  alt={farmer.profile.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{farmer.profile.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {farmer.profile.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    {farmer.profile.experience} experience
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Crop Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Herb Name</p>
                  <p className="font-semibold">{farmer.crop.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Variant</p>
                  <p className="font-semibold">{farmer.crop.variant}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold">{farmer.crop.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <Badge className="bg-green-100 text-green-800">{farmer.crop.condition}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                {farmer.crop.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-primary" />
                Weather Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="font-semibold">{farmer.weather.temperature}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{farmer.weather.humidity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rainfall</p>
                    <p className="font-semibold">{farmer.weather.rainfall}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Season</p>
                    <p className="font-semibold">{farmer.weather.season}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information with Map */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Latitude</p>
                  <p className="font-semibold">{farmer.location.latitude}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Longitude</p>
                  <p className="font-semibold">{farmer.location.longitude}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-semibold">{farmer.location.address}</p>
              </div>
              <div className="w-full h-64 rounded-lg overflow-hidden border">
                <MapComponent
                  latitude={farmer.location.latitude}
                  longitude={farmer.location.longitude}
                  address={farmer.location.address}

                />
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
              <CardDescription>Cryptographic verification details for this transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Signature Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">{farmer.blockchain.signatureHash}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Hash</p>
                  <p className="font-mono text-sm break-all bg-muted p-2 rounded">
                    {farmer.blockchain.transactionHash}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Number</p>
                  <p className="font-semibold">{farmer.blockchain.blockNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-semibold">
                    {new Date(farmer.blockchain.timestamp).toLocaleDateString("en-IN", {
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
          {/* Herb Prediction */}
          <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Herb Prediction from Image
              </CardTitle>
              <CardDescription>Use AI to identify and verify the herb from uploaded images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload */}
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {/* Organ selection */}
              <div>
                <label className="mr-2 font-semibold">Organ Type:</label>
                <select
                  value={organ}
                  onChange={(e) => setOrgan(e.target.value)}
                  className="px-2 py-1 border rounded"
                >
                  <option value="leaf">Leaf</option>
                  <option value="flower">Flower</option>
                  <option value="fruit">Fruit</option>
                  <option value="bark">Bark</option>
                  <option value="stem">Stem</option>
                </select>
              </div>

              {/* Upload Button */}
              <Button onClick={handlePredictHerb} disabled={loading} className="bg-primary hover:bg-primary/90">
                <Camera className="w-4 h-4 mr-2" />
                {loading ? "Identifying..." : "Predict Herb from Image"}
              </Button>

              {/* Preview */}
              {preview && (
                <div className="mt-4">
                  <img src={preview} alt="Preview" className="w-48 rounded border" />
                </div>
              )}

              {/* Result */}
              {result && (
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-bold mb-2">
                    {result.species.scientificNameWithoutAuthor || "Unknown"}
                  </h2>
                  <p>
                    <strong>Score:</strong> {(result.score * 100).toFixed(2)}%
                  </p>
                  <p>
                    <strong>Common Names:</strong>{" "}
                    {result.species.commonNames ? result.species.commonNames.join(", ") : "N/A"}
                  </p>
                  <p>
                    <strong>Genus:</strong> {result.species.genus.scientificNameWithoutAuthor}
                  </p>
                  <p>
                    <strong>Family:</strong> {result.species.family.scientificNameWithoutAuthor}
                  </p>
                  <p>
                    <strong>Organ Type:</strong> {organ}
                  </p>
                </div>
              )}

              {/* Error */}
              {error && <p className="text-red-600 mt-4">{error}</p>}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  )
}
