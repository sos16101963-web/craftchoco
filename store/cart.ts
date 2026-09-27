"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/lib/products";
import { trackEvent, trackFb } from "@/lib/analytics";

export interface CartItem {
  id: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (id, qty = 1) => {
        const product = products.find((p) => p.id === id);
        if (product) {
          trackEvent("add_to_cart", {
            currency: "UAH",
            value: product.price * qty,
            item_name: product.name,
            quantity: qty,
          });
          trackFb("AddToCart", {
            content_name: product.name,
            value: product.price * qty,
            currency: "UAH",
          });
        }
        return set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i)),
            };
          }
          return { items: [...state.items, { id, qty }] };
        });
      },
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 99) } : i)),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "cacao-noir-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
