import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  const tagline = vendor.tagline || vendor.description || "";
  const storeLink = `/store/${vendor.slug || vendor.id}`;

  return (
    <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">

      <div className="flex items-center gap-4">
        {vendor.logo ? (
          <img
            src={vendor.logo}
            alt={vendor.name}
            className="h-16 w-16 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
            {vendor.name?.[0]}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold">{vendor.name}</h3>
          {tagline && <p className="text-sm text-[var(--muted)]">{tagline}</p>}
        </div>
      </div>

      <Link
        to={storeLink}
        className="mt-5 inline-block rounded-xl bg-[var(--nav)] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
      >
        Visit Store
      </Link>

    </article>
  );
}