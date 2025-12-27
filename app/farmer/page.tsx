"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import {
  Plus,
  Video,
  Package,
  IndianRupee,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
  Upload,
  Camera,
  ArrowLeft,
  TrendingUp,
  Clock,
} from "lucide-react"

export default function FarmerPage() {
  const [showAddStock, setShowAddStock] = useState(false)

  const farmerProfile = {
    name: "Raju Goud",
    village: "Chevella",
    phone: "+91 98765 43210",
    verified: true,
    totalEarnings: 45600,
    pendingOrders: 3,
    completedOrders: 28,
  }

  const stockItems = [
    {
      id: 1,
      type: "Goat",
      breed: "Osmanabadi",
      weight: "25 kg",
      age: "8 months",
      quantity: 5,
      price: 750,
      status: "available",
      videoUploaded: true,
    },
    {
      id: 2,
      type: "Sheep",
      breed: "Nellore",
      weight: "22 kg",
      age: "7 months",
      quantity: 3,
      price: 680,
      status: "available",
      videoUploaded: false,
    },
  ]

  const orders = [
    {
      id: "ORD-2401",
      customer: "Rahul K.",
      product: "Goat - 25kg",
      amount: 18750,
      status: "pending",
      date: "2025-12-24",
      time: "10:30 AM",
    },
    {
      id: "ORD-2398",
      customer: "Priya M.",
      product: "Sheep - 22kg",
      amount: 14960,
      status: "accepted",
      date: "2025-12-24",
      time: "09:15 AM",
    },
    {
      id: "ORD-2395",
      customer: "Function Hall",
      product: "4 Goats - 100kg",
      amount: 75000,
      status: "completed",
      date: "2025-12-23",
      time: "08:00 AM",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "accepted":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-secondary">Farmer Dashboard</h1>
                <p className="text-sm text-muted-foreground">{farmerProfile.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {farmerProfile.verified && (
                <Badge className="bg-accent text-accent-foreground">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Link href="/farmer/kyc">
                <Button variant="ghost" size="sm">
                  KYC Status
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold text-primary flex items-center">
                    <IndianRupee className="h-5 w-5" />
                    {farmerProfile.totalEarnings.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                  <p className="text-2xl font-bold text-yellow-700">{farmerProfile.pendingOrders}</p>
                </div>
                <Clock className="h-10 w-10 text-yellow-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-700">{farmerProfile.completedOrders}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="stock" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stock" className="gap-2">
              <Package className="h-4 w-4" />
              My Stock
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Stock Tab */}
          <TabsContent value="stock" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Available Stock</h2>
              <Dialog open={showAddStock} onOpenChange={setShowAddStock}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                    <Plus className="h-4 w-4" />
                    Add Stock
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Stock</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Animal Type</Label>
                      <Input placeholder="e.g., Goat, Sheep, Chicken" />
                    </div>
                    <div className="space-y-2">
                      <Label>Breed</Label>
                      <Input placeholder="e.g., Osmanabadi, Nellore" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Weight (kg)</Label>
                        <Input type="number" placeholder="25" />
                      </div>
                      <div className="space-y-2">
                        <Label>Age (months)</Label>
                        <Input type="number" placeholder="8" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity Available</Label>
                      <Input type="number" placeholder="5" />
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Verification Video</Label>
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <Camera className="h-4 w-4" />
                        Record Video
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Show animal clearly with order ID for verification
                      </p>
                    </div>
                    <Button className="w-full" onClick={() => setShowAddStock(false)}>
                      Add to Stock
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {stockItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-3 bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.type}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.breed}</p>
                    </div>
                    <Badge
                      className={
                        item.status === "available"
                          ? "bg-green-500/10 text-green-700 border-green-500/20"
                          : "bg-gray-500/10 text-gray-700 border-gray-500/20"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-semibold">{item.weight}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Age</p>
                      <p className="font-semibold">{item.age}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="font-semibold">{item.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Price/kg</p>
                      <p className="font-semibold text-primary">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    {item.videoUploaded ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-700">Video Verified</p>
                          <p className="text-xs text-muted-foreground">Admin approved</p>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                          <Video className="h-4 w-4" />
                          View
                        </Button>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-yellow-700">Video Required</p>
                          <p className="text-xs text-muted-foreground">Upload for verification</p>
                        </div>
                        <Button size="sm" className="gap-1 bg-secondary hover:bg-secondary/90">
                          <Upload className="h-4 w-4" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-lg font-bold">Recent Orders</h2>

            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-3 bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.date} • {order.time}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {order.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Customer</p>
                        <p className="font-semibold">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-bold text-primary text-lg">₹{order.amount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">{order.product}</p>
                    </div>

                    {order.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                          Accept Order
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Decline
                        </Button>
                      </div>
                    )}

                    {order.status === "accepted" && (
                      <Button size="sm" className="w-full gap-2" variant="secondary">
                        <Video className="h-4 w-4" />
                        Upload Pickup Video
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Help Banner */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Important Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Upload clear verification videos showing animal condition and weight</li>
                  <li>• Accept orders within 2 hours for fast delivery</li>
                  <li>• Keep stock updated to avoid cancellations</li>
                  <li>• Payments processed within 1-3 days after delivery</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
