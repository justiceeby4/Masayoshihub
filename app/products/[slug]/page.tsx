import { notFound } from "next/navigation";
import BoostingSelector from "@/components/BoostingSelector";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  getProduct,
  money,
} from "@/lib/store";
import BuyButton from "@/components/BuyButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const p = getProduct(slug);

  if (!p) {
    notFound();
  }

  return (
    <main className="page">
      <div className="container">
        <Link
          href="/marketplace"
          className="back-link"
        >
          <ArrowLeft size={15} />
          Back to marketplace
        </Link>

        <div className="product-detail">
          <div
            className={`detail-art ${p.tone}`}
          >
            <span>{p.badge}</span>

            <strong>✦</strong>
          </div>

          <div className="detail-copy">
            <span className="product-category">
              {p.category}
            </span>

            <h1>{p.title}</h1>

            <div className="detail-rating">
              <Star
                size={16}
                fill="currentColor"
              />

              {p.rating} rating
            </div>

            <p>{p.description}</p>

            <div className="detail-price">
              <strong>
                {money(p.price)}
              </strong>

              {p.old && (
                <del>
                  {money(p.old)}
                </del>
              )}
            </div>

            <div className="secure-note">
              <ShieldCheck size={18} />

              Secure checkout interface • Digital delivery
            </div>

            <AddToCartButton product={p} />
            
            {p.slug === "social-media-boosting" && <BoostingSelector />}
          </div>
        </div>
      </div>
    </main>
  );
}
