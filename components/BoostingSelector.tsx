"use client";

import { useMemo, useState } from "react";

const services = {
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
  const [platform, setPlatform] = useState<Platform>("TikTok");
  const [service, setService] = useState("Followers");
  const [quantity, setQuantity] = useState(1000);

  const serviceList = Object.keys(services[platform]);

  const selected = services[platform][
    service as keyof (typeof services)[Platform]
  ];

  const minimum = selected?.minimum ?? 100;

  const price = useMemo(() => {
    if (!selected || quantity < minimum) return 0;
    return Math.round((quantity / 1000) * selected.rate);
  }, [quantity, selected, minimum]);

  function changePlatform(value: Platform) {
    setPlatform(value);
    setService(Object.keys(services[value])[0]);
    setQuantity(services[value][
      Object.keys(services[value])[0] as keyof (typeof services)[Platform]
    ].minimum);
  }

  function changeService(value: string) {
    setService(value);
    const item = services[platform][
      value as keyof (typeof services)[Platform]
    ];
    setQuantity(item.minimum);
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

      <p style={{ color: "#9ca3af", marginBottom: "20px" }}>
        Choose a platform, service and quantity.
      </p>

      <label style={{ color: "white", display: "block", marginBottom: "8px" }}>
        Platform
      </label>

      <select
        value={platform}
        onChange={(e) => changePlatform(e.target.value as Platform)}
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

      <label style={{ color: "white", display: "block", marginBottom: "8px" }}>
        Service
      </label>

      <select
        value={service}
        onChange={(e) => changeService(e.target.value)}
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

      <label style={{ color: "white", display: "block", marginBottom: "8px" }}>
        Quantity
      </label>

      <input
        type="number"
        min={minimum}
        step="100"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "8px",
          background: "#1f2937",
          color: "white",
          border: "1px solid #4b5563",
        }}
      />

      <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "18px" }}>
        Minimum quantity: {minimum.toLocaleString()}
      </p>

      <div
        style={{
          borderTop: "1px solid #374151",
          paddingTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#9ca3af" }}>Total</span>

        <strong style={{ color: "white", fontSize: "24px" }}>
          ₦{price.toLocaleString("en-NG")}
        </strong>
      </div>
    </div>
  );
            }
