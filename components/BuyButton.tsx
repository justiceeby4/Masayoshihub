"use client";

import { useState } from "react";
import type { Product } from "@/lib/store";

export default function BuyButton({
  product,
}: {
  product: Product;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/purchases/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Purchase failed.");
        return;
      }

      setMessage("Purchase successful!");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleBuy}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#6d3df5",
          color: "white",
          fontWeight: 700,
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Processing..." : `Buy Now — ₦${product.price.toLocaleString("en-NG")}`}
      </button>

      {message && (
        <p
          style={{
            marginTop: "12px",
            color: message === "Purchase successful!" ? "#4ade80" : "#f87171",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
