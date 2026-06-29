import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import FeaturesStrip from "../components/home/FeaturesStrip";
import FlashDeals from "../components/home/FlashDeals";
import VendorCTA from "../components/home/VendorCTA";
import BrandsBar from "../components/home/BrandsBar";
import SectionTitle from "../components/shared/SectionTitle";
import VendorCard from "../components/shared/VendorCard";
import CategoryCard from "../components/shared/CategoryCard";
import ProductCard from "../components/shared/ProductCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [products, setProducts]     = useState([]);
  const [vendors, setVendors]       = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const opts = { signal: controller.signal };

    Promise.all([
      fetch(`${BASE_URL}/api/customer/stores`, opts).then((r) => r.json()),
      fetch(`${BASE_URL}/api/customer/store-categories`, opts).then((r) => r.json()),
    ])
      .then(([storeData, catData]) => {
        // Stores/Vendors
        const stores =
          storeData?.data?.data ||
          storeData?.data ||
          (Array.isArray(storeData) ? storeData : []);
        setVendors(stores);

        // Categories
        const cats =
          catData?.data?.data ||
          catData?.data ||
          (Array.isArray(catData) ? catData : []);
        setCategories(cats);

        // جيب تفاصيل أول 4 stores عشان نحصل على منتجاتها
        const firstStores = stores.slice(0, 4);
        return Promise.all(
          firstStores.map((store) =>
            fetch(`${BASE_URL}/api/customer/stores/${store.slug}`, opts)
              .then((r) => r.json())
              .catch(() => null)
          )
        );
      })
      .then((storeDetails) => {
        const allProducts = [];
        (storeDetails || []).forEach((res) => {
          const store = res?.data;
          if (!store) return;
          (store.products || []).forEach((p) => {
            allProducts.push({
              ...p,
              store: {
                id: store.id,
                name: store.name,
                slug: store.slug,
                category_id: store.category_id,
              },
            });
          });
        });
        setProducts(allProducts);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const topSellers = [...vendors]
    .sort((a, b) => (b.orders_count || 0) - (a.orders_count || 0))
    .slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Navbar />
        <div className="flex h-96 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">

        {/* HERO */}
        <HeroSection />

        {/* FEATURES */}
        <FeaturesStrip />


        {/* POPULAR CATEGORIES */}
        {categories.length > 0 && (
          <section className="mt-12">
            <SectionTitle title="Popular Categories" icon="🗂️" action="View All Categories" to="/products" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* VENDOR CTA BANNERS */}
        <VendorCTA />

        {/* BRANDS */}
        <BrandsBar />

        {/* TRENDING PRODUCTS */}
        <section className="mt-12">
          <SectionTitle title="Trending Products" icon="🔥" to="/products" />
          {products.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {products.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
              <p className="text-[var(--muted)]">No products available yet.</p>
            </div>
          )}
        </section>

        {/* FEATURED VENDORS */}
        <section className="mt-12">
          <SectionTitle title="Featured Vendors" icon="🏪" to="/vendors" />
          {vendors.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {vendors.slice(0, 8).map((v) => (
                <VendorCard key={v.id} vendor={v} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
              <p className="text-[var(--muted)]">No vendors available yet.</p>
            </div>
          )}
        </section>

        {/* TOP SELLERS */}
        <section className="mt-12">
          <SectionTitle title="Top Sellers" icon="⭐" to="/sellers" />
          {topSellers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {topSellers.map((seller) => (
                <Link
                  to={`/store/${seller.slug || seller.id}`}
                  key={seller.id}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-violet-200"
                >
                  {seller.logo ? (
                    <img src={seller.logo} alt={seller.name} className="h-14 w-14 rounded-xl object-cover ring-2 ring-violet-100" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-xl font-bold text-violet-600">
                      {seller.name?.[0]}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-[var(--text)]">{seller.name}</h3>
                    <p className="text-xs text-[var(--muted)]">
                      {seller.orders_count ? `${seller.orders_count} orders` : "Top Seller"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
              <p className="text-[var(--muted)]">No sellers available yet.</p>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
