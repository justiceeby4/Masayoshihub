"use client";

import { useMemo, useState } from "react";

const services: Record<
  string,
  Record<string, { rate: number; minimum: number }>
> = {
  TikTok: {
    Followers: { rate: 5999, minimum: 100 },
    Likes: { rate: 1499, minimum: 100 },
    Views: { rate: 200, minimum: 500 },
    Shares: { rate: 500, minimum: 100 },
  },
  Instagram: {
    Followers: { rate: 5499, minimum: 100 },
    Likes: { rate: 1199, minimum: 100 },
    Views: { rate: 99, minimum: 1000 },
  },
  Facebook: {
    "Profile Followers": { rate: 5499, minimum: 100 },
    "Page Followers": { rate: 3499, minimum: 100 },
    "Post Likes": { rate: 1199, minimum: 100 },
    "Video/Reel Views": { rate: 499, minimum: 100 },
  },
};

type Platform = keyof typeof services;

export default function BoostingSelector() {
  const [platform, setPlatform] =
    useState<Platform>("TikTok");

  const [service, setService] =
    useState("Followers");

  const [quantity, setQuantity] =
    useState(1000);

  const [socialLink, setSocialLink] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const serviceList = Object.keys(
    services[platform]
  );

  const selected =
    services[platform][
      service as keyof (typeof services)[Platform]
    ];

  const minimum =
    selected?.minimum ?? 100;

  const price = useMemo(() => {
    if (!selected || quantity < minimum) {
      return 0;
    }

    return Math.round(
      (quantity / 1000) * selected.rate
    );
  }, [quantity, selected, minimum]);

  function changePlatform(value: Platform) {
    const firstService =
      Object.keys(services[value])[0];

    setPlatform(value);
    setService(firstService);

    setQuantity(
      services[value][
        firstService as keyof (typeof services)[Platform]
      ].minimum
    );

    setErrorMessage("");
  }

  function changeService(value: string) {
    setService(value);

    const item =
      services[platform][
        value as keyof (typeof services)[Platform]
      ];

    setQuantity(item.minimum);
    setErrorMessage("");
  }

  async function handleBuy() {
    setErrorMessage("");
    setMessage("");

    if (!socialLink.trim()) {
      setErrorMessage(
        "Please enter your social media link."
      );
      return;
    }

    if (
      !socialLink.startsWith("http://") &&
      !socialLink.startsWith("https://")
    ) {
      setErrorMessage(
        "Please enter a valid social media link."
      );
      return;
    }

    if (quantity < minimum) {
      setErrorMessage(
        `Minimum quantity is ${minimum.toLocaleString()}.`
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/purchases/boosting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            platform,
            service,
            quantity,
            socialLink,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(
          result.error || "Purchase failed."
        );
        return;
      }

      setMessage(
        "Purchase received — please hold while we process your order."
      );
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #374151",
        borderRadius: "16px",
        padding: "20px",
        maxWidth: "520px",
        margin: "20px auto",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "22px",
          fontWeight: 700,
          marginBottom: "6px",
        }}
      >
        Select a service
      </h2>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "20px",
        }}
      >
        Choose a platform, service and quantity.
      </p>

      <label
        style={{
          color: "white",
          display: "block",
          marginBottom: "8px",
        }}
      >
        Platform
      </label>

      <select
        value={platform}
        onChange={(e) =>
          changePlatform(
            e.target.value as Platform
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "18px",
          background: "#1f2937",
          color: "white",
          border: "1px solid #4b5563",
        }}
      >
        <option value="TikTok">TikTok</option>
        <option value="Instagram">Instagram</option>
        <option value="Facebook">Facebook</option>
      </select>

      <label
        style={{
          color: "white",
          display: "block",
          marginBottom: "8px",
        }}
      >
        Service
      </label>

      <select
        value={service}
        onChange={(e) =>
          changeService(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "18px",
          background: "#1f2937",
          color: "white",
          border: "1px solid #4b5563",
        }}
      >
        {serviceList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label
        style={{
          color: "white",
          display: "block",
          marginBottom: "8px",
        }}
      >
        Social Media Link
      </label>

      <input
        type="url"
        value={socialLink}
        onChange={(e) =>
          setSocialLink(e.target.value)
        }
        placeholder="Paste your profile, post or video link"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "18px",
          background: "#1f2937",
          color: "white",
          border: "1px solid #4b5563",
        }}
      />

      <label
        style={{
          color: "white",
          display: "block",
          marginBottom: "8px",
        }}
      >
        Quantity
      </label>

      <input
        type="number"
        min={minimum}
        step="100"
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "8px",
          background: "#1f2937",
          color: "white",
          border: "1px solid #4b5563",
        }}
      />

      <p
        style={{
          color: "#9ca3af",
          fontSize: "14px",
          marginBottom: "18px",
        }}
      >
        Minimum quantity:{" "}
        {minimum.toLocaleString()}
      </p>

      <div
        style={{
          borderTop: "1px solid #374151",
          paddingTop: "16px",
          marginBottom: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#9ca3af" }}>
          Total
        </span>

        <strong
          style={{
            color: "white",
            fontSize: "24px",
          }}
        >
          ₦{price.toLocaleString("en-NG")}
        </strong>
      </div>

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

      {message && (
        <div
          style={{
            background: "#14532d",
            border: "1px solid #22c55e",
            color: "#dcfce7",
            padding: "14px",
            borderRadius: "10px",
            marginBottom: "14px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          ✓ {message}
        </div>
      )}

      <button
        onClick={handleBuy}
        disabled={loading || price <= 0}
        style={{
          width: "100%",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "none",
          background:
            loading || price <= 0
              ? "#4b5563"
              : "#6d3df5",
          color: "white",
          fontWeight: 700,
          fontSize: "16px",
          cursor:
            loading || price <= 0
              ? "not-allowed"
              : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? "Processing..."
          : `Buy Now — ₦${price.toLocaleString(
              "en-NG"
            )}`}
      </button>
    </div>
  );
        }
