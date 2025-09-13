"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, MapPin, User, Package, Truck, Factory } from "lucide-react"

// Dummy transaction data
const transactionData = [
  {
    id: "farmer-001",
    role: "Farmer",
    name: "Rajesh Kumar",
    timestamp: "2024-01-15T08:30:00Z",
    location: "Bhubaneswar,Odisha, India",
    action: "Herb Cultivation",
    icon: User,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "collector-001",
    role: "Collector",
    name: "Ayurvedic Herbs Co.",
    timestamp: "2024-01-20T14:15:00Z",
    location: "Kochi, Kerala",
    action: "Quality Collection",
    icon: Package,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "distributor-001",
    role: "Distributor",
    name: "Herbal Logistics Ltd.",
    timestamp: "2024-01-22T10:45:00Z",
    location: "Mumbai, Maharashtra",
    action: "Distribution Processing",
    icon: Truck,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "manufacturer-001",
    role: "Manufacturer",
    name: "Pure Ayurveda Pvt Ltd.",
    timestamp: "2024-01-25T16:20:00Z",
    location: "Pune, Maharashtra",
    action: "Final Processing",
    icon: Factory,
    color: "bg-purple-100 text-purple-800",
  },
]

export default function TransactionsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const batchId = searchParams.get("batchId") || "ASH-2024-001"

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleTransactionClick = (transaction: any) => {
    const roleRoute = transaction.role.toLowerCase()
    router.push(`/${roleRoute}/${transaction.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Scanner
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Blockchain Transactions</h1>
              <p className="text-muted-foreground">Batch ID: {batchId}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Transaction Timeline</h2>
            <p className="text-muted-foreground">
              Follow the complete journey of your Ayurvedic herbs through the supply chain
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {transactionData.map((transaction, index) => {
              const Icon = transaction.icon
              const isLast = index === transactionData.length - 1

              return (
                <div key={transaction.id} className="relative">
                  {/* Timeline line */}
                  {!isLast && <div className="absolute left-6 top-16 w-0.5 h-16 bg-border" />}

                  {/* Transaction card */}
                  <Card
                    className="ml-16 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-10 top-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {transaction.name}
                            <Badge className={transaction.color}>{transaction.role}</Badge>
                          </CardTitle>
                          <CardDescription className="mt-1">{transaction.action}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(transaction.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {transaction.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Summary Card */}
          <Card className="mt-8 bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">Verification Complete</h3>
                <p className="text-sm text-muted-foreground">
                  This herb has been verified through {transactionData.length} blockchain transactions, ensuring
                  complete traceability from farm to your hands.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
