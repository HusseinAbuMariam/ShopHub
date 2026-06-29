import { Link } from "react-router-dom";

export default function SectionTitle({ title, action = "View All", to = "/products", icon = "⚡" }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-[var(--text)]">
          <span>{icon}</span>
          {title}
        </h2>
      </div>
      <Link
        to={to}
        className="flex items-center gap-1 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
      >
        {action} →
      </Link>
    </div>
  );
}
