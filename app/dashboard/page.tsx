"use client";

import Link from "next/link";

export default function DashboardPage() {
  const accountCategories = [
    {
      name: "Digital Accounts",
      description: "Your purchased digital accounts",
      icon: "◉",
    },
    {
      name: "Subscriptions",
      description: "Your active subscriptions",
      icon: "✦",
    },
    {
      name: "Gift Cards",
      description: "Your purchased gift cards",
      icon: "🎁",
    },
    {
      name: "Software",
      description: "Your software purchases",
      icon: "▣",
    },
    {
      name: "Games",
      description: "Your purchased games",
      icon: "◈",
    },
    {
      name: "Services",
      description: "Your purchased services",
      icon: "⚡",
    },
  ];

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
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          Welcome to your dashboard
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "18px",
            marginBottom: "32px",
          }}
        >
          Manage your MasayoshiHub account and purchases.
        </p>

        <section
          style={{
            padding: "28px",
            borderRadius: "20px",
            background: "#111827",
            border: "1px solid #263244",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "8px",
            }}
          >
            Your Balance
          </p>

          <h2
            style={{
              fontSize: "36px",
              margin: 0,
            }}
          >
            ₦0.00
          </h2>
        </section>

        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px",
          }}
        >
          Your Accounts
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {accountCategories.map((category) => (
            <Link
              key={category.name}
              href={`/marketplace?category=${encodeURIComponent(
                category.name
              )}`}
              style={{
                display: "block",
                padding: "22px",
                borderRadius: "16px",
                background: "#111827",
                border: "1px solid #263244",
                color: "white",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  marginBottom: "12px",
                }}
              >
                {category.icon}
              </div>

              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: "20px",
                }}
              >
                {category.name}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#9ca3af",
                }}
              >
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
