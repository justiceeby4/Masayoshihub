import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>About Masayoshihub</h1>

      <p>
        Masayoshihub is a frontend marketplace project designed to make
        digital shopping simple and clear.
      </p>

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
    </main>
  );
}
