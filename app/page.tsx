"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Leaf, TrendingUp, Truck, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Soko Yetu</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">Farm-to-Market Made Simple</h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Soko Yetu connects farmers, vendors, and logistics partners through a transparent, efficient digital
              marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup?role=farmer">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  I'm a Farmer <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/signup?role=vendor">
                <Button size="lg" variant="outline">
                  I'm a Vendor <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 flex items-center justify-center h-96">
            <div className="text-center">
              <Leaf className="w-24 h-24 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Marketplace Visualization</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">How Soko Yetu Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Farmers Upload", desc: "List your produce with real-time prices and inventory" },
              { icon: TrendingUp, title: "Vendors Browse", desc: "Discover fresh produce and place orders instantly" },
              { icon: Truck, title: "Logistics Track", desc: "Real-time delivery tracking and route optimization" },
            ].map((item, i) => (
              <Card key={i} className="p-6 bg-background border-border hover:border-primary/50 transition">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">For All Stakeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-background border-border">
              <Leaf className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">For Farmers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Fair pricing without middlemen</li>
                <li>• Manage inventory in real-time</li>
                <li>• Track sales and earnings</li>
                <li>• Direct access to buyers</li>
              </ul>
            </Card>
            <Card className="p-8 bg-background border-border">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">For Vendors</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Browse quality produce 24/7</li>
                <li>• Easy ordering and payment</li>
                <li>• Track shipments live</li>
                <li>• Access market analytics</li>
              </ul>
            </Card>
            <Card className="p-8 bg-background border-border">
              <Truck className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">For Logistics</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Efficient route planning</li>
                <li>• Driver assignment & tracking</li>
                <li>• Real-time delivery updates</li>
                <li>• Performance analytics</li>
              </ul>
            </Card>
            <Card className="p-8 bg-background border-border">
              <BarChart3 className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">For Admins</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Platform-wide insights</li>
                <li>• User management</li>
                <li>• Revenue tracking</li>
                <li>• System analytics & reports</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Agricultural Revolution</h2>
          <p className="text-lg mb-8 opacity-90">
            Be part of a sustainable farm-to-market ecosystem that benefits everyone.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Soko Yetu</h4>
              <p className="text-sm opacity-75">
                Connecting farmers, vendors, and logistics for a sustainable agricultural marketplace.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="text-sm opacity-75 space-y-2">
                <li>
                  <Link href="#">For Farmers</Link>
                </li>
                <li>
                  <Link href="#">For Vendors</Link>
                </li>
                <li>
                  <Link href="#">Logistics</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="text-sm opacity-75 space-y-2">
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-sm opacity-75 space-y-2">
                <li>
                  <Link href="#">Privacy</Link>
                </li>
                <li>
                  <Link href="#">Terms</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2025 Soko Yetu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
