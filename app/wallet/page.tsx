"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadBalance = async () => {
      const supabase = createClient();

      const { data, error } = await supabase.rpc(
        "get_my_wallet_balance"
      );

      if (!error && data !== null) {
        setBalance(Number(data));
      }
    };

    loadBalance();
  }, []);

  const handleAddMoney = async () => {
    setErrorMessage("");

    const amountNumber = Number(amount);

    if (
      !Number.isFinite(amountNumber) ||
      !Number.isInteger(amountNumber) ||
      amountNumber < 100
    ) {
      setErrorMessage("Enter an amount of at least ₦100.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(
          result.error || "Unable to start payment."
        );
        return;
      }

      window.location.href = result.authorization_url;
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "#0b0f19",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: "#9ca3af",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "30px",
          }}
        >
          ← Back to Dashboard
        </Link>

        <h1
          style={{
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          My Wallet
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "18px",
            marginBottom: "32px",
          }}
        >
          Manage your MasayoshiHub wallet balance.
        </p>

        <section
          style={{
            padding: "28px",
            borderRadius: "20px",
            background: "#111827",
            border: "1px solid #263244",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "8px",
            }}
          >
            Available Balance
          </p>

          <h2
            style={{
              fontSize: "38px",
              margin: 0,
            }}
          >
            ₦
            {balance.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </section>

        <section
          style={{
            padding: "28px",
            borderRadius: "20px",
            background: "#111827",
            border: "1px solid #263244",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              marginTop: 0,
              marginBottom: "10px",
            }}
          >
            Fund Wallet
          </h2>

          <p
            style={{
              color: "#9ca3af",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            Add money to your wallet to make purchases on
            MasayoshiHub.
          </p>

          <input
            type="number"
            min="100"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (₦)"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1px solid #374151",
              background: "#0b0f19",
              color: "white",
              fontSize: "16px",
              marginBottom: "14px",
            }}
          />

          {errorMessage && (
            <p
              style={{
                color: "#f87171",
                marginBottom: "14px",
              }}
            >
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleAddMoney}
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
            {loading ? "Opening Paystack..." : "Add Money"}
          </button>

          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              marginTop: "14px",
            }}
          >
            Minimum wallet funding amount: ₦100.
          </p>
        </section>
      </div>
    </main>
  );
}
