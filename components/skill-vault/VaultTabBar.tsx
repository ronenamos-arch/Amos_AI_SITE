"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function VaultTabBar() {
  const pathname = usePathname();
  const isPrompts = pathname === "/skill-vault" || pathname === "/skill-vault/";
  const isCleaning = pathname.startsWith("/skill-vault/cleaning");

  return (
    <div className="vault-tabbar-wrap">
      <nav className="vault-tabbar">
        <Link href="/" className="vault-tabbar-back">
          ← חזרה לאתר
        </Link>

        <div className="vault-tabbar-tabs">
          <Link
            href="/skill-vault"
            className={`vault-tab ${isPrompts ? "vault-tab-active" : ""}`}
          >
            Prompt Vault
          </Link>
          <Link
            href="/skill-vault/cleaning"
            className={`vault-tab ${isCleaning ? "vault-tab-active" : ""}`}
          >
            ניקוי נתונים
          </Link>
        </div>
      </nav>
    </div>
  );
}
