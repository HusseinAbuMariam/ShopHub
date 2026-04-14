import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import VendorCard from "../components/shared/VendorCard";

import { vendors } from "../data/mockData";

export default function Store() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold">All Stores</h1>
          <p className="text-sm text-gray-500">
            Discover all vendors in one place
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}