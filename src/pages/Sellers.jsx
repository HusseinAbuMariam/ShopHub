import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import { topSellers as mockSellers } from "../data/mockData";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_URL}/api/customer/stores`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setSellers(data.data?.length ? data.data : mockSellers);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setSellers(mockSellers);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

        <div className="mb-10">
          <h1 className="text-3xl font-extrabold">All Sellers</h1>
          <p className="text-sm text-[var(--muted)]">
            Discover all trusted sellers on our platform
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {sellers.map((seller) => (
              <Link
                key={seller.id}
                to={`/store/${seller.slug || seller.id}`}
                className="flex items-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                {seller.logo ? (
                  <img
                    src={seller.logo}
                    alt={seller.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
                    {seller.name?.[0]}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold">{seller.name}</h3>
                  <p className="text-sm text-[var(--muted)]">Top Rated Seller</p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}