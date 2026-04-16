import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function Store() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_URL}/api/customer/stores/${id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success && !data.data) {
          setNotFound(true);
        } else {
          const storeData = data.data || data;
          setStore(storeData.store || storeData);
          setStoreProducts(storeData.products || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setNotFound(true);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [id]);

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

  if (notFound || !store) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <CategoryBar />

        <main className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 shadow-sm">
            <h1 className="text-3xl font-extrabold">Store not found</h1>
            <p className="mt-3 text-[var(--muted)]">
              The store you are looking for does not exist.
            </p>
            <Link
              to="/vendors"
              className="mt-6 inline-block rounded-2xl bg-[var(--nav)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Back to Vendors
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-6">
          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            ← Back to Vendors
          </Link>
        </div>

        {/* Banner */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-orange-100">
          {store.logo ? (
            <img
              src={store.logo}
              alt={store.name}
              className="h-48 w-full object-cover sm:h-56 md:h-64"
            />
          ) : (
            <div className="flex h-48 items-center justify-center sm:h-56 md:h-64">
              <span className="text-6xl font-extrabold text-orange-400">{store.name?.[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4 text-center">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {store.name}
            </h1>
          </div>
        </div>

        {/* Info */}
        <div className="mb-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h2 className="text-2xl font-bold">{store.name}</h2>
          {store.description && (
            <p className="mt-2 text-[var(--muted)]">{store.description}</p>
          )}
        </div>

        {/* Products */}
        <div>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-2xl font-bold">Products</h3>
            <span className="text-sm font-medium text-[var(--muted)]">
              {storeProducts.length} product{storeProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {storeProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {storeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-sm">
              <p className="text-[var(--muted)]">No products available</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}