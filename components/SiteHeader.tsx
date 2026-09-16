"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";

const NAV_LINKS = [
  { href: "/categories", label: "Categories" },
  { href: "/featured", label: "Featured" },
  { href: "/how-it-works", label: "How it works" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Fast delivery • Secure checkout • 24/7 support</span>
          <span className="topbar-right">Trusted by 50,000+ customers</span>
        </div>
      </div>

      <header className="header">
        <div className="container nav">
          <Link href="/" className="brand">
            <span className="brand-mark">M</span>
            <span>Masayoshi<span>Hub</span></span>
          </Link>

          <nav className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link href="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingCart size={17} />
            </Link>
            <Link href="/login" className="login">
              Log in
            </Link>
            <Link href="/signup" className="signup">
              Create account
            </Link>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)}>
              Create account
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

