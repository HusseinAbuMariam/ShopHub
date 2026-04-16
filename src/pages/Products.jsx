import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";
import SectionTitle from "../components/shared/SectionTitle";
import { products as mockProducts } from "../data/mockData";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

const ALL = "all";

export default function Products() {
  const { search } = useLocation();
  const navigate = useNavigate();

  // Derive filter values directly from the URL — no mirroring into state
  const params = new URLSearchParams(search);
  const selectedCategory = params.get("category") || ALL;
  const query = params.get("search") || "";
  const minPrice = params.get("min") || "";
  const maxPrice = params.get("max") || "";

  // Update a single filter in the URL from an event handler
  const setFilter = (key, value) => {
    const next = new URLSearchParams(search);
    if (value && value !== ALL) next.set(key, value);
    else next.delete(key);
    navigate(`/products?${next.toString()}`, { replace: true });
  };

  const resetFilters = () => navigate("/products", { replace: true });

  const [productsData, setProductsData] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    // Fetch products and store-categories in parallel
    Promise.all([
      fetch(`${BASE_URL}/api/customer/products`, { signal: controller.signal }).then((r) => r.json()),
      fetch(`${BASE_URL}/api/customer/store-categories`, { signal: controller.signal }).then((r) => r.json()),
    ])
      .then(([prodData, catData]) => {
        const apiProducts = prodData.data?.data || prodData.data || [];
        setProductsData(apiProducts.length > 0 ? apiProducts : mockProducts);

        const cats = catData.data || [];
        setApiCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setProductsData(mockProducts);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Build the category list: "All" + API store-categories
  const categoryList = useMemo(() => {
    return [
      { id: ALL, name: "All Categories", slug: ALL },
      ...apiCategories.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug })),
    ];
  }, [apiCategories]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory =
        selectedCategory === ALL ||
        // API products: match by store's category_id
        String(product.store?.category_id) === selectedCategory ||
        // Mock products: match by category slug on the product itself
        product.category === selectedCategory;

      const term = query.toLowerCase().trim();
      const vendorName = product.vendor || product.store?.name || "";
      const matchQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        vendorName.toLowerCase().includes(term);

      const matchMinPrice = !minPrice || product.price >= Number(minPrice);
      const matchMaxPrice = !maxPrice || product.price <= Number(maxPrice);

      return matchCategory && matchQuery && matchMinPrice && matchMaxPrice;
    });
  }, [productsData, selectedCategory, query, minPrice, maxPrice]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <CategoryBar />
        <div className="p-10 text-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionTitle
          title="All Products"
          action={`${filteredProducts.length} items`}
        />

        <div className="mb-6 grid gap-4 md:grid-cols-[260px_1fr]">
          
          {/* Sidebar */}
          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
            <h3 className="text-lg font-bold">Filters</h3>

            {/* Search */}
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-semibold text-[var(--muted)]">
                Search
              </span>
              <input
                value={query}
                onChange={(e) => setFilter("search", e.target.value)}
                placeholder="Search by product or vendor"
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none"
              />
            </label>

            {/* Price */}
            <div className="flex gap-2 p-3">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setFilter("min", e.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 outline-none"
              />

              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setFilter("max", e.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 outline-none"
              />
            </div>

            {/* Category */}
            <div className="mt-6">
              <span className="mb-3 block text-sm font-semibold text-[var(--muted)]">
                Category
              </span>

              <div className="space-y-2">
                {categoryList.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter("category", category.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      selectedCategory === category.id
                        ? "bg-orange-500 text-white"
                        : "border border-[var(--border)] bg-[var(--bg)] hover:border-orange-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="mt-6 w-full rounded-2xl bg-gray-200 py-2 font-semibold hover:bg-gray-300"
            >
              Reset Filters
            </button>
          </aside>

          {/* Products */}
          <section>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-12 text-center shadow-sm">
                <h3 className="text-xl font-bold">No products found</h3>
                <p className="mt-2 text-[var(--muted)]">
                  Try a different search or category.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}