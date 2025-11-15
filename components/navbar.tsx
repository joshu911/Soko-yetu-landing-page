"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import { Leaf, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const roleColors: Record<string, string> = {
    farmer: "bg-primary/10 text-primary",
    vendor: "bg-accent/10 text-accent",
    logistics: "bg-blue-500/10 text-blue-600",
    admin: "bg-purple-500/10 text-purple-600",
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Soko Yetu</div>
              <div className="text-xs text-muted-foreground">{title}</div>
            </div>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${roleColors[user.role]}`}>{user.role}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Actions */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {user && (
              <>
                <div className="px-4 py-2 text-sm font-semibold text-foreground">{user.name}</div>
                <Button variant="ghost" onClick={handleLogout} className="justify-start text-muted-foreground">
                  <LogOut className="mr-2 w-4 h-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
