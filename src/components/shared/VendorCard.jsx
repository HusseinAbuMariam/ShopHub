import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  const tagline = vendor.tagline || vendor.description || "";
  const storeLink = `/store/${vendor.slug || vendor.id}`;
  const ratingValue = vendor.rating?.value || vendor.rating || null;
  const category = vendor.category?.name || null;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-violet-200">

      {/* Top banner */}
      <div className="relative h-24 w-full overflow-hidden bg-gradient-to-br from-violet-100 to-indigo-100">
        {vendor.cover ? (
          <img src={vendor.cover} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-6xl font-black text-violet-400">{vendor.name?.[0]}</span>
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="relative px-5">
        <div className="-mt-7 inline-block">
          {vendor.logo ? (
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="h-14 w-14 rounded-2xl border-4 border-[var(--card)] object-cover shadow-md"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[var(--card)] bg-violet-600 text-xl font-extrabold text-white shadow-md">
              {vendor.name?.[0]}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pb-5 pt-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-extrabold text-[var(--text)]">{vendor.name}</h3>
            {category && (
              <span className="mt-1 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600">
                {category}
              </span>
            )}
          </div>
          {ratingValue && (
            <div className="flex shrink-0 items-center gap-1 rounded-xl bg-amber-50 px-2 py-1">
              <span className="text-xs text-amber-500">⭐</span>
              <span className="text-xs font-bold text-amber-600">{ratingValue}</span>
            </div>
          )}
        </div>

        {tagline && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--muted)]">{tagline}</p>
        )}

        {/* Stats */}
        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--muted)]">
          {vendor.products_count != null && (
            <span className="flex items-center gap-1">
              📦 <span>{vendor.products_count} products</span>
            </span>
          )}
          {vendor.created_at && (
            <span className="flex items-center gap-1">
              📅 <span>Since {new Date(vendor.created_at).getFullYear()}</span>
            </span>
          )}
        </div>

        <Link
          to={storeLink}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          Visit Store →
        </Link>
      </div>
    </article>
  );
}
