"use client";

import Link from "next/link";
import {
  Search,
  Star,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import {
  categories,
  products,
  money,
} from "@/lib/store";


export default function MarketplaceClient({
  initialCategory = "All",
}: {
  initialCategory?: string;
}) {
  const [query, setQuery] =
    useState("");

  const [category, setCategory] =
    useState(initialCategory || "All");

  const filtered = useMemo(
  () =>
    products.filter((p) => {
      const matchesCategory =
        category === "All" ||
        p.category === category ||
        p.subcategory === category;

      const text =
        `${p.title} ${p.category} ${p.subcategory ?? ""}`.toLowerCase();

      const matchesSearch = text.includes(query.toLowerCase());

      return matchesCategory && matchesSearch;
    }),
  [query, category]
);

  return (
    <div>
      <div className="search-bar">
        <Search size={18} />

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>

      <div className="filters">
        <button
          type="button"
          className={
            category === "All"
              ? "filter active"
              : "filter"
          }
          onClick={() =>
            setCategory("All")
          }
        >
          All
        </button>

        {categories.map((c) => (
          <button
            type="button"
            key={c.name}
            className={
              category === c.name
                ? "filter active"
                : "filter"
            }
            onClick={() =>
              setCategory(c.name)
            }
          >
            {c.name}
          </button>
        ))}
      </div>

      {category === "Buy Accounts" ? (
  <div>
    {Object.entries(
      filtered.reduce(
        (groups, p) => {
          const platform = p.subcategory || "Other";

          let region = "GENERAL";

          if (/germany/i.test(`${p.title} ${p.description}`)) {
            region = "GERMANY";
          } else if (
            /europe/i.test(`${p.title} ${p.description}`) &&
            /asia/i.test(`${p.title} ${p.description}`)
          ) {
            region = "EUROPE & ASIA";
          } else if (/europe/i.test(`${p.title} ${p.description}`)) {
            region = "EUROPE";
          } else if (/usa|america|united states/i.test(`${p.title} ${p.description}`)) {
            region = "USA";
          }

          if (!groups[platform]) {
            groups[platform] = {};
          }

          if (!groups[platform][region]) {
            groups[platform][region] = [];
          }

          groups[platform][region].push(p);

          return groups;
        },
        {} as Record<string, Record<string, typeof filtered>>
      )
    ).map(([platform, regions]) => (
      <section key={platform} style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 800,
            marginBottom: "14px",
            textTransform: "uppercase",
          }}
        >
          {platform}
        </h2>

        {Object.entries(regions).map(([region, items]) => (
          <div key={region} style={{ marginBottom: "22px" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 800,
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              🌍 {region} ({items.length})
            </h3>

            <div className="product-grid">
              {items.map((p) => (
                <article
                  className="product-card"
                  key={p.slug}
                >
                  <div className="product-body">
                    <span className="product-category">
                      {platform}
                    </span>

                    <h3>{p.title}</h3>

                    <p style={{ margin: "8px 0", opacity: 0.8 }}>
                      {p.description}
                    </p>

                    <p
                      style={{
                        margin: "8px 0",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      ✓ {p.badge}
                    </p>

                    <div className="product-bottom">
                      <strong>{money(p.price)}</strong>

                      <Link
                        href={`/products/${p.slug}`}
                        className="primary-btn"
                        style={{
                          display: "inline-block",
                          marginTop: "10px",
                          textDecoration: "none",
                        }}
                      >
                        Buy →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    ))}
  </div>
) : (
  <div className="product-grid">
    {filtered.map((p) => (
      <article
        className="product-card"
        key={p.slug}
      >
        <Link
          href={`/products/${p.slug}`}
          aria-label={`View ${p.title}`}
        >
          <div
            className={`product-image ${p.tone}`}
          >
            <span className="product-badge">
              {p.badge}
            </span>

            <div className="product-symbol">
              {p.tone === "orange"
                ? "◉"
                : p.tone === "green"
                ? "⚡"
                : "✦"}
            </div>
          </div>
        </Link>

        <div className="product-body">
          <span className="product-category">
            {p.category}
          </span>

          <h3>{p.title}</h3>

          <div className="rating">
            <Star
              size={14}
              fill="currentColor"
            />
            {p.rating}

            <span>
              · popular
            </span>
          </div>

          <div className="product-bottom">
            <div>
              <strong>
                {p.slug ===
                "social-media-boosting"
                  ? "Select service"
                  : money(p.price)}
              </strong>

              {p.old > 0 && (
                <del>
                  {money(p.old)}
                </del>
              )}
            </div>
          </div>
        </div>
      </article>
    ))}
  </div>
)}

      {filtered.length === 0 && (
        <div className="empty">
          <h3>No products found</h3>

          <p>
            Try another search or category.
          </p>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
