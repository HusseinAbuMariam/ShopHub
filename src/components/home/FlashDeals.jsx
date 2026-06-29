import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../shared/ProductCard";

export default function FlashDeals({ products = [] }) {
  const [time, setTime] = useState({ h: 2, m: 45, s: 30 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[var(--text)]">
            ⚡ Flash Deals
          </h2>
          <p className="text-xs text-[var(--muted)]">Limited time offers on amazing products</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--muted)]">Ends in:</span>
          <div className="flex items-center gap-1">
            {[["h", time.h], ["m", time.m], ["s", time.s]].map(([label, val]) => (
              <div key={label} className="flex flex-col items-center">
                <span className="rounded-lg bg-slate-900 px-2 py-1 text-sm font-black text-white tabular-nums">{pad(val)}</span>
                <span className="text-[9px] text-[var(--muted)] mt-0.5">{label === "h" ? "Hours" : label === "m" ? "Mins" : "Secs"}</span>
              </div>
            ))}
          </div>
          <Link to="/products" className="text-sm font-semibold text-violet-600 hover:text-violet-700">View All Deals →</Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {products.slice(0, 6).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}