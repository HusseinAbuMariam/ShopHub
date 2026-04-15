import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const shipping = items.length ? 12 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 text-3xl font-extrabold">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <Link to="/products" className="mt-6 inline-block rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
            <section className="space-y-4">
              {items.map((item) => (
                <article key={item.id} className="flex flex-col gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm md:flex-row md:items-center">
                  <img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="mt-1 text-[var(--muted)]">{formatCurrency(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-10 w-10 rounded-xl border border-[var(--border)]"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-10 w-10 rounded-xl border border-[var(--border)]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold">Order Summary</h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-[var(--border)] pt-4 text-lg font-extrabold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <button className="mt-6 w-full rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white">
                  Proceed to Checkout
                </button>
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
