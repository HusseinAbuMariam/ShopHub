import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";
import SectionTitle from "../components/shared/SectionTitle";
import { categories} from "../data/mockData";
import { products } from "../data/mockData"; 
export default function Products() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);

  const selectedCategoryFromURL = params.get("category") || "all";
  const queryFromURL = params.get("search") || "";
  const minFromURL = params.get("min") || "";
  const maxFromURL = params.get("max") || "";

  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromURL);
  const [query, setQuery] = useState(queryFromURL);
  const [minPrice, setMinPrice] = useState(minFromURL);
  const [maxPrice, setMaxPrice] = useState(maxFromURL);

  // Sync state when URL changes (back/forward support)
  useEffect(() => {
    const params = new URLSearchParams(search);

    setSelectedCategory(params.get("category") || "all");
    setQuery(params.get("search") || "");
    setMinPrice(params.get("min") || "");
    setMaxPrice(params.get("max") || "");
  }, [search]);
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
  fetch("http://localhost/api/products.php")
    .then((res) => res.json())
    .then((data) => {
      setProductsData(data);
      setLoading(false);
    })
    .catch(() => {
      console.log("API error → using mock data");
      setProductsData(products); // fallback
      setLoading(false);
    });
}, []);
  // Update URL when filters change (with safety check)
  useEffect(() => {
    const newParams = new URLSearchParams();

    if (selectedCategory !== "all") {
      newParams.set("category", selectedCategory);
    }

    if (query) {
      newParams.set("search", query);
    }

    if (minPrice) {
      newParams.set("min", minPrice);
    }

    if (maxPrice) {
      newParams.set("max", maxPrice);
    }

    const newSearch = newParams.toString();
    const currentSearch = search.startsWith("?") ? search.slice(1) : search;

    if (newSearch !== currentSearch) {
      navigate(`/products?${newSearch}`, { replace: true });
    }
  }, [selectedCategory, query, minPrice, maxPrice, search, navigate]);

  const filteredProducts = useMemo(() => {
        if (loading) {
      return <div className="p-10 text-center">Loading...</div>;
    }
    return productsData.filter((product) => {
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const term = query.toLowerCase().trim();
      const matchQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.vendor.toLowerCase().includes(term);

      const matchMinPrice =
        !minPrice || product.price >= Number(minPrice);

      const matchMaxPrice =
        !maxPrice || product.price <= Number(maxPrice);

      return matchCategory && matchQuery && matchMinPrice && matchMaxPrice;
    });
  }, [selectedCategory, query, minPrice, maxPrice]);

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
                onChange={(e) => setQuery(e.target.value)}
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
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 outline-none"
              />

              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 outline-none"
              />
            </div>

            {/* Category */}
            <div className="mt-6">
              <span className="mb-3 block text-sm font-semibold text-[var(--muted)]">
                Category
              </span>

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

            {/* Reset */}
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory("all");
                setMinPrice("");
                setMaxPrice("");
              }}
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