
import Link from "next/link";
import { Star } from "lucide-react";
import { products, money } from "@/lib/store";
import AddToCartButton from "@/components/AddToCartButton";

export default function Featured() {
  return (
    <main className="page">
      <div className="container">
        <div className="page-head">
          <span className="section-kicker">
            CURATED
          </span>

          <h1>Featured products</h1>

          <p>
            Popular sample listings from the MasayoshiHub catalog.
          </p>
        </div>

        <div className="product-grid">
          {products.map((p) => (
            <article
              className="product-card"
              key={p.slug}
            >
              <Link href={`/products/${p.slug}`}>
                <div
                  className={`product-image ${p.tone}`}
                >
                  <span className="product-badge">
                    {p.badge}
                  </span>

                  <div className="product-symbol">
                    ✦
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
                  <strong>
                    {money(p.price)}
                  </strong>

                  <AddToCartButton
                    product={p}
                    compact
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
