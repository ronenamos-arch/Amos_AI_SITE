"use client";

import { useState } from "react";
import Link from "next/link";
import { DigitalProduct, PRODUCT_CATEGORIES, ProductCategory } from "@/lib/products-data";
import { ArrowLeft, CheckCircle2, ExternalLink, Sparkles, Tag, ShieldCheck, Download, Zap } from "lucide-react";

interface ProductsCatalogClientProps {
  products: DigitalProduct[];
}

export function ProductsCatalogClient({ products }: ProductsCatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const flagshipProduct = products.find((p) => p.isFlagship);

  return (
    <div className="space-y-12">
      {/* 1. FLAGSHIP HERO BANNER (AR COMMAND CENTER) */}
      {flagshipProduct && (
        <section className="relative overflow-hidden rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-slate-950 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          {/* Ambient decorative glow */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>מוצר הדגל • גרסה 2.4</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                דוחות החייבים שלכם תקועים ב-1995? <br className="hidden sm:inline" />
                <span className="bg-gradient-to-l from-indigo-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  הגיע הזמן לחמ״ל AI
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {flagshipProduct.description}
              </p>

              {/* Feature bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {flagshipProduct.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">{flagshipProduct.price}</span>
                  {flagshipProduct.originalPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono">{flagshipProduct.originalPrice}</span>
                  )}
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    מחיר השקה
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={flagshipProduct.internalUrl || "/products/ar-command-center"}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>צפה בדף המוצר המלא והסרטון</span>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Visual (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <Link
                href={flagshipProduct.internalUrl || "/products/ar-command-center"}
                className="group relative block w-full max-w-md overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-950 shadow-2xl transition-all duration-300 hover:border-indigo-400 hover:shadow-indigo-500/20"
              >
                {flagshipProduct.coverImage ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={flagshipProduct.coverImage}
                      alt={flagshipProduct.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
                      <span className="font-mono bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-md">
                        AR Command Center v2.4
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        הורדה מיידית
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <span className="font-mono text-indigo-300 font-bold">AR Command Center v2.4</span>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. CATEGORY FILTERS & SEARCH */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as ProductCategory)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.key
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "border border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="חיפוש מוצר או נושא..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 3. PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-slate-400">
          <p className="text-sm">לא נמצאו מוצרים התואמים את החיפוש שלך.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}

      {/* 4. TRUST & GUARANTEE BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-center text-slate-400 text-xs">
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 p-4">
          <Zap className="h-5 w-5 text-amber-400 mx-auto mb-2" />
          <p className="font-bold text-slate-200">הורדה מיידית</p>
          <p className="text-slate-400 mt-0.5">כל הקבצים והפרומפטים זמינים מיידית לאחר התשלום</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 p-4">
          <ShieldCheck className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
          <p className="font-bold text-slate-200">בדיקה על נתוני אמת</p>
          <p className="text-slate-400 mt-0.5">כל כלי ומודל נבנה ונבדק במחלקות כספים וביקורת</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 p-4">
          <Tag className="h-5 w-5 text-indigo-400 mx-auto mb-2" />
          <p className="font-bold text-slate-200">גישה לכל החיים</p>
          <p className="text-slate-400 mt-0.5">רכישה חד-פעמית ללא דמי מנוי חודשיים</p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: DigitalProduct }) {
  const isInternal = !!product.internalUrl;
  const targetUrl = product.internalUrl || product.gumroadUrl;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
            {product.categoryLabel}
          </span>
          {product.badge && (
            <span className="rounded-md bg-indigo-500/20 border border-indigo-500/40 px-2.5 py-0.5 text-[11px] font-bold text-indigo-300">
              {product.badge}
            </span>
          )}
        </div>

        {/* Thumbnail / Image if available */}
        {product.coverImage && (
          <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-slate-950">
            <img
              src={product.coverImage}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Title & Tagline */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {product.tagline}
        </p>

        {/* Format tag */}
        <div className="mb-4 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>{product.format}</span>
        </div>
      </div>

      {/* Footer / Price & Button */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-white font-mono">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through font-mono">{product.originalPrice}</span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">תשלום מאובטח</span>
        </div>

        {isInternal ? (
          <Link
            href={targetUrl}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow transition-all hover:scale-105 active:scale-95"
          >
            <span>דף מוצר</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 px-4 py-2 text-xs font-bold text-slate-200 transition-all hover:scale-105 active:scale-95"
          >
            <span>רכישה מהירה</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
