import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faMobileScreen, faTag } from "@fortawesome/free-solid-svg-icons";

export default function VendorCTA() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-3">

      {/* Become a Seller */}
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white" />
        </div>
        <div className="relative">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl text-white backdrop-blur-sm">
            <FontAwesomeIcon icon={faStore} />
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-white">Become a Seller</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-violet-100">
            Start your online store today and reach millions of customers worldwide.
          </p>
          <Link
            to="/sellers"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            Start Selling →
          </Link>
        </div>
      </div>

      {/* Download App */}
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-violet-400" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-blue-400" />
        </div>
        <div className="relative">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl text-white backdrop-blur-sm">
            <FontAwesomeIcon icon={faMobileScreen} />
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-white">Download Our App</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            Shop on the go and get exclusive app-only deals & offers.
          </p>
          <div className="mt-5 flex gap-2">
            <button className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20">
              🍎 App Store
            </button>
            <button className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20">
              ▶ Google Play
            </button>
          </div>
        </div>
      </div>

      {/* Deals of the Day */}
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white" />
        </div>
        <div className="relative">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl text-white backdrop-blur-sm">
            <FontAwesomeIcon icon={faTag} />
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-white">Deals of the Day</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-amber-50">
            Fresh deals every day. Save big on top products — don't miss out!
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-amber-600 transition hover:bg-amber-50"
          >
            Shop Now →
          </Link>
        </div>
      </div>

    </section>
  );
}
