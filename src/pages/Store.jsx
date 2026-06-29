import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function Store() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_URL}/api/customer/stores/${id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success && !data.data) {
          setNotFound(true);
        } else {
          const storeData = data.data || data;
          setStore(storeData);
          setStoreProducts(storeData.products || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") { setNotFound(true); setLoading(false); }
      });
    return () => controller.abort();
  }, [id]);

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

  if (notFound || !store) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 shadow-sm">
            <span className="text-6xl">🏪</span>
            <h1 className="mt-4 text-3xl font-extrabold">Store not found</h1>
            <p className="mt-2 text-[var(--muted)]">The store you're looking for doesn't exist.</p>
            <Link to="/vendors" className="mt-6 inline-block rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700">
              Browse Stores
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const ratingValue = store.rating?.value || store.rating || "N/A";

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

        {/* Back */}
        <Link to="/vendors" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-violet-600">
          ← Back to Stores
        </Link>

        {/* Banner */}
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          {store.cover || store.logo ? (
            <img src={store.cover || store.logo} alt={store.name} className="h-52 w-full object-cover md:h-64" />
          ) : (
            <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100 md:h-64">
              <span className="text-8xl font-extrabold text-violet-300">{store.name?.[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Store info card */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:flex-row sm:items-center">
          {/* Logo */}
          <div className="shrink-0">
            {store.logo ? (
              <img src={store.logo} alt={store.name} className="h-20 w-20 rounded-2xl object-cover ring-4 ring-violet-100 shadow-lg" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-100 text-3xl font-extrabold text-violet-600 ring-4 ring-violet-50 shadow-lg">
                {store.name?.[0]}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold">{store.name}</h1>
            {store.description && (
              <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{store.description}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              <span className="flex items-center gap-1">
                📦 <strong className="text-[var(--text)]">{storeProducts.length}</strong> Products
              </span>
              {store.rating && (
                <span className="flex items-center gap-1">
                  ⭐ <strong className="text-[var(--text)]">{ratingValue}</strong> Rating
                </span>
              )}
              {store.created_at && (
                <span className="flex items-center gap-1">
                  📅 Since <strong className="text-[var(--text)]">{new Date(store.created_at).getFullYear()}</strong>
                </span>
              )}
              {store.category?.name && (
                <span className="flex items-center gap-1">
                  🗂️ <strong className="text-[var(--text)]">{store.category.name}</strong>
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="mb-6 flex w-fit gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-sm">
          {["products", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold capitalize transition ${
                activeTab === tab ? "bg-violet-600 text-white shadow-sm" : "text-[var(--muted)] hover:text-violet-600"
              }`}
            >
              {tab === "products" ? `🛍️ Products (${storeProducts.length})` : "ℹ️ About"}
            </button>
          ))}
        </div>

        {/* Products tab */}
        {activeTab === "products" && (
          <div>
            {storeProducts.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-[var(--muted)]">{storeProducts.length} products available</p>
                  <select className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-violet-500">
                    <option>Sort: Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {storeProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center shadow-sm">
                <span className="text-5xl">📭</span>
                <p className="mt-4 font-semibold text-[var(--text)]">No products yet</p>
                <p className="mt-1 text-sm text-[var(--muted)]">This store hasn't added any products yet.</p>
              </div>
            )}
          </div>
        )}

        {/* About tab */}
        {activeTab === "about" && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">About {store.name}</h2>
            {store.description ? (
              <p className="text-sm leading-7 text-[var(--muted)]">{store.description}</p>
            ) : (
              <p className="text-sm text-[var(--muted)]">No description available.</p>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Store Name", value: store.name },
                { label: "Category", value: store.category?.name || "General" },
                { label: "Member Since", value: store.created_at ? new Date(store.created_at).toLocaleDateString() : "N/A" },
                { label: "Email", value: store.email || "N/A" },
                { label: "Phone", value: store.phone || "N/A" },
                { label: "Address", value: store.address || "N/A" },
              ].map((info) => (
                <div key={info.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-xs text-[var(--muted)]">{info.label}</p>
                  <p className="mt-1 font-semibold text-[var(--text)]">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
