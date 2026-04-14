import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import { products } from "../data/mockData";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <CategoryBar />
        <main className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-3xl font-extrabold">Product not found</h1>
          <Link to="/products" className="mt-6 inline-block rounded-2xl bg-[var(--nav)] px-6 py-3 font-semibold text-white">
            Back to products
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
              {product.badge}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold">{product.name}</h1>
            <p className="mt-2 text-lg text-[var(--muted)]">{product.vendor}</p>
            <p className="mt-6 text-base leading-8 text-[var(--muted)]">{product.description}</p>

            <div className="mt-8 flex items-end gap-4">
              <p className="text-3xl font-extrabold">{formatCurrency(product.price)}</p>
              <p className="text-lg text-[var(--muted)] line-through">{formatCurrency(product.oldPrice)}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => addToCart(product)}
                className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Add to Cart
              </button>
              <button className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-6 py-3 font-semibold transition hover:-translate-y-0.5">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
