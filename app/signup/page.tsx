"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from "@/lib/store"
import { mockAuthApi, type UserRole } from "@/lib/mock-api"
import { Leaf, AlertCircle, Loader2, CheckCircle } from "lucide-react"

const ROLE_OPTIONS = [
  { value: "farmer" as UserRole, label: "Farmer", desc: "Grow and sell produce" },
  { value: "vendor" as UserRole, label: "Vendor", desc: "Buy fresh produce" },
  { value: "logistics" as UserRole, label: "Logistics", desc: "Manage deliveries" },
  { value: "admin" as UserRole, label: "Admin", desc: "Oversee platform" },
]

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setUser = useAuthStore((state) => state.setUser)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>((searchParams.get("role") as UserRole) || "farmer")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { user, token } = await mockAuthApi.signup({
        name,
        email,
        password,
        role,
      })

      setUser(user, token)
      setSuccess(true)

      setTimeout(() => {
        const dashboards: Record<string, string> = {
          farmer: "/farmer",
          vendor: "/vendor",
          logistics: "/logistics",
          admin: "/admin",
        }
        router.push(dashboards[user.role] || "/")
      }, 1000)
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Soko Yetu</span>
          </div>
          <p className="text-muted-foreground">Join our agricultural marketplace</p>
        </div>

        {/* Signup Card */}
        <Card className="p-8 border-border">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Create Account</h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">Account created successfully!</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="text-foreground font-semibold mb-3 block">I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={`p-3 rounded-lg border-2 transition ${
                      role === opt.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-xs mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div>
              <Label htmlFor="name" className="text-foreground font-semibold">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Kamau"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 bg-input border-border text-foreground"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@sokoyetu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-input border-border text-foreground"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-input border-border text-foreground"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground mb-4">Already have an account?</p>
            <Link href="/login">
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-card bg-transparent">
                Login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
