import { create } from "zustand"
import type { User, Produce, Order } from "./mock-api"

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  setUser: (user: User | null, token?: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}))

interface ProduceState {
  produce: Produce[]
  isLoading: boolean
  setProduce: (produce: Produce[]) => void
  addProduce: (produce: Produce) => void
  removeProduce: (id: string) => void
}

export const useProduceStore = create<ProduceState>((set) => ({
  produce: [],
  isLoading: false,
  setProduce: (produce) => set({ produce }),
  addProduce: (produce) => set((state) => ({ produce: [...state.produce, produce] })),
  removeProduce: (id) =>
    set((state) => ({
      produce: state.produce.filter((p) => p.id !== id),
    })),
}))

interface OrderState {
  orders: Order[]
  isLoading: boolean
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}))
