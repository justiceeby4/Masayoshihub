export default function RefundPolicyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "#0b0f19",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Refund Policy
        </h1>

        <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>
          Please review our refund policy before making a purchase on
          MasayoshiHub.
        </p>

        <h2 style={{ marginTop: "32px", marginBottom: "12px" }}>
          Refunds
        </h2>

        <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>
          Refund requests are reviewed on a case-by-case basis. If you have
          an issue with a purchase, please contact MasayoshiHub support with
          your order details.
        </p>
      </div>
    </main>
  );
}
