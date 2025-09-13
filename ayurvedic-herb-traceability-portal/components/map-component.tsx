"use client"
import { MapPin } from "lucide-react"

interface MapComponentProps {
  latitude: number
  longitude: number
  address: string
}

export default function MapComponent({ latitude, longitude, address }: MapComponentProps) {
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(${longitude},${latitude})/${longitude},${latitude},13/300x200?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-muted">
      <img
        src={mapUrl || "/placeholder.svg"}
        alt={`Map showing location: ${address}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to OpenStreetMap static image if Mapbox fails
          const target = e.target as HTMLImageElement
          target.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`
        }}
      />
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
        <div className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3 text-emerald-600" />
          <span className="font-medium">Farm Location</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{address}</p>
      </div>
    </div>
  )
}
