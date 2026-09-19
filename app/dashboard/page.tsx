"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    
   const loadBalance = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_my_wallet_balance"
  );

  const { data: transactionData, error: transactionError } =
    await supabase.rpc("get_my_wallet_transactions");

  if (!transactionError) {
    setTransactions(transactionData ?? []);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  setUsername(user?.user_metadata?.username ?? "");

  if (!error && data !== null) {
    setBalance(Number(data));
  }
};
    loadBalance();
}, []);
  
  const quickActions = [
    {
      name: "Buy Account",
      icon: "🛒",
      href: "/marketplace?category=Buy%20Accounts",
      description: "Digital accounts",
      color: "#7040f5",
    },
    {
      name: "Buy Numbers",
      icon: "📞",
      href: "/marketplace?category=Foreign%20USA%20Numbers",
      description: "Foreign numbers",
      color: "#2878ee",
    },
    {
      name: "Boost Followers",
      icon: "❤️",
      href: "/products/social-media-boosting",
      description: "Social services",
      color: "#e83b82",
    },
    {
      name: "Giftcard",
      icon: "🎁",
      href: "/marketplace?category=Gift%20Cards",
      description: "Gift cards",
      color: "#f28b00",
    },
    {
      name: "Subscriptions",
      icon: "🎫",
      href: "/marketplace?category=VPN%20Services",
      description: "Subscriptions",
      color: "#7040f5",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        color: "white",
        paddingBottom: "230px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "18px 18px 40px",
        }}
      >
        {/* Announcement */}
        <div
          style={{
            marginBottom: "22px",
            padding: "13px 16px",
            borderRadius: "14px",
            background:
              "linear-gradient(90deg, #5730e8, #7040f5)",
            fontSize: "14px",
            fontWeight: 700,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          ✨ New stock just dropped • Fast delivery • Secure
          checkout
        </div>

        {/* Welcome */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "30px",
            borderRadius: "28px",
            marginBottom: "28px",
            background:
              "linear-gradient(135deg, #ffffff 0%, #f3edff 55%, #e9ddff 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              right: "-100px",
              top: "-100px",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "26px",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#6D3DF5",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: "30px",
                fontWeight: 800,
              }}
            >
              {username?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                  lineHeight: 1.1,
                  color: "#17152a",
                }}
              >
                Welcome back, {username}! 👋
              </h1>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#6b6878",
                  fontSize: "15px",
                }}
              >
                Manage your MasayoshiHub account
              </p>
            </div>
          </div>

          {/* Balance */}
          <div
            style={{
              position: "relative",
              padding: "22px",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    color: "#6b6878",
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Available Balance
                </p>

                <h2
                  style={{
                    margin: "8px 0 0",
                    fontSize: "38px",
                    lineHeight: 1,
                    color: "#17152a",
                  }}
                >
                  ₦
                  {balance.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h2>
              </div>

              <div
                style={{
                  padding: "9px 14px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.16)",
                  border:
                    "1px solid rgba(255,255,255,0.25)",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#17152a",
                }}
              >
                🇳🇬 NGN
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "22px",
              }}
            >
              <Link
                href="/wallet"
                style={{
                  display: "inline-block",
                  padding: "13px 20px",
                  borderRadius: "13px",
                  background: "white",
                  color: "#4f35dc",
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                + Add Money
              </Link>

              <Link
                href="#history"
                style={{
                  display: "inline-block",
                  padding: "13px 20px",
                  borderRadius: "13px",
                  background: "rgba(255,255,255,0.12)",
                  border:
                    "1px solid rgba(255,255,255,0.22)",
                  color: "#4f35dc",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                ◷ Activity History
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "25px",
                color: "#17152a",
              }}
            >
              Quick Actions
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "14px",
            }}
          >
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "20px 14px",
                  minHeight: "145px",
                  borderRadius: "22px",
                  background: "#131c2c",
                  border: "1px solid #243148",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background: action.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "27px",
                    marginBottom: "13px",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.25)",
                  }}
                >
                  {action.icon}
                </div>

                <strong
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {action.name}
                </strong>

                <span
                  style={{
                    marginTop: "5px",
                    color: "#8f9aae",
                    fontSize: "12px",
                  }}
                >
                  {action.description}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Activity placeholder area */}
        <section
          id="history"
          style={{
            marginTop: "30px",
            padding: "22px",
            borderRadius: "22px",
            background: "#111a29",
            border: "1px solid #243148",
          }}
        >
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "21px",
            }}
          >
            Activity History
          </h2>

          {transactions.length === 0 ? (
  <p
    style={{
      margin: 0,
      color: "#8f9aae",
      fontSize: "14px",
    }}
  >
    No transactions yet.
  </p>
) : (
  <div
    style={{
      display: "grid",
      gap: "12px",
    }}
  >
    {transactions.map((transaction) => (
      <div
        key={transaction.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px",
          borderRadius: "14px",
          background: "#171c24",
          border: "1px solid #243148",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            {transaction.type}
          </div>

          <div
            style={{
              color: "#8f9aae",
              fontSize: "13px",
            }}
          >
            {transaction.reference || "Wallet transaction"}
          </div>

          <div
            style={{
              color: "#8f9aae",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            {new Date(transaction.created_at).toLocaleString()}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            {Number(transaction.amount).toLocaleString()}{" "}
            {transaction.currency}
          </div>

          <div
            style={{
              color:
                transaction.status === "success"
                  ? "#4ade80"
                  : "#f59e0b",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            {transaction.status}
          </div>
        </div>
      </div>
    ))}
  </div>
)}
        </section>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        style={{
          position: "fixed",
          left: "12px",
          right: "12px",
          bottom: "12px",
          zIndex: 50,
          maxWidth: "700px",
          margin: "0 auto",
          padding: "10px 8px",
          borderRadius: "26px",
          background: "rgba(17,26,41,0.96)",
          border: "1px solid #29364d",
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          display: "grid",
          gridTemplateColumns:
            "repeat(5, 1fr)",
          alignItems: "center",
          backdropFilter: "blur(14px)",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            textDecoration: "none",
            color: "#aeb8ca",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 700,
            padding: "8px 2px",
          }}
        >
          <div style={{ fontSize: "21px" }}>⌂</div>
          Home
        </Link>

        <Link
          href="#history"
          style={{
            textDecoration: "none",
            color: "#aeb8ca",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 700,
            padding: "8px 2px",
          }}
        >
          <div style={{ fontSize: "21px" }}>◷</div>
          History
        </Link>

        <Link
          href="/wallet"
          style={{
            textDecoration: "none",
            color: "white",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 800,
            padding: "10px 4px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, #6738ee, #8050ff)",
            boxShadow:
              "0 8px 20px rgba(103,56,238,0.35)",
          }}
        >
          <div style={{ fontSize: "25px" }}>＋</div>
          Add Money
        </Link>

        <Link
          href="/marketplace?category=Services"
          style={{
            textDecoration: "none",
            color: "#aeb8ca",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 700,
            padding: "8px 2px",
          }}
        >
          <div style={{ fontSize: "21px" }}>▦</div>
          Services
        </Link>

        <Link
          href="/dashboard"
          style={{
            textDecoration: "none",
            color: "#aeb8ca",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 700,
            padding: "8px 2px",
          }}
        >
          <div style={{ fontSize: "21px" }}>◎</div>
          Profile
        </Link>
      </nav>
    </main>
  );
}
