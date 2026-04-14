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

import { Link } from "react-router-dom";
import { categories, products, topSellers, vendors } from "../data/mockData";

export default function Home() {
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
            {categories.slice(1).map((category) => (
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
                to={`/sellers/${seller.id}`}
                key={seller.id}
                className="flex items-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <img
                  src={seller.logo}
                  alt={seller.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <h3 className="text-2xl font-bold">{seller.name}</h3>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}