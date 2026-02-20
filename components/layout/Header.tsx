"use client";

import Link from "next/link";
import { useState } from "react";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/services", label: "שירותים" },
  { href: "/training", label: "הכשרות" },
  { href: "/courses", label: "קורסים" },
  { href: "/pricing", label: "מנוי פרימיום" },
  { href: "/blog", label: "בלוג" },
  { href: "/contact", label: "צור קשר" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50"
      style={{
        background: "rgba(2, 6, 23, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">רונן עמוס</span>
            <span className="hidden text-sm sm:block" style={{ color: "#94a3b8" }}>
              רו&quot;ח | יועץ טכנולוגי
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-teal-400"
                style={{ color: "#94a3b8" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-6 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <UserMenu />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 md:hidden"
            style={{ color: "#94a3b8" }}
            aria-label="תפריט"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav - with explicit dark background so text is visible */}
        {mobileOpen && (
          <nav
            className="pb-6 pt-4 md:hidden animate-wow"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(2, 6, 23, 0.98)",
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:text-teal-400"
                  style={{
                    color: "#e2e8f0",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div
                className="mt-2 pt-4 flex justify-center"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <UserMenu />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
