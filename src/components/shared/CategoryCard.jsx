import { Link } from "react-router-dom";

const styles = [
  { gradient: "from-violet-500 to-purple-600", light: "bg-violet-50", text: "text-violet-600", border: "hover:border-violet-300" },
  { gradient: "from-sky-500 to-blue-600",      light: "bg-sky-50",    text: "text-sky-600",    border: "hover:border-sky-300" },
  { gradient: "from-emerald-500 to-teal-600",  light: "bg-emerald-50",text: "text-emerald-600",border: "hover:border-emerald-300" },
  { gradient: "from-pink-500 to-rose-600",     light: "bg-pink-50",   text: "text-pink-600",   border: "hover:border-pink-300" },
  { gradient: "from-amber-500 to-orange-600",  light: "bg-amber-50",  text: "text-amber-600",  border: "hover:border-amber-300" },
  { gradient: "from-rose-500 to-red-600",      light: "bg-rose-50",   text: "text-rose-600",   border: "hover:border-rose-300" },
  { gradient: "from-cyan-500 to-sky-600",      light: "bg-cyan-50",   text: "text-cyan-600",   border: "hover:border-cyan-300" },
  { gradient: "from-indigo-500 to-violet-600", light: "bg-indigo-50", text: "text-indigo-600", border: "hover:border-indigo-300" },
  { gradient: "from-fuchsia-500 to-pink-600",  light: "bg-fuchsia-50",text: "text-fuchsia-600",border: "hover:border-fuchsia-300" },
  { gradient: "from-lime-500 to-emerald-600",  light: "bg-lime-50",   text: "text-lime-600",   border: "hover:border-lime-300" },
];

export default function CategoryCard({ category, index = 0 }) {
  const s = styles[index % styles.length];

  return (
    <Link
      to={`/products?category=${category.id}`}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${s.border}`}
    >
      {/* Gradient glow blob */}
      <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br ${s.gradient} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`} />

      {/* Icon */}
      <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.light} transition-transform duration-300 group-hover:scale-110`}>
        {category.image ? (
          <img src={category.image} alt={category.name} className="h-7 w-7 rounded-lg object-cover" />
        ) : (
          <span className={`text-lg font-extrabold ${s.text}`}>
            {category.name?.[0]}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="relative min-w-0 flex-1">
        <h3 className={`truncate text-sm font-bold transition-colors duration-200 group-hover:${s.text.replace("text-", "text-")} text-[var(--text)]`}>
          {category.name}
        </h3>
        <p className="text-[11px] text-[var(--muted)]">
          {category.products_count > 0 ? `${category.products_count} items` : "Explore"}
        </p>
      </div>

      {/* Arrow */}
      <svg
        className={`h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${s.text}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </Link>
  );
}
