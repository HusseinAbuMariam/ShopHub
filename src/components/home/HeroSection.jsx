import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-8 shadow-sm ring-1 ring-violet-100 lg:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
            🎯 Mega Sale
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            Discover Top Products
            <span className="block text-violet-600">From Trusted Vendors</span>
          </h1>
          <p className="mt-4 max-w-md text-slate-500">
            Shop from thousands of vendors offering the best products at unbeatable prices with fast delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/products" className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-700">
              Shop Now →
            </Link>
            <Link to="/vendors" className="rounded-xl border border-violet-200 bg-white px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50">
              Explore Stores
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 flex gap-6">
            {[["10K+", "Products"], ["500+", "Vendors"], ["50K+", "Customers"], ["99%", "Satisfaction"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-lg font-black text-slate-900">{val}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative h-72 w-full max-w-sm rounded-3xl bg-gradient-to-br from-violet-200 to-indigo-200 lg:h-80">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium">
              Hero Product Image
            </div>
            {/* Badge */}
            <div className="absolute -right-4 top-8 rounded-2xl bg-violet-600 px-4 py-3 text-center text-white shadow-xl">
              <p className="text-xs text-violet-200">Up to</p>
              <p className="text-2xl font-black">70%</p>
              <p className="text-xs text-violet-200">Off</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
