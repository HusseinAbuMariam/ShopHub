import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <CategoryBar />
      <main className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
            <h1 className="text-3xl font-extrabold">Contact Us</h1>
            <p className="mt-3 text-[var(--muted)]">We usually reply within one business day.</p>
            <div className="mt-6 grid gap-4">
              <input className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none" placeholder="Your name" />
              <input className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none" placeholder="Email" />
              <textarea className="min-h-40 rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none" placeholder="Message" />
              <button className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white">Send Message</button>
            </div>
          </section>
          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold">Support Details</h2>
            <div className="mt-6 space-y-4 text-[var(--muted)]">
              <p>Email: support@shophub.demo</p>
              <p>Phone: +970 59 111 1111</p>
              <p>Address: Ramallah, Palestine</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
