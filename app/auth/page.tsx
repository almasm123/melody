"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sprout, ArrowLeft, Smartphone, Lock, ShieldCheck, UserPlus } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const router = useRouter()

  const [mode, setMode] = useState<"login" | "register">("login")
  const [step, setStep] = useState<"phone" | "otp" | "details">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    const existingUser = localStorage.getItem(`melody_user_${phone}`)
    if (mode === "login" && !existingUser) {
      alert("Phone number not registered. Please register first.")
      setMode("register")
      return
    }

    setStep("otp")
    alert(`Demo: OTP sent to ${phone}. Use any 6 digits to continue.`)
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    if (mode === "register") {
      const existingUser = localStorage.getItem(`melody_user_${phone}`)
      if (!existingUser) {
        setStep("details")
        return
      }
    }

    const userData = localStorage.getItem(`melody_user_${phone}`)
    if (userData) {
      localStorage.setItem("melody_current_user", userData)
      router.push("/customer")
    } else {
      alert("User not found. Please register.")
      setMode("register")
      setStep("phone")
    }
  }

  const handleRegister = async () => {
    if (!name || !address) {
      alert("Please fill all fields")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    const userData = {
      phone,
      name,
      address,
      roles: ["customer"], // Default role only
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(`melody_user_${phone}`, JSON.stringify(userData))
    localStorage.setItem("melody_current_user", JSON.stringify(userData))

    alert("Registration successful! Welcome to Melody.")
    router.push("/customer")
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url(/images/corn-field-sunset.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl border-2">
          <CardHeader className="space-y-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 mb-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <Sprout className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">Melody</span>
              </div>
            </div>

            <div className="text-center">
              <CardTitle className="text-2xl mb-2">{mode === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
              <CardDescription>
                {mode === "login"
                  ? "Login to start shopping from local farmers"
                  : "Register to get fresh products delivered"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === "phone" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center bg-muted px-3 rounded-lg border">
                      <span className="text-sm font-semibold">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="flex-1"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOTP}
                  disabled={isLoading || phone.length !== 10}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setMode(mode === "login" ? "register" : "login")}
                      className="ml-2 text-primary font-semibold underline"
                    >
                      {mode === "login" ? "Register" : "Login"}
                    </button>
                  </p>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 text-center text-lg tracking-widest"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    OTP sent to +91 {phone}
                    <button onClick={() => setStep("phone")} className="ml-2 text-primary underline">
                      Change
                    </button>
                  </p>
                </div>

                <Button onClick={handleVerifyOTP} disabled={isLoading || otp.length !== 6} className="w-full" size="lg">
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <Button variant="ghost" onClick={handleSendOTP} className="w-full" size="sm">
                  Resend OTP
                </Button>
              </>
            )}

            {step === "details" && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="House no, Street, Area, City"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleRegister} disabled={isLoading} className="w-full" size="lg">
                  <UserPlus className="h-5 w-5 mr-2" />
                  {isLoading ? "Creating Account..." : "Complete Registration"}
                </Button>
              </>
            )}

            <div className="flex items-center justify-center gap-2 pt-4 border-t">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Secure OTP Authentication</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4">
            <p className="text-sm text-center text-yellow-800">
              <strong>Demo Mode:</strong> Use any 10-digit phone and any 6-digit OTP
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
