"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Package, Play, Pause, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SubscriptionsPage() {
  const [activeSubscriptions, setActiveSubscriptions] = useState([
    {
      id: 1,
      type: "Daily Milk",
      quantity: "2 Liters",
      farmer: "Rama Krishna - Kollur",
      price: 120,
      frequency: "Daily at 6:00 AM",
      status: "active",
      nextDelivery: "Tomorrow",
      savings: 180,
    },
    {
      id: 2,
      type: "Weekly Vegetables",
      quantity: "5 kg Mixed",
      farmer: "Venkat Farms - Chevella",
      price: 350,
      frequency: "Every Sunday",
      status: "active",
      nextDelivery: "Sun, Dec 29",
      savings: 100,
    },
  ])

  const [pausedSubscriptions] = useState([
    {
      id: 3,
      type: "Monthly Eggs",
      quantity: "30 Eggs",
      farmer: "Lakshmi Poultry - Shamshabad",
      price: 180,
      frequency: "1st of every month",
      status: "paused",
      pausedUntil: "Jan 15, 2026",
    },
  ])

  const pauseSubscription = (id: number) => {
    alert(`Subscription #${id} paused. You can resume anytime!`)
  }

  const resumeSubscription = (id: number) => {
    alert(`Subscription #${id} resumed. Next delivery scheduled!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/customer">
                <Button variant="ghost" size="icon" className="hover:bg-green-50">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-farm-green">My Subscriptions</h1>
                <p className="text-sm text-muted-foreground">Save time & money with regular deliveries</p>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-farm-green hover:bg-farm-green/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Subscription
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Subscription</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Subscription Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="milk">Daily Milk</SelectItem>
                        <SelectItem value="veg">Weekly Vegetables</SelectItem>
                        <SelectItem value="eggs">Monthly Eggs</SelectItem>
                        <SelectItem value="chicken">Weekly Desi Chicken</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input placeholder="e.g., 2 Liters, 5 kg" />
                  </div>
                  <div>
                    <Label>Delivery Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6am">6:00 AM</SelectItem>
                        <SelectItem value="7am">7:00 AM</SelectItem>
                        <SelectItem value="8am">8:00 AM</SelectItem>
                        <SelectItem value="evening">6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-farm-green hover:bg-farm-green/90">Start Subscription - Save 15%</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Benefits Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-farm-green to-green-600 text-white">
          <div className="flex items-start gap-4">
            <Package className="w-12 h-12" />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Subscription Benefits</h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Save 15-20%</div>
                  <div className="opacity-90">Lower prices than regular orders</div>
                </div>
                <div>
                  <div className="font-semibold">₹100 Wallet Bonus</div>
                  <div className="opacity-90">On your first subscription</div>
                </div>
                <div>
                  <div className="font-semibold">Pause Anytime</div>
                  <div className="opacity-90">Flexible schedule control</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Subscriptions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-farm-green" />
            Active Subscriptions ({activeSubscriptions.length})
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {activeSubscriptions.map((sub) => (
              <Card key={sub.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{sub.type}</h3>
                    <p className="text-sm text-muted-foreground">{sub.farmer}</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-semibold">{sub.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="font-semibold">{sub.frequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Delivery:</span>
                    <span className="font-semibold text-farm-green">{sub.nextDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Price:</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">₹{sub.price}</div>
                      <div className="text-xs text-green-600">Saving ₹{sub.savings}/month</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => pauseSubscription(sub.id)}>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Modify
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Paused Subscriptions */}
        {pausedSubscriptions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Pause className="w-5 h-5 text-orange-500" />
              Paused Subscriptions ({pausedSubscriptions.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {pausedSubscriptions.map((sub) => (
                <Card key={sub.id} className="p-6 bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{sub.type}</h3>
                      <p className="text-sm text-muted-foreground">{sub.farmer}</p>
                    </div>
                    <Badge variant="secondary">Paused</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Paused Until:</span>
                      <span className="font-semibold">{sub.pausedUntil}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Price:</span>
                      <span className="font-bold text-lg">₹{sub.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-farm-green hover:bg-farm-green/90"
                      onClick={() => resumeSubscription(sub.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                    <Button variant="outline" className="text-red-600 bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
