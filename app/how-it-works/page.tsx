import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  ShoppingCart,
  Zap,
} from "lucide-react";

export default function How() {
  return (
    <main className="page">
      <div className="container narrow">
        <div className="page-head">
          <span className="section-kicker">
            HOW IT WORKS
          </span>

          <h1>Shopping made simple</h1>

          <p>
            This version is a frontend demo with working
            browsing and cart actions.
          </p>
        </div>

        <div className="steps">
          <div>
            <span>
              <Search />
            </span>

            <div>
              <h3>1. Find a product</h3>

              <p>
                Browse categories or search the marketplace.
              </p>
            </div>
          </div>

          <div>
            <span>
              <ShoppingCart />
            </span>

            <div>
              <h3>2. Add to cart</h3>

              <p>
                Open a product, review the details and add
                it to your cart.
              </p>
            </div>
          </div>

          <div>
            <span>
              <Zap />
            </span>

            <div>
              <h3>3. Checkout</h3>

              <p>
                Review your order and prepare it for payment.
              </p>
            </div>
          </div>

          <div>
            <span>
              <CheckCircle2 />
            </span>

            <div>
              <h3>4. Delivery</h3>

              <p>
                After a real payment provider is connected,
                digital delivery can be automated.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/marketplace"
          className="primary-btn"
        >
          Browse marketplace
          <ArrowRight size={17} />
        </Link>
      </div>
    </main>
  );
}
