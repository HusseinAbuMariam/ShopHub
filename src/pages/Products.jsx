import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";
import SectionTitle from "../components/shared/SectionTitle";
import { categories, products } from "../data/mockData";

export default function Products() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const initialCategory = params.get("category") || "all";
  const initialQuery = params.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const term = query.toLowerCase().trim();
      const matchQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.vendor.toLowerCase().includes(term);
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionTitle title="All Products" action={`${filteredProducts.length} items`} />

        <div className="mb-6 grid gap-4 md:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
            <h3 className="text-lg font-bold">Filters</h3>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-semibold text-[var(--muted)]">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product or vendor"
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none"
              />
            </label>

            <div className="mt-6">
              <span className="mb-3 block text-sm font-semibold text-[var(--muted)]">Category</span>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      selectedCategory === category.slug
                        ? "bg-orange-500 text-white"
                        : "border border-[var(--border)] bg-[var(--bg)] hover:border-orange-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-12 text-center shadow-sm">
                <h3 className="text-xl font-bold">No products found</h3>
                <p className="mt-2 text-[var(--muted)]">Try a different search or category.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
