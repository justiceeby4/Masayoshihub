"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { money } from "@/lib/store";

type CartItem = {
id: string;
name: string;
price: number;
image?: string;
quantity: number;
};

export default function CartPage() {
const [cart, setCart] = useState<CartItem[]>([]);

function loadCart() {
try {
const saved = JSON.parse(localStorage.getItem("masayoshi-cart") || "[]");
setCart(Array.isArray(saved) ? saved : []);
} catch {
setCart([]);
}
}

useEffect(() => {
loadCart();

const handler = () => loadCart();
window.addEventListener("cart-updated", handler);

return () => window.removeEventListener("cart-updated", handler);

}, []);

function updateQuantity(id: string, change: number) {
const updated = cart
.map((item) =>
item.id === id
? { ...item, quantity: Math.max(1, item.quantity + change) }
: item
);

localStorage.setItem("masayoshi-cart", JSON.stringify(updated));
setCart(updated);
window.dispatchEvent(new Event("cart-updated"));

}

function removeItem(id: string) {
const updated = cart.filter((item) => item.id !== id);

localStorage.setItem("masayoshi-cart", JSON.stringify(updated));
setCart(updated);
window.dispatchEvent(new Event("cart-updated"));

}

function clearCart() {
localStorage.removeItem("masayoshi-cart");
setCart([]);
window.dispatchEvent(new Event("cart-updated"));
}

const subtotal = cart.reduce(
(total, item) => total + item.price * item.quantity,
0
);

if (cart.length === 0) {
return (
<main className="page">
<div className="container narrow">
<div className="empty-state">
<span className="section-kicker">YOUR CART</span>
<h1>Your cart is empty</h1>
<p>
Browse the marketplace and add products you would like to buy.
</p>

        <Link href="/marketplace" className="primary-btn">
          Browse marketplace
        </Link>
      </div>
    </div>
  </main>
);

}

return (
<main className="page">
<div className="container">
<div className="page-head">
<span className="section-kicker">YOUR CART</span>
<h1>Shopping cart</h1>
<p>Review your products before continuing to checkout.</p>
</div>

    <div className="cart-layout">
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />
            )}

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{money(item.price)}</p>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-item-right">
              <strong>
                {money(item.price * item.quantity)}
              </strong>

              <button
                type="button"
                className="text-btn danger"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="secondary-btn"
          onClick={clearCart}
        >
          Clear cart
        </button>
      </div>

      <aside className="summary-card">
        <h2>Order summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{money(subtotal)}</strong>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <span>Calculated at checkout</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <strong>{money(subtotal)}</strong>
        </div>

        <Link href="/checkout" className="primary-btn full-width">
          Proceed to checkout
        </Link>
      </aside>
    </div>
  </div>
</main>

);
}
