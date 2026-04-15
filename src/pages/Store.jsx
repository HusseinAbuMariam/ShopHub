import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";

import { vendors, products } from "../data/mockData";

export default function Store() {
  const { id } = useParams();

  const store = vendors.find((v) => v.id === Number(id));
  const storeProducts = products.filter((p) => p.vendorId === Number(id));

  if (!store) {
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
        <div className="relative mb-10 overflow-hidden rounded-3xl">
          <img
            src={store.logo}
            alt={store.name}
            className="h-48 w-full object-cover sm:h-56 md:h-64"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4 text-center">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {store.name}
            </h1>
          </div>
        </div>

        {/* Info */}
        <div className="mb-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h2 className="text-2xl font-bold">{store.name}</h2>
          <p className="mt-2 text-[var(--muted)]">{store.tagline}</p>
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