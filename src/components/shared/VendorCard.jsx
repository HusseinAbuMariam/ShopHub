import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  return (
    <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      
      <div className="flex items-center gap-4">
        <img
          src={vendor.logo}
          alt={vendor.name}
          className="h-16 w-16 rounded-2xl object-cover"
        />
        <div>
          <h3 className="text-xl font-bold">{vendor.name}</h3>
          <p className="text-sm text-[var(--muted)]">{vendor.tagline}</p>
        </div>
      </div>

      <Link
        to={`/store/${vendor.id}`}  
        className="inline-block mt-5 rounded-xl bg-[var(--nav)] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
      >
        Visit Store
      </Link>

    </article>
  );
}