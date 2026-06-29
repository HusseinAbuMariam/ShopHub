import { useMemo, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";
const ALL = "all";

export default function Products() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const selectedCategory = params.get("category") || ALL;
  const query = params.get("search") || "";
  const minPrice = params.get("min") || "";
  const maxPrice = params.get("max") || "";

  const setFilter = (key, value) => {
    const next = new URLSearchParams(search);
    if (value && value !== ALL) next.set(key, value);
    else next.delete(key);
    navigate(`/products?${next.toString()}`, { replace: true });
  };

  const resetFilters = () => navigate("/products", { replace: true });

  // Local search input state — avoids losing focus on every keystroke
  // since URL navigation re-renders the page. We debounce the URL update.
  const [searchInput, setSearchInput] = useState(query);
  const debounceRef = useRef(null);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilter("search", value);
    }, 400);
  };

  // Local price input state with debounce — same fix as search
  const [minInput, setMinInput] = useState(minPrice);
  const [maxInput, setMaxInput] = useState(maxPrice);
  const minDebounceRef = useRef(null);
  const maxDebounceRef = useRef(null);

  useEffect(() => { setMinInput(minPrice); }, [minPrice]);
  useEffect(() => { setMaxInput(maxPrice); }, [maxPrice]);

  const handleMinChange = (value) => {
    setMinInput(value);
    if (minDebounceRef.current) clearTimeout(minDebounceRef.current);
    minDebounceRef.current = setTimeout(() => setFilter("min", value), 400);
  };

  const handleMaxChange = (value) => {
    setMaxInput(value);
    if (maxDebounceRef.current) clearTimeout(maxDebounceRef.current);
    maxDebounceRef.current = setTimeout(() => setFilter("max", value), 400);
  };

  const [productsData, setProductsData] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceCap, setPriceCap] = useState(1000);

  useEffect(() => {
    const controller = new AbortController();
    const opts = { signal: controller.signal };

    Promise.all([
      fetch(`${BASE_URL}/api/customer/stores`, opts).then((r) => r.json()),
      fetch(`${BASE_URL}/api/customer/store-categories`, opts).then((r) => r.json()),
    ])
      .then(([storeData, catData]) => {
        const stores =
          storeData?.data?.data ||
          storeData?.data ||
          (Array.isArray(storeData) ? storeData : []);

        const cats =
          catData?.data?.data ||
          catData?.data ||
          (Array.isArray(catData) ? catData : []);
        setApiCategories(cats);

        // جيب تفاصيل كل store عشان نحصل على منتجاتها
        return Promise.all(
          stores.map((store) =>
            fetch(`${BASE_URL}/api/customer/stores/${store.slug}`, opts)
              .then((r) => r.json())
              .catch(() => null)
          )
        );
      })
      .then((storeDetails) => {
        const allProducts = [];
        (storeDetails || []).forEach((res) => {
          const store = res?.data;
          if (!store) return;
          (store.products || []).forEach((p) => {
            allProducts.push({
              ...p,
              store: {
                id: store.id,
                name: store.name,
                slug: store.slug,
                category_id: store.category_id,
              },
            });
          });
        });

        setProductsData(allProducts);
        const maxP = Math.max(...allProducts.map((p) => p.price || 0), 100);
        setPriceCap(Math.ceil(maxP / 100) * 100);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const categoryList = useMemo(() => [
    { id: ALL, name: "All Categories" },
    ...apiCategories.map((c) => ({ id: String(c.id), name: c.name })),
  ], [apiCategories]);

  const productCountByCategory = useMemo(() => {
    const counts = {};
    productsData.forEach((p) => {
      const cid = String(p.store?.category_id || "");
      counts[cid] = (counts[cid] || 0) + 1;
    });
    return counts;
  }, [productsData]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory =
        selectedCategory === ALL ||
        String(product.store?.category_id) === selectedCategory ||
        product.category === selectedCategory;

      const term = query.toLowerCase().trim();
      const vendorName = product.vendor || product.store?.name || "";
      const matchQuery =
        !term ||
        product.name?.toLowerCase().includes(term) ||
        vendorName.toLowerCase().includes(term);

      const matchMin = !minPrice || product.price >= Number(minPrice);
      const matchMax = !maxPrice || product.price <= Number(maxPrice);

      return matchCategory && matchQuery && matchMin && matchMax;
    });
  }, [productsData, selectedCategory, query, minPrice, maxPrice]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Navbar />
        <div className="flex h-96 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        </div>
        <Footer />
      </div>
    );
  }

  const inputClass = "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition";

  const SidebarContent = () => (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </div>
          <h3 className="text-base font-extrabold text-[var(--text)]">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-violet-600 transition hover:bg-violet-50"
        >
          Reset all
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
          Search
        </label>
        <div className="relative">
          <svg className="absolute left-3 top-3 h-4 w-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
          <input
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-9 pr-9 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
          {searchInput && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--card)] transition hover:bg-red-500"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Price Range</label>
          {(minInput || maxInput) && (
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold text-violet-700">
              ${minInput || 0} – ${maxInput || priceCap}
            </span>
          )}
        </div>

        {/* Min / Max inputs */}
        <div className="flex items-center gap-2">
          {/* Min */}
          <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
            <span className="pl-3 text-xs font-bold text-violet-500">$</span>
            <input
              type="number" min="0" placeholder="0"
              value={minInput}
              onChange={(e) => handleMinChange(e.target.value)}
              className="w-full bg-transparent py-3 pl-1.5 pr-1 text-sm font-semibold text-[var(--text)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <div className="flex flex-col border-l border-[var(--border)]">
              <button type="button"
                onClick={() => handleMinChange(String(Math.max(0, Number(minInput || 0) + 1)))}
                className="flex h-5 w-6 items-center justify-center text-[var(--muted)] transition hover:bg-violet-600 hover:text-white">
                <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button type="button"
                onClick={() => handleMinChange(String(Math.max(0, Number(minInput || 0) - 1)))}
                className="flex h-5 w-6 items-center justify-center border-t border-[var(--border)] text-[var(--muted)] transition hover:bg-violet-600 hover:text-white">
                <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>

          <span className="text-sm text-[var(--muted)]">—</span>

          {/* Max */}
          <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
            <span className="pl-3 text-xs font-bold text-violet-500">$</span>
            <input
              type="number" min="0" placeholder="Max"
              value={maxInput}
              onChange={(e) => handleMaxChange(e.target.value)}
              className="w-full bg-transparent py-3 pl-1.5 pr-1 text-sm font-semibold text-[var(--text)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <div className="flex flex-col border-l border-[var(--border)]">
              <button type="button"
                onClick={() => handleMaxChange(String(Math.max(0, Number(maxInput || 0) + 1)))}
                className="flex h-5 w-6 items-center justify-center text-[var(--muted)] transition hover:bg-violet-600 hover:text-white">
                <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button type="button"
                onClick={() => handleMaxChange(String(Math.max(0, Number(maxInput || 0) - 1)))}
                className="flex h-5 w-6 items-center justify-center border-t border-[var(--border)] text-[var(--muted)] transition hover:bg-violet-600 hover:text-white">
                <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Categories</label>
        <div className="max-h-72 space-y-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[var(--border)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-violet-400 hover:[&::-webkit-scrollbar-thumb]:bg-violet-600">
          {categoryList.map((cat) => {
            const count = cat.id === ALL ? productsData.length : (productCountByCategory[cat.id] || 0);
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setFilter("category", cat.id); setSidebarOpen(false); }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-[var(--text)] hover:bg-[var(--surface)]"
                }`}
              >
                <span className="text-sm font-semibold">{cat.name}</span>
                <span className={`min-w-[22px] rounded-full px-2 py-0.5 text-center text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-[var(--border)] text-[var(--muted)]"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">All Products</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {filteredProducts.length} products
              {selectedCategory !== ALL && (
                <> in <span className="font-semibold text-violet-600">{categoryList.find(c => c.id === selectedCategory)?.name}</span></>
              )}
              {query && <> for "<span className="font-semibold text-violet-600">{query}</span>"</>}
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-semibold transition hover:border-violet-300 md:hidden"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707L13 13.414V19a1 1 0 0 1-.553.894l-4 2A1 1 0 0 1 7 21v-7.586L3.293 6.707A1 1 0 0 1 3 6V4Z" />
            </svg>
            Filters
          </button>
        </div>

        {/* Active filter chips */}
        {(selectedCategory !== ALL || query || minPrice || maxPrice) && (
          <div className="mb-5 flex flex-wrap gap-2">
            {selectedCategory !== ALL && (
              <span className="flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                {categoryList.find(c => c.id === selectedCategory)?.name}
                <button onClick={() => setFilter("category", ALL)} className="ml-1 hover:text-red-500">×</button>
              </span>
            )}
            {query && (
              <span className="flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                "{query}"
                <button onClick={() => setFilter("search", "")} className="ml-1 hover:text-red-500">×</button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                ${minPrice || "0"} – ${maxPrice || "∞"}
                <button onClick={() => { setFilter("min", ""); setFilter("max", ""); }} className="ml-1 hover:text-red-500">×</button>
              </span>
            )}
            <button onClick={resetFilters} className="text-xs font-semibold text-red-500 hover:text-red-600">
              Clear all
            </button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[270px_1fr]">

          {/* Desktop Sidebar */}
          <aside className="hidden h-fit rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm md:block sticky top-24">
            <SidebarContent />
          </aside>

          {/* Mobile Sidebar Drawer */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <div className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-[var(--card)] p-5 shadow-2xl md:hidden">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-extrabold">Filters</h3>
                  <button onClick={() => setSidebarOpen(false)} className="text-[var(--muted)] hover:text-[var(--text)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <SidebarContent />
              </div>
            </>
          )}

          {/* Products Grid */}
          <section>
            {filteredProducts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-16 text-center shadow-sm">
                <span className="text-5xl">🔍</span>
                <h3 className="mt-4 text-xl font-bold">No products found</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">Try a different search term, category, or price range.</p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}