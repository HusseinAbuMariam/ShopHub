import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import FeaturesStrip from "../components/home/FeaturesStrip";
import DealsGrid from "../components/home/DealsGrid";
import SectionTitle from "../components/shared/SectionTitle";
import VendorCard from "../components/shared/VendorCard";
import CategoryCard from "../components/shared/CategoryCard";
import ProductCard from "../components/shared/ProductCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_URL}/api/customer/home`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setHomeData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });
    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  if (!homeData) {
    return <div className="p-10 text-center">Failed to load data.</div>;
  }

  const sections = homeData.data || [];
  const getSection = (type) => sections.find((s) => s.type === type);

  const vendors = getSection("stores")?.data?.stores || [];
  const categories = getSection("categories")?.data?.categories || [];
  const products = getSection("products")?.data?.products || [];
  const topSellers = vendors.slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <Navbar />
      <CategoryBar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* HERO */}
        <HeroSection />
        <FeaturesStrip />

        {/* FEATURED VENDORS */}
        <section className="mt-14">
          <SectionTitle title="Featured Vendors" to="/vendors" />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mt-14">
          <SectionTitle title="Popular Categories" to="/products" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="mt-14">
          <SectionTitle title="Trending Products" to="/products" />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* DEALS */}
        <DealsGrid />

        {/* TOP SELLERS */}
        <section className="mt-14">
          <SectionTitle title="Top Sellers" to="/sellers" />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {topSellers.map((seller) => (
              <Link
                to={`/store/${seller.slug || seller.id}`}
                key={seller.id}
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
                <h3 className="text-xl font-bold">{seller.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
