export type UserRole = "farmer" | "vendor" | "logistics" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  location?: string
  verified: boolean
  createdAt: string
}

export interface Produce {
  id: string
  farmerId: string
  name: string
  category: string
  quantity: number
  unit: string
  pricePerUnit: number
  description: string
  image: string
  region: string
  createdAt: string
}

export interface Order {
  id: string
  vendorId: string
  farmerId: string
  produceId: string
  quantity: number
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: string
  deliveryDate?: string
}

export interface Delivery {
  id: string
  orderId: string
  driverId: string
  truckId: string
  status: "pending" | "in-transit" | "delivered"
  currentLocation?: string
  estimatedArrival?: string
  actualDelivery?: string
}

// Mock data
const mockUsers: Record<string, User> = {
  user1: {
    id: "user1",
    name: "John Kamau",
    email: "john@sokoyetu.com",
    role: "farmer",
    phone: "+254712345678",
    location: "Nairobi, Kenya",
    verified: true,
    createdAt: "2025-01-01",
  },
  user2: {
    id: "user2",
    name: "Mary Mwangi",
    email: "mary@sokoyetu.com",
    role: "vendor",
    phone: "+254701234567",
    location: "Mombasa, Kenya",
    verified: true,
    createdAt: "2025-01-05",
  },
}

const mockProduce: Produce[] = [
  {
    id: "prod1",
    farmerId: "user1",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    quantity: 500,
    unit: "kg",
    pricePerUnit: 45,
    description: "Organic, fresh tomatoes from the highlands",
    image: "/fresh-tomatoes.png",
    region: "Central Region",
    createdAt: "2025-01-10",
  },
  {
    id: "prod2",
    farmerId: "user1",
    name: "Maize",
    category: "Grains",
    quantity: 1000,
    unit: "kg",
    pricePerUnit: 35,
    description: "Quality maize for milling or livestock feed",
    image: "/fresh-maize-corn.jpg",
    region: "Rift Valley",
    createdAt: "2025-01-12",
  },
  {
    id: "prod3",
    farmerId: "user1",
    name: "Bananas",
    category: "Fruits",
    quantity: 300,
    unit: "bunches",
    pricePerUnit: 150,
    description: "Ripe, sweet bananas ready for market",
    image: "/fresh-bananas-yellow.jpg",
    region: "Western Region",
    createdAt: "2025-01-14",
  },
]

const mockOrders: Order[] = [
  {
    id: "order1",
    vendorId: "user2",
    farmerId: "user1",
    produceId: "prod1",
    quantity: 100,
    totalPrice: 4500,
    status: "delivered",
    createdAt: "2025-01-15",
    deliveryDate: "2025-01-16",
  },
]

// API Functions
export const mockAuthApi = {
  login: async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500))
    const user = Object.values(mockUsers).find((u) => u.email === email)
    if (user) {
      return { user, token: "mock-token-" + user.id }
    }
    throw new Error("Invalid credentials")
  },

  signup: async (data: Omit<User, "id" | "createdAt" | "verified">) => {
    await new Promise((r) => setTimeout(r, 500))
    const user: User = {
      ...data,
      id: "user-" + Date.now(),
      createdAt: new Date().toISOString(),
      verified: false,
    }
    mockUsers[user.id] = user
    return { user, token: "mock-token-" + user.id }
  },
}

export const mockProduceApi = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 300))
    return mockProduce
  },

  getByFarmer: async (farmerId: string) => {
    await new Promise((r) => setTimeout(r, 300))
    return mockProduce.filter((p) => p.farmerId === farmerId)
  },

  create: async (produce: Omit<Produce, "id" | "createdAt">) => {
    await new Promise((r) => setTimeout(r, 300))
    const newProduce: Produce = {
      ...produce,
      id: "prod-" + Date.now(),
      createdAt: new Date().toISOString(),
    }
    mockProduce.push(newProduce)
    return newProduce
  },

  update: async (id: string, updates: Partial<Produce>) => {
    await new Promise((r) => setTimeout(r, 300))
    const index = mockProduce.findIndex((p) => p.id === id)
    if (index !== -1) {
      mockProduce[index] = { ...mockProduce[index], ...updates }
      return mockProduce[index]
    }
    throw new Error("Produce not found")
  },
}

export const mockOrderApi = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 300))
    return mockOrders
  },

  getByVendor: async (vendorId: string) => {
    await new Promise((r) => setTimeout(r, 300))
    return mockOrders.filter((o) => o.vendorId === vendorId)
  },

  getByFarmer: async (farmerId: string) => {
    await new Promise((r) => setTimeout(r, 300))
    return mockOrders.filter((o) => o.farmerId === farmerId)
  },

  create: async (order: Omit<Order, "id" | "createdAt">) => {
    await new Promise((r) => setTimeout(r, 300))
    const newOrder: Order = {
      ...order,
      id: "order-" + Date.now(),
      createdAt: new Date().toISOString(),
    }
    mockOrders.push(newOrder)
    return newOrder
  },

  updateStatus: async (orderId: string, status: Order["status"]) => {
    await new Promise((r) => setTimeout(r, 300))
    const order = mockOrders.find((o) => o.id === orderId)
    if (order) {
      order.status = status
      return order
    }
    throw new Error("Order not found")
  },
}

export const mockAnalyticsApi = {
  getDashboardStats: async (userId: string) => {
    await new Promise((r) => setTimeout(r, 300))
    return {
      totalOrders: 15,
      totalRevenue: 45000,
      activeProducts: 8,
      pendingDeliveries: 3,
      topProduct: "Fresh Tomatoes",
      monthlyGrowth: 12.5,
    }
  },

  getChart: async (type: string, timeframe: string) => {
    await new Promise((r) => setTimeout(r, 300))
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      return d.toLocaleDateString()
    })

    return dates.map((date, i) => ({
      date,
      value: Math.floor(Math.random() * 10000) + 5000,
    }))
  },
}
