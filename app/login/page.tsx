"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from "@/lib/store"
import { mockAuthApi } from "@/lib/mock-api"
import { Leaf, AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { user, token } = await mockAuthApi.login(email, password)
      setUser(user, token)

      // Route to appropriate dashboard
      const dashboards: Record<string, string> = {
        farmer: "/farmer",
        vendor: "/vendor",
        logistics: "/logistics",
        admin: "/admin",
      }
      router.push(dashboards[user.role] || "/")
    } catch (err) {
      setError("Invalid email or password. Try: john@sokoyetu.com / password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Soko Yetu</span>
          </div>
          <p className="text-muted-foreground">Welcome back to the marketplace</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 border-border">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Login</h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
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
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-input border-border text-foreground"
                disabled={isLoading}
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground mb-4">Don't have an account?</p>
            <Link href="/signup">
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-card bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Test credentials */}
          <div className="mt-6 p-4 bg-card rounded-lg border border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Test Credentials:</p>
            <p className="text-xs text-muted-foreground">Email: john@sokoyetu.com</p>
            <p className="text-xs text-muted-foreground">Password: password</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
