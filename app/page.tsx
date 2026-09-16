import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Download,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

const categories = [
  { name: "Digital Accounts", icon: "◉", count: "1,240+" },
  { name: "Subscriptions", icon: "✦", count: "860+" },
  { name: "Gift Cards", icon: "◇", count: "520+" },
  { name: "Software", icon: "▣", count: "310+" },
  { name: "Games", icon: "◈", count: "940+" },
  { name: "Services", icon: "⚡", count: "430+" },
];

const products = [
  { title: "Premium Streaming Access", category: "Subscriptions", price: "$8.99", old: "$12.99", rating: "4.9", badge: "Popular", tone: "purple" },
  { title: "Cloud Storage Pro", category: "Software", price: "$6.50", old: "$9.00", rating: "4.8", badge: "Best value", tone: "blue" },
  { title: "Digital Gift Card", category: "Gift Cards", price: "$25.00", old: "", rating: "5.0", badge: "Instant", tone: "orange" },
  { title: "Creator Toolkit", category: "Services", price: "$14.99", old: "$19.99", rating: "4.7", badge: "New", tone: "green" },
];

export default function Home() {
  return (
    <main>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Fast delivery • Secure checkout • 24/7 support</span>
          <span className="topbar-right">Trusted by 50,000+ customers</span>
        </div>
      </div>

      <header className="header">
        <div className="container nav">
          <a href="#" className="brand">
            <span className="brand-mark">A</span>
            <span>Masayoshihub</span>

          <nav className="desktop-nav">
            <a href="#categories">Categories</a>
            <a href="#featured">Featured</a>
            <a href="#how">How it works</a>
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search"><Search size={20} /></button>
            <a href="#" className="login">Log in</a>
            <a href="/signup" className="signup">Create account</a>
            <button className="menu-btn" aria-label="Menu"><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Your trusted digital marketplace</div>
            <h1>Everything digital.<br /><span>Simple, fast & secure.</span></h1>
            <p>
              Discover digital products, subscriptions, gift cards and services
              from trusted sellers — all in one place.
            </p>
            <div className="hero-buttons">
              <a href="#featured" className="primary-btn">Explore marketplace <ArrowRight size={18} /></a>
              <a href="#how" className="secondary-btn">How it works</a>
            </div>
            <div className="hero-trust">
              <div className="avatars"><i>JD</i><i>AM</i><i>SK</i><i>+</i></div>
              <div><strong>50k+ happy customers</strong><small>Rated 4.9/5 across thousands of orders</small></div>
            </div>
          </div>

          <div className="hero-card">
            <div className="floating-card card-a">
              <div className="mini-icon purple">✦</div>
              <div><b>Instant delivery</b><small>Available 24/7</small></div>
              <BadgeCheck size={18} />
            </div>
            <div className="market-card">
              <div className="market-top"><span>Trending now</span><span className="live-dot">● Live</span></div>
              <div className="market-product">
                <div className="product-art main-art"><Sparkles size={42} /></div>
                <div className="market-info">
                  <span>Premium</span>
                  <h3>Digital subscription</h3>
                  <div className="stars">★★★★★ <small>4.9</small></div>
                  <div className="market-price">$8.99 <del>$12.99</del></div>
                </div>
              </div>
              <div className="secure-row"><ShieldCheck size={17} /> Verified seller <span>•</span> Instant delivery</div>
              <button className="buy-btn">Get it now <ArrowRight size={17} /></button>
            </div>
            <div className="floating-card card-b">
              <div className="mini-icon green"><Zap size={17} /></div>
              <div><b>Order completed</b><small>Just now</small></div>
              <span className="check">✓</span>
            </div>
          </div>
        </div>
      </section>

      <section className="category-section" id="categories">
        <div className="container">
          <div className="section-heading">
            <div><span className="section-kicker">BROWSE</span><h2>Shop by category</h2></div>
            <a href="#">View all <ChevronRight size={17} /></a>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <a className="category-card" href="#" key={cat.name}>
                <span className="cat-icon">{cat.icon}</span>
                <div><h3>{cat.name}</h3><p>{cat.count} products</p></div>
                <ChevronRight className="cat-arrow" size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="featured" id="featured">
        <div className="container">
          <div className="section-heading">
            <div><span className="section-kicker">CURATED FOR YOU</span><h2>Featured products</h2></div>
            <a href="#">See all products <ChevronRight size={17} /></a>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.title}>
                <div className={`product-image ${product.tone}`}>
                  <span className="product-badge">{product.badge}</span>
                  <div className="product-symbol">{product.tone === "orange" ? "◇" : product.tone === "green" ? "⚡" : "✦"}</div>
                </div>
                <div className="product-body">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.title}</h3>
                  <div className="rating"><Star size={14} fill="currentColor" /> {product.rating} <span>• 120+ sold</span></div>
                  <div className="product-bottom"><div><strong>{product.price}</strong>{product.old && <del>{product.old}</del>}</div><button>View</button></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why" id="how">
        <div className="container why-grid">
          <div>
            <span className="section-kicker">WHY MASAYOSHIHUB</span>
            <h2>Built around a better<br />way to shop digital.</h2>
            <p>We keep the buying experience straightforward: verified sellers, transparent pricing and delivery that happens when you need it.</p>
            <a className="primary-btn small" href="#">Start shopping <ArrowRight size={17} /></a>
          </div>
          <div className="benefits">
            <div><span className="benefit-icon"><ShieldCheck /></span><div><h3>Secure by design</h3><p>Your account and checkout experience are protected with modern security practices.</p></div></div>
            <div><span className="benefit-icon"><Zap /></span><div><h3>Instant delivery</h3><p>Most digital orders are delivered automatically after successful payment.</p></div></div>
            <div><span className="benefit-icon"><Users /></span><div><h3>Trusted community</h3><p>Shop confidently with seller ratings and customer feedback.</p></div></div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Find your next digital essential.</h2><p>Browse thousands of products from one clean marketplace.</p></div>
          <a className="primary-btn" href="#featured">Explore marketplace <ArrowRight size={18} /></a>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div><a className="brand" href="#"><span className="brand-mark">A</span><span>Active<span>Hub</span></span></a><p>A modern digital marketplace for products, subscriptions and services.</p></div>
          <div><h4>Marketplace</h4><a href="#categories">Categories</a><a href="#featured">Featured</a><a href="#">All products</a></div>
          <div><h4>Company</h4><a href="#">About</a><a href="#">Contact</a><a href="#">Help center</a></div>
          <div><h4>Legal</h4><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Refund policy</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 MasayoshiHub. All rights reserved.</span><span>Made for a better digital shopping experience.</span></div>
      </footer>
    </main>
  );
                  }
