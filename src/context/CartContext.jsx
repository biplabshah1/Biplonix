import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { findProduct, stockKey, FREE_SHIPPING_OVER, SHIPPING_COST } from "../data/products.js";

const CartContext = createContext(null);
const STORAGE_KEY = "biplonix-cart";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load); // [{ id, colour, size, qty }]

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const maxFor = (i) => findProduct(i.id).stock[stockKey(i.colour, i.size)];
  const same = (a, b) => a.id === b.id && a.colour === b.colour && a.size === b.size;

  const value = useMemo(() => {
    const subtotal = items.reduce((a, i) => a + findProduct(i.id).price * i.qty, 0);
    const shipping = items.length && subtotal < FREE_SHIPPING_OVER ? SHIPPING_COST : 0;
    return {
      items,
      count: items.reduce((a, i) => a + i.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      // Returns false when the requested quantity exceeds stock.
      add(item) {
        const existing = items.find((i) => same(i, item));
        if ((existing?.qty ?? 0) >= maxFor(item)) return false;
        setItems((prev) =>
          existing ? prev.map((i) => (same(i, item) ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { ...item, qty: 1 }]
        );
        return true;
      },
      increase: (item) => setItems((prev) => prev.map((i) => (same(i, item) && i.qty < maxFor(i) ? { ...i, qty: i.qty + 1 } : i))),
      decrease: (item) => setItems((prev) => prev.flatMap((i) => (same(i, item) ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))),
      remove: (item) => setItems((prev) => prev.filter((i) => !same(i, item))),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
