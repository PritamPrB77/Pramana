"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { QrReader } from "react-qr-reader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { QrCode, Search, Leaf } from "lucide-react"

export default function ScannerPage() {
  const [batchId, setBatchId] = useState("")
  const [scanResult, setScanResult] = useState("")
  const [showScanner, setShowScanner] = useState(false)
  const router = useRouter()

  const handleScan = (result: any) => {
    if (result) {
      setScanResult(result.text)
      setBatchId(result.text)
      setShowScanner(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (batchId.trim()) {
      router.push(`/transactions?batchId=${encodeURIComponent(batchId)}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ayurvedic Herb Traceability</h1>
              <p className="text-muted-foreground">Track your herbs from farm to consumer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* QR Scanner Section */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <QrCode className="w-6 h-6 text-primary" />
                QR Code Scanner
              </CardTitle>
              <CardDescription>Scan the QR code on your Ayurvedic herb package to trace its journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showScanner ? (
                <div className="space-y-4">
                  <div className="aspect-square max-w-sm mx-auto overflow-hidden rounded-lg border">
                    <QrReader
                      onResult={handleScan}
                      constraints={{ facingMode: "environment" }}
                      className="w-full h-full"
                    />
                  </div>
                  <Button variant="outline" onClick={() => setShowScanner(false)} className="w-full">
                    Cancel Scan
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowScanner(true)}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Start QR Scan
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Manual Input Section */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Manual Batch ID Entry
              </CardTitle>
              <CardDescription>Enter your batch ID manually if you don't have a QR code</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Enter Batch ID (e.g., ASH-2024-001)"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="text-center text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                  disabled={!batchId.trim()}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Track Herb Journey
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">How it works</h3>
                <p className="text-sm text-muted-foreground">
                  Each Ayurvedic herb package has a unique batch ID that tracks its complete journey through blockchain
                  technology - from the farmer who grew it, to the collector who harvested it, to the distributor who
                  processed it.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
