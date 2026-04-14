import { useParams } from "react-router-dom";
import { topSellers, products } from "../data/mockData";
import ProductCard from "../components/shared/ProductCard";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";

export default function SellerDetails() {
  const { id } = useParams();

  const seller = topSellers.find((s) => s.id === Number(id));

  const sellerProducts = products.filter(
    (p) => p.sellerId === Number(id)
  );

  if (!seller) {
    return (
      <div className="p-10 text-center text-xl font-bold">
        Seller not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* NAV */}
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

        {/* 🔥 HEADER (Store Banner Style) */}
        <div className="flex items-center gap-6 mb-12 p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">

          <img
            src={seller.logo}
            alt={seller.name}
            className="h-24 w-24 rounded-2xl object-cover"
          />

          <div>
            <h1 className="text-3xl font-extrabold">{seller.name}</h1>
            <p className="text-[var(--muted)] mt-1">
              Premium Seller Store
            </p>

            {/* optional badge */}
            <div className="mt-3">
              <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold">
                Verified Seller
              </span>
            </div>
          </div>
        </div>

        {/* 🔥 PRODUCTS */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-sm text-[var(--muted)]">
            All products from this seller
          </p>
        </div>

        {sellerProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {sellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">
            No products available for this seller
          </p>
        )}

      </main>

      <Footer />
    </div>
  );
}