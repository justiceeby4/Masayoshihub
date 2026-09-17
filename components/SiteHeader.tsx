"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { createClient } from "../utils/supabase/client";

const NAV_LINKS = [
  { href: "/categories", label: "Categories" },
  { href: "/featured", label: "Featured" },
  { href: "/how-it-works", label: "How it works" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setLoggedIn(false);
    setOpen(false);
  }

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
            <span>
              Masayoshi<span className="brand-purple">Hub</span>
            </span>
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

            {loggedIn ? (
              <>
                <Link href="/dashboard" className="login">
                  Dashboard
                </Link>

                <button
                  type="button"
                  className="signup"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="login">
                  Log in
                </Link>

                <Link href="/signup" className="signup">
                  Create account
                </Link>
              </>
            )}

            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
