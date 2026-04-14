import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/shared/ProductCard";
import { products } from "../data/mockData";

export default function Wishlist() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 text-3xl font-extrabold">Wishlist</h1>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
