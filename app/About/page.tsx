import Link from "next/link";

export default function About() {
  return (
    <main className="page">
      <div className="container narrow">
        <div className="page-head">
          <span className="section-kicker">COMPANY</span>

          <h1>About MasayoshiHub</h1>

          <p>
            MasayoshiHub is a frontend marketplace project designed to make
            digital shopping simple and clear.
          </p>
        </div>

        <div className="content-card">
          <h2>Our goal</h2>

          <p>
            Build a clean marketplace where customers can discover products,
            review details, add items to a cart and complete a secure checkout.
          </p>

          <h2>What comes next</h2>

          <p>
            Authentication, a database, seller tools, admin tools and a real
            payment provider can be connected after this frontend foundation.
          </p>

          <Link href="/marketplace" className="primary-btn">
            Browse marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}
