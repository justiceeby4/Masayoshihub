"use client";

import { useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Account created! Please check your email to confirm your account."
    );
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#0b0f19",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          borderRadius: "20px",
          background: "#111827",
          border: "1px solid #263244",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>
          Create your account
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "28px" }}>
          Join MasayoshiHub today.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #374151",
              background: "#0b0f19",
              color: "white",
              boxSizing: "border-box",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "24px",
              borderRadius: "10px",
              border: "1px solid #374151",
              background: "#ffffff",
              color: "#000000",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#ffffff",
              color: "#000000",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: "#9ca3af",
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
