
import Link from "next/link";

export default function Help() {
  return (
    <main className="page">
      <div className="container narrow">
        <div className="page-head">
          <span className="section-kicker">
            HELP CENTER
          </span>

          <h1>How can we help?</h1>

          <p>
            Quick answers for the current demo.
          </p>
        </div>

        <div className="faq">
          <details open>
            <summary>
              How do I buy a product?
            </summary>

            <p>
              Open Marketplace, select a product and use
              Add to cart. Checkout is currently a demo action.
            </p>
          </details>

          <details>
            <summary>
              Where is my cart?
            </summary>

            <p>
              Tap the cart icon in the top navigation or
              open the Cart page.
            </p>
          </details>

          <details>
            <summary>
              Can I create an account?
            </summary>

            <p>
              Yes. The registration interface works as a
              demo; real authentication is a later backend step.
            </p>
          </details>
        </div>

        <Link
          href="/contact"
          className="primary-btn"
        >
          Contact support
        </Link>
      </div>
    </main>
  );
}
