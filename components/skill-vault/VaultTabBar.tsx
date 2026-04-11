"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function VaultTabBar() {
  const pathname = usePathname();
  const isPrompts = pathname === "/skill-vault" || pathname === "/skill-vault/";
  const isCleaning = pathname.startsWith("/skill-vault/cleaning");

  return (
    <nav className="vault-tabbar">
      <div className="vault-tabbar-inner">
        <Link href="/" className="vault-tabbar-back">
          ← חזרה לאתר
        </Link>

        <div className="vault-tabbar-tabs">
          <Link
            href="/skill-vault"
            className={`vault-tab ${isPrompts ? "vault-tab-active" : ""}`}
          >
            <span className="vault-tab-icon">🗃️</span>
            <span>Prompt Vault</span>
          </Link>
          <Link
            href="/skill-vault/cleaning"
            className={`vault-tab ${isCleaning ? "vault-tab-active" : ""}`}
          >
            <span className="vault-tab-icon">🧹</span>
            <span>ניקוי נתונים</span>
          </Link>
        </div>

        <div className="vault-tabbar-spacer" />
      </div>
    </nav>
  );
}
