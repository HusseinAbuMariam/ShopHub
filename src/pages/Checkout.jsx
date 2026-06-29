import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Logo from "../components/shared/Logo";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

const getCsrf = () => decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || "");
const authHeaders = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-XSRF-TOKEN": getCsrf(),
});

export default function Checkout() {
  const { items, subtotal, clearCart, isLoggedIn } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= 49 ? 0 : 9.99;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const [step] = useState(2);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [addressForm, setAddressForm] = useState({
    name: "", phone: "", address: "", apartment: "", city: "", state: "", zip: "",
  });
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "", name: "" });

  useEffect(() => {
    if (!isLoggedIn) { navigate("/account"); return; }
    if (!items.length) { navigate("/cart"); return; }
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/customer/addresses`, { credentials: "include", headers: authHeaders() });
      const data = await res.json();
      const list = data.data || [];
      setAddresses(list);
      if (list.length > 0) setSelectedAddressId(list[0].id);
      else setShowAddressForm(true);
    } catch {
      setShowAddressForm(true);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}/sanctum/csrf-cookie`, { credentials: "include" });
      const res = await fetch(`${BASE_URL}/api/customer/addresses`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(),
        body: JSON.stringify({
          name: addressForm.name,
          phone: addressForm.phone,
          address_line_1: addressForm.address,
          address_line_2: addressForm.apartment,
          city: addressForm.city,
          state: addressForm.state,
          postal_code: addressForm.zip,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Failed to save address."); return; }
      setAddresses((prev) => [...prev, data.data]);
      setSelectedAddressId(data.data.id);
      setShowAddressForm(false);
    } catch {
      setError("Something went wrong saving address.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) { setError("Cart is empty."); return; }
    if (!selectedAddressId) { setError("Please select a delivery address."); return; }

    setLoading(true);
    setError("");

    try {
      await fetch(`${BASE_URL}/sanctum/csrf-cookie`, { credentials: "include" });
      const payload = {
        address_id: selectedAddressId,
        items: items.map((item) => ({
          product_id: item.id,
          store_id: item.store?.id || item.store_id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      };
      const res = await fetch(`${BASE_URL}/api/customer/checkout`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Checkout failed."); return; }

      const checkoutUrl = data.data?.checkout_url;
      if (checkoutUrl) {
        clearCart();
        window.location.href = checkoutUrl;
      } else {
        setError("No checkout URL returned. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition";
  const steps = ["Cart", "Checkout", "Payment", "Order Complete"];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <div className="hidden items-center gap-2 md:flex">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i + 1 < step ? "bg-violet-600 text-white" :
                  i + 1 === step ? "bg-violet-600 text-white ring-4 ring-violet-100" :
                  "border-2 border-[var(--border)] text-[var(--muted)]"
                }`}>
                  {i + 1 < step ? "✓" : i + 1}
                </div>
                <span className={`text-sm ${i + 1 === step ? "font-bold text-[var(--text)]" : "text-[var(--muted)]"}`}>{s}</span>
                {i < steps.length - 1 && <div className="mx-1 h-px w-8 bg-[var(--border)]" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            🔒 Secure Checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

            {/* LEFT */}
            <div className="space-y-6">

              {/* Contact / Address */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">📍</div>
                  <div>
                    <h2 className="font-bold">Shipping Address</h2>
                    <p className="text-xs text-[var(--muted)]">Enter the address where you want your order delivered</p>
                  </div>
                </div>

                {addresses.length > 0 && !showAddressForm && (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <label key={addr.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${selectedAddressId === addr.id ? "border-violet-600 bg-violet-50" : "border-[var(--border)] hover:border-violet-200"}`}>
                        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selectedAddressId === addr.id ? "border-violet-600" : "border-[var(--border)]"}`}>
                          {selectedAddressId === addr.id && <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />}
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">{addr.name}</p>
                          <p className="text-[var(--muted)]">{addr.address_line_1}{addr.address_line_2 ? `, ${addr.address_line_2}` : ""}</p>
                          <p className="text-[var(--muted)]">{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.postal_code}</p>
                        </div>
                        <input type="radio" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="hidden" />
                      </label>
                    ))}
                    <button type="button" onClick={() => setShowAddressForm(true)} className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                      + Add new address
                    </button>
                  </div>
                )}

                {showAddressForm && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                        <input placeholder="John Doe" value={addressForm.name} onChange={(e) => setAddressForm({...addressForm, name: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Phone Number</label>
                        <input placeholder="+1 (555) 123-4567" value={addressForm.phone} onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Address</label>
                      <input placeholder="123 Main Street" value={addressForm.address} onChange={(e) => setAddressForm({...addressForm, address: e.target.value})} className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Apartment, suite, etc. (optional)</label>
                      <input placeholder="Apartment 4B" value={addressForm.apartment} onChange={(e) => setAddressForm({...addressForm, apartment: e.target.value})} className={inputClass} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">City</label>
                        <input placeholder="New York" value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">State</label>
                        <input placeholder="New York" value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">ZIP Code</label>
                        <input placeholder="10001" value={addressForm.zip} onChange={(e) => setAddressForm({...addressForm, zip: e.target.value})} className={inputClass} />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <input type="checkbox" defaultChecked className="accent-violet-600" /> Save this address for next time
                    </label>
                    <button type="button" onClick={handleSaveAddress} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700">
                      Save Address
                    </button>
                  </div>
                )}
              </div>

              {/* Shipping Method */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">🚚</div>
                  <div>
                    <h2 className="font-bold">Shipping Method</h2>
                    <p className="text-xs text-[var(--muted)]">Choose your preferred delivery option</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { id: "standard", label: "Standard Shipping", sub: "5-7 business days", price: "Free" },
                    { id: "express", label: "Express Shipping", sub: "2-3 business days", price: "$9.99" },
                  ].map((opt) => (
                    <label key={opt.id} className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition ${shippingMethod === opt.id ? "border-violet-600 bg-violet-50" : "border-[var(--border)] hover:border-violet-200"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${shippingMethod === opt.id ? "border-violet-600" : "border-[var(--border)]"}`}>
                          {shippingMethod === opt.id && <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{opt.label}</p>
                          <p className="text-xs text-[var(--muted)]">{opt.sub}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${opt.price === "Free" ? "text-emerald-500" : "text-[var(--text)]"}`}>{opt.price}</span>
                      <input type="radio" checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id)} className="hidden" />
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">💳</div>
                  <div>
                    <h2 className="font-bold">Payment Method</h2>
                    <p className="text-xs text-[var(--muted)]">Select a secure payment method</p>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "paypal", label: "PayPal" },
                    { id: "apple", label: "Apple Pay" },
                    { id: "google", label: "Google Pay" },
                  ].map((m) => (
                    <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                      className={`rounded-xl border-2 p-3 text-center text-xs font-semibold transition ${paymentMethod === m.id ? "border-violet-600 bg-violet-50 text-violet-700" : "border-[var(--border)] text-[var(--muted)] hover:border-violet-200"}`}>
                      {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Card Number</label>
                      <input placeholder="4242 4242 4242 4242" value={cardForm.number} onChange={(e) => setCardForm({...cardForm, number: e.target.value})} className={inputClass} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Expiry Date</label>
                        <input placeholder="12 / 26" value={cardForm.expiry} onChange={(e) => setCardForm({...cardForm, expiry: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">CVV</label>
                        <input placeholder="123" value={cardForm.cvv} onChange={(e) => setCardForm({...cardForm, cvv: e.target.value})} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Cardholder Name</label>
                      <input placeholder="John Doe" value={cardForm.name} onChange={(e) => setCardForm({...cardForm, name: e.target.value})} className={inputClass} />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              )}

              <button type="submit" disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-violet-700 disabled:opacity-60">
                🔒 {loading ? "Processing..." : `Pay Securely - ${formatCurrency(total)}`}
              </button>
            </div>

            {/* RIGHT — Order Summary */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-bold">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--surface)]">
                        {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <span className="text-2xl">🛍️</span>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-[var(--muted)]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted)]">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted)]">Shipping</span>
                    <span className={shipping === 0 ? "font-semibold text-emerald-500" : ""}>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[var(--border)] pt-3 text-lg font-extrabold">
                    <span>Total</span>
                    <span className="text-violet-600">{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🔒</span>
                    <div>
                      <p className="text-sm font-semibold text-violet-700">Your payment is secure</p>
                      <p className="text-xs text-violet-500">We use 256-bit SSL encryption to protect your payment information.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
                {[
                  { icon: "🔒", title: "Secure Checkout", sub: "Your payment information is safe with us" },
                  { icon: "🚚", title: "Fast Delivery", sub: "Get your order delivered on time" },
                  { icon: "↩️", title: "Easy Returns", sub: "30-day return policy" },
                  { icon: "💬", title: "24/7 Support", sub: "We're here to help you anytime" },
                ].map((f) => (
                  <div key={f.title} className="flex items-center gap-3 border-b border-[var(--border)] py-3 last:border-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg">{f.icon}</div>
                    <div>
                      <p className="text-sm font-semibold">{f.title}</p>
                      <p className="text-xs text-[var(--muted)]">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
