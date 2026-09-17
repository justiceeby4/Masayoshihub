"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/store";

type CartLine = { slug: string; qty: number };

const CART_KEY = "masayoshihub_cart";

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
    window.dispatchEvent(new Event("cart-updated"));
  } catch {
    // localStorage unavailable (e.g. private mode) — fail silently
  }
}

export default function AddToCartButton({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const lines = readCart();
    const existing = lines.find((l) => l.slug === product.slug);
    if (existing) {
      existing.qty += 1;
    } else {
      lines.push({ slug: product.slug, qty: 1 });
    }
    writeCart(lines);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={compact ? "small-action" : "primary-btn full"}
      aria-label={`Add ${product.title} to cart`}
    >
      {added ? <Check size={compact ? 14 : 17} /> : <ShoppingCart size={compact ? 14 : 17} />}
      {!compact && <span>{added ? "Added" : "Add to cart"}</span>}
    </button>
  );
}
