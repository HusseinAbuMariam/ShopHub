import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import VendorCard from "../components/shared/VendorCard";
import { vendors as mockVendors } from "../data/mockData";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_URL}/api/customer/stores`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setVendors(data.data?.length ? data.data : mockVendors);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setVendors(mockVendors);
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
          <h1 className="text-3xl font-extrabold">All Stores</h1>
          <p className="text-sm text-gray-500">
            Discover all vendors in one place
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}