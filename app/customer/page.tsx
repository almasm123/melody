"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Video,
  TruckIcon,
  Home,
  Beef,
  Milk,
  Carrot,
  ChefHat,
  Heart,
  Settings,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Farmer } from "@/lib/cart-utils";

export default function CustomerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    cartSummary,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getItemQuantity,
    canAddItem,
  } = useCart();

  const categories = [
    { id: "all", name: "All Products", icon: Home },
    { id: "chicken", name: "Desi Chicken", icon: ChefHat },
    { id: "mutton", name: "Organic Mutton", icon: Beef },
    { id: "milk", name: "Fresh Milk", icon: Milk },
    { id: "vegetables", name: "Vegetables", icon: Carrot },
    { id: "bulk", name: "Function Halls", icon: ShoppingCart },
  ];

  const farmers = [
    {
      id: 1,
      name: "Raju Goud",
      village: "Chevella",
      distance: "12 km",
      rating: 4.8,
      verified: true,
      products: [
        {
          type: "Goat",
          breed: "Osmanabadi",
          weight: "22-28 kg",
          age: "8 months",
          available: 8,
          price: 750,
          category: "mutton",
        },
      ],
      image: "/healthy-goat-farm-india.jpg",
    },
    {
      id: 2,
      name: "Lakshmi Farms",
      village: "Shankarpally",
      distance: "8 km",
      rating: 4.9,
      verified: true,
      products: [
        {
          type: "Desi Chicken",
          breed: "Country Chicken",
          weight: "1.2-1.8 kg",
          age: "6 months",
          available: 25,
          price: 420,
          category: "chicken",
        },
      ],
      image: "/desi-country-chicken-farm.jpg",
    },
    {
      id: 3,
      name: "Krishna Dairy",
      village: "Moinabad",
      distance: "15 km",
      rating: 4.7,
      verified: true,
      products: [
        {
          type: "Buffalo Milk",
          breed: "Murrah Buffalo",
          weight: "Per liter",
          age: "Fresh Daily",
          available: 50,
          price: 65,
          category: "milk",
        },
      ],
      image: "/dairy-buffalo-milk-farm.jpg",
    },
    {
      id: 4,
      name: "Srinivas Organic",
      village: "Vikarabad",
      distance: "20 km",
      rating: 4.6,
      verified: true,
      products: [
        {
          type: "Mixed Vegetables",
          breed: "Organic",
          weight: "Per kg",
          age: "Fresh Harvest",
          available: 100,
          price: 45,
          category: "vegetables",
        },
      ],
      image: "/organic-vegetable-farm-india.jpg",
    },
  ];

  const filteredFarmers = farmers.filter((farmer) => {
    // Category filter
    const matchesCategory =
      selectedCategory === "all" ||
      farmer.products.some((p) => p.category === selectedCategory);

    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.products.some(
        (p) =>
          p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/customer/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-primary">Melody</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Hyderabad Area
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/customer/orders">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/customer/cart">
                <Button variant="default" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartSummary.totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                      {cartSummary.totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for meat, milk, vegetables..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Category Pills */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex-shrink-0 gap-2"
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="font-medium">Verified Farmers</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              <span className="font-medium">Video Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <TruckIcon className="h-4 w-4 text-primary" />
              <span className="font-medium">Live Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Farmers List */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {selectedCategory === "all"
              ? "All Farmers"
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredFarmers.length} farmers available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <Card
              key={farmer.id}
              className="hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {/* Farmer Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={farmer.image || "/placeholder.svg"}
                  alt={farmer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {farmer.verified && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{farmer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {farmer.village} • {farmer.distance}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold">
                      {farmer.rating}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {farmer.products.map((product, idx) => (
                  <div key={idx} className="border-t pt-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {product.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.breed}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          ₹{product.price}/kg
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                      <div>
                        <span className="font-medium">Weight:</span>{" "}
                        {product.weight}
                      </div>
                      <div>
                        <span className="font-medium">Age:</span> {product.age}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Available:</span>{" "}
                        <span className="text-primary font-semibold">
                          {product.available} units
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1 bg-transparent"
                        onClick={() =>
                          alert(
                            `Viewing video for ${farmer.name}'s ${product.type}`
                          )
                        }
                      >
                        <Video className="h-4 w-4" />
                        View Video
                      </Button>
                      <div className="flex-1 flex items-center justify-center gap-1">
                        {(() => {
                          const currentQuantity = getItemQuantity(
                            farmer.id,
                            product.type,
                            product.breed
                          );
                          const canAdd = canAddItem(
                            farmer.id,
                            product.type,
                            product.breed,
                            product.available
                          );
                          const canIncrease =
                            currentQuantity < product.available;
                          const canDecrease = currentQuantity > 0;

                          if (currentQuantity === 0) {
                            return (
                              <Button
                                size="sm"
                                className="w-full"
                                disabled={!canAdd}
                                onClick={() =>
                                  addToCart(farmer as Farmer, product)
                                }
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                {canAdd ? "Add to Cart" : "Out of Stock"}
                              </Button>
                            );
                          }

                          return (
                            <div className="flex items-center gap-1 bg-primary/10 rounded-md p-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-primary/20"
                                disabled={!canDecrease}
                                onClick={() =>
                                  decreaseQuantity(
                                    `${farmer.id}-${product.type}-${product.breed}`
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()
                                  )
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-sm">
                                {currentQuantity}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-primary/20"
                                disabled={!canIncrease}
                                onClick={() =>
                                  increaseQuantity(
                                    `${farmer.id}-${product.type}-${product.breed}`
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()
                                  )
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk Order CTA */}
        {selectedCategory === "all" && (
          <Card className="mt-8 bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="text-2xl font-bold mb-2">
                Function Hall Bulk Orders
              </h3>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Need 20-80kg of fresh meat for weddings, ceremonies or events?
                Get special pricing with live cutting, video verification and
                guaranteed delivery.
              </p>
              <Link href="/customer/bulk">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90"
                >
                  Place Bulk Order
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
