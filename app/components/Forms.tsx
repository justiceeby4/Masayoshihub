"use client";

import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const data = new FormData(
      e.currentTarget
    );

    const email = String(
      data.get("email") || ""
    )
      .trim()
      .toLowerCase();

    const account = JSON.parse(
      localStorage.getItem(
        "masayoshi_account"
      ) || "null"
    );

    if (
      !account ||
      account.email !== email
    ) {
      setError(
        "No demo account was found for that email. Create an account first."
      );

      return;
    }

    localStorage.setItem(
      "masayoshi_logged_in",
      "true"
    );

    setSent(true);
  }

  return (
    <form
      className="form-card"
      onSubmit={submit}
    >
      <label>
        Email

        <input
          name="email"
          required
          type="email"
          placeholder="you@example.com"
        />
      </label>

      <label>
        Password

        <input
          name="password"
          required
          type="password"
          placeholder="••••••••"
        />
      </label>

      <button
        className="primary-btn"
        type="submit"
      >
        {sent
          ? "Logged in ✓"
          : "Log in"}
      </button>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      <p className="form-note">
        Demo login stores your account locally
        in this browser.
      </p>

      <Link href="/register">
        Need an account? Create one
      </Link>
    </form>
  );
}

export function RegisterForm() {
  const [sent, setSent] =
    useState(false);

  function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const data = new FormData(
      e.currentTarget
    );

    localStorage.setItem(
      "masayoshi_account",
      JSON.stringify({
        name: data.get("name"),
        email: String(
          data.get("email") || ""
        )
          .trim()
          .toLowerCase(),
        password: data.get("password"),
      })
    );

    localStorage.setItem(
      "masayoshi_logged_in",
      "true"
    );

    setSent(true);
  }

  return (
    <form
      className="form-card"
      onSubmit={submit}
    >
      <label>
        Full name

        <input
          name="name"
          required
          placeholder="Your name"
        />
      </label>

      <label>
        Email

        <input
          name="email"
          required
          type="email"
          placeholder="you@example.com"
        />
      </label>

      <label>
        Password

        <input
          name="password"
          required
          minLength={6}
          type="password"
          placeholder="Create a password"
        />
      </label>

      <button
        className="primary-btn"
        type="submit"
      >
        {sent
          ? "Account created ✓"
          : "Create account"}
      </button>

      <p className="form-note">
        Demo account data is stored locally
        in this browser. Add a real auth provider
        before production.
      </p>

      <Link href="/login">
        Already have an account? Log in
      </Link>
    </form>
  );
}

export function ContactForm() {
  const [sent, setSent] =
    useState(false);

  function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const data = new FormData(
      e.currentTarget
    );

    localStorage.setItem(
      "masayoshi_contact",
      JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
        createdAt:
          new Date().toISOString(),
      })
    );

    setSent(true);
  }

  return (
    <form
      className="form-card"
      onSubmit={submit}
    >
      <label>
        Name

        <input
          name="name"
          required
          placeholder="Your name"
        />
      </label>

      <label>
        Email

        <input
          name="email"
          required
          type="email"
          placeholder="you@example.com"
        />
      </label>

      <label>
        Message

        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
        />
      </label>

      <button
        className="primary-btn"
        type="submit"
      >
        {sent
          ? "Message saved ✓"
          : "Send message"}
      </button>

      {sent && (
        <p className="success">
          Your message has been saved in this
          demo. Connect an email/API service
          for real delivery.
        </p>
      )}
    </form>
  );
        }
