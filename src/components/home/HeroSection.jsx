import { heroCards } from "../../data/mockData";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-12">
      
      {/* Main Hero */}
      <div className="relative overflow-hidden rounded-[2rem] lg:col-span-7 animate-fadeUp ">
        <img
          src={heroCards.main}
          alt="Big sale"
          className="h-full w-full object-cover"
        />

        {/* Shop Now Button */}
        <Link
          to="/products"
          className="absolute bottom-6 left-6 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Right Section */}
      <div className="grid gap-6 lg:col-span-5">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] animate-fadeUp">
            <img
              src={heroCards.fashion}
              alt="New arrivals"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] animate-fadeUp">
            <img
              src={heroCards.gadget}
              alt="Top gadgets"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 animate-fadeUp">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 shadow-sm">
            <p className="text-lg font-bold">Secure Payments</p>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 shadow-sm">
            <p className="text-lg font-bold">24/6 Support</p>
          </div>
        </div>
      </div>

    </section>
  );
}