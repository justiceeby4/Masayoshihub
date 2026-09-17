import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/store";

export default function Categories() {
  return (
    <main className="page">
      <div className="container">
        <div className="page-head">
          <span className="section-kicker">BROWSE</span>
          <h1>Categories</h1>
          <p>Choose a category to view its products.</p>
        </div>

        <div className="category-grid">
          {categories.map((c) => (
            <Link
              className="category-card"
              href={`/marketplace?category=${encodeURIComponent(c.name)}`}
              key={c.name}
            >
              <span className="cat-icon">{c.icon}</span>

              <div>
                <h3>{c.name}</h3>
                <p>{c.count}</p>
              </div>

              <ChevronRight className="cat-arrow" size={18} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
