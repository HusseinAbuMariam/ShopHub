import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";

export default function FAQ() {
  const faqs = [
    ["How do I place an order?", "Browse products, add items to cart, then proceed to checkout."],
    ["Can I become a vendor?", "Yes, vendor onboarding is supported through the platform dashboard."],
    ["How do returns work?", "You can request returns from your account orders page within the allowed window."],
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />
      <main className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 text-3xl font-extrabold">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map(([question, answer]) => (
            <div key={question} className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <h2 className="text-xl font-bold">{question}</h2>
              <p className="mt-3 text-[var(--muted)]">{answer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
