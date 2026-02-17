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
    <header className="fixed top-0 right-0 left-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">רונן עמוס</span>
            <span className="hidden text-sm text-text-secondary sm:block">
              רו&quot;ח | יועץ טכנולוגי
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-teal-400"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-6 w-px bg-white/10" />
            <UserMenu />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-text-secondary hover:bg-glass-light md:hidden"
            aria-label="תפריט"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="border-t border-glass-border pb-6 pt-4 md:hidden animate-wow">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-text-secondary transition-colors hover:bg-glass-light hover:text-teal-400"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-white/5 pt-2 flex justify-center">
                <UserMenu />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
