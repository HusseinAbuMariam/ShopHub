import { NavLink, useNavigate } from "react-router-dom";
import { categories } from "../../data/mockData";
import DropdownMenu from "./DropdownMenu";

export default function CategoryBar() {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 border-b border-[var(--border)] bg-[var(--card)] shadow-sm animate-fadeUp">
      
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 scrollbar-hide lg:px-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          ←
        </button>

        <DropdownMenu />

        {/* CATEGORIES */}
        {categories.slice(0, 6).map((item) => (
          <NavLink
            key={item.slug}
            to={item.slug === "all"
              ? "/products"
              : `/products?category=${item.slug}`
            }
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-[var(--text)] hover:bg-orange-50 hover:text-orange-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      </div>
    </div>
  );
}