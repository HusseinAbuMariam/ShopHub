import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = items.length ? 12 : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    payment: "cash",

    // 💳 Card Info
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const orderData = {
      id: Date.now(),
      customer: form,
      items,
      subtotal,
      shipping,
      total,
      date: new Date().toLocaleString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, orderData])
    );

    clearCart();
    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 text-3xl font-extrabold">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <h2 className="mb-4 text-xl font-bold">Billing Details</h2>

            <div className="space-y-4">

              {/* Basic Info */}
              <input name="name" placeholder="Full Name" required onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]" />

              <input name="email" type="email" placeholder="Email" required onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]" />

              <input name="phone" placeholder="Phone" required onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]" />

              <input name="address" placeholder="Address" required onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]" />

              <input name="city" placeholder="City" required onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]" />

              {/* PAYMENT TYPE */}
              <select
                name="payment"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]"
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit Card</option>
              </select>

              {/* 💳 CARD DETAILS */}
              {form.payment === "card" && (
                <div className="space-y-3 border-t pt-4">

                  <h3 className="font-bold">Card Information</h3>

                  <input
                    name="cardName"
                    placeholder="Name on Card"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]"
                  />

                  <input
                    name="cardNumber"
                    placeholder="Card Number"
                    maxLength="16"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]"
                  />

                  <div className="flex gap-3">
                    <input
                      name="expiry"
                      placeholder="MM/YY"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]"
                    />

                    <input
                      name="cvv"
                      placeholder="CVV"
                      maxLength="4"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border bg-[var(--bg)]"
                    />
                  </div>
                </div>
              )}
            </div>

            <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-bold">
              Place Order
            </button>
          </form>

          {/* SUMMARY */}
          <aside className="rounded-[2rem] border bg-[var(--card)] p-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="mt-4 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}