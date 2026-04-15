import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 text-3xl font-extrabold">Orders</h1>

        {orders.length === 0 ? (
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-10 text-center">
            <h2 className="text-xl font-bold">No orders yet 😢</h2>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-lg font-bold">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {order.date}
                    </p>
                  </div>

                  <span className="rounded-xl bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                    Processing
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-4 border-t border-[var(--border)] pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}