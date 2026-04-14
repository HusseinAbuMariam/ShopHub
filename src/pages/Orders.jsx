import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";

export default function Orders() {
  const orders = [
    { id: "#1042", status: "Processing", amount: "$129.00" },
    { id: "#1043", status: "Delivered", amount: "$79.00" },
    { id: "#1044", status: "Pending", amount: "$320.00" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />
      <main className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 text-3xl font-extrabold">Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
              <div>
                <p className="text-lg font-bold">{order.id}</p>
                <p className="text-[var(--muted)]">{order.status}</p>
              </div>
              <p className="text-xl font-extrabold">{order.amount}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
