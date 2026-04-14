import { useParams } from "react-router-dom";
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
    return <div className="p-10 text-center">Store not found</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

        {/* 🔥 Banner */}
        <div className="relative mb-10 rounded-3xl overflow-hidden">
          <img
            src={store.logo}
            alt={store.name}
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">
              {store.name}
            </h1>
          </div>
        </div>

        {/* 🔥 Info */}
        <div className="mb-8">
          <h2 className="text-xl font-bold">{store.name}</h2>
          <p className="text-[var(--muted)]">{store.tagline}</p>
        </div>

        {/* 🔥 Products */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Products</h3>

          {storeProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {storeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-[var(--muted)]">No products available</p>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}