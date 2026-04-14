import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";

import { topSellers } from "../data/mockData";

export default function Sellers() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold">All Sellers</h1>
          <p className="text-sm text-[var(--muted)]">
            Discover all trusted sellers on our platform
          </p>
        </div>

        {/* Sellers Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {topSellers.map((seller) => (
            <Link
              key={seller.id}
              to={`/sellers/${seller.id}`}
              className="flex items-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <img
                src={seller.logo}
                alt={seller.name}
                className="h-16 w-16 rounded-2xl object-cover"
              />

              <div>
                <h3 className="text-xl font-bold">{seller.name}</h3>
                <p className="text-sm text-[var(--muted)]">
                  Top Rated Seller
                </p>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}