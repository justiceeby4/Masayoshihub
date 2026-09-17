
"use client";

export default function DashboardPage() {
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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "12px" }}>
          Welcome to your dashboard
        </h1>

        <p style={{ color: "#9ca3af", fontSize: "18px" }}>
          Your MasayoshiHub account is ready.
        </p>
      </div>
    </main>
  );
}
