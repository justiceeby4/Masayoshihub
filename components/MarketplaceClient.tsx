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

import AddToCartButton from "@/components/AddToCartButton";

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
      products.filter(
        (p) =>
          (category === "All" ||
            p.category === category) &&
          `${p.title} ${p.category}`
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      ),
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
                    ? "◇"
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
                  • popular
                </span>
              </div>

              <div className="product-bottom">
                <div>
                  <strong>
                    {money(p.price)}
                  </strong>

                  {p.old && (
                    <del>
                      {money(p.old)}
                    </del>
                  )}
                </div>

                <AddToCartButton
                  product={p}
                  compact
                />
              </div>
            </div>
          </article>
        ))}
      </div>

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
