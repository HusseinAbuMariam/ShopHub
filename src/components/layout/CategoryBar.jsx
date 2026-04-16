import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function CategoryBar() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_URL}/api/customer/store-categories`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setCategories(data.data || []))
      .catch(() => {});
    return () => controller.abort();
  }, []);

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

        {/* ALL PRODUCTS */}
        <NavLink
          to="/products"
          end
          className={({ isActive }) =>
            `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-orange-50 text-orange-600"
                : "text-[var(--text)] hover:bg-orange-50 hover:text-orange-600"
            }`
          }
        >
          All
        </NavLink>

        {/* CATEGORIES — link uses store category ID so Products page filter works */}
        {categories.slice(0, 8).map((cat) => (
          <NavLink
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-[var(--text)] hover:bg-orange-50 hover:text-orange-600"
              }`
            }
          >
            {cat.name}
          </NavLink>
        ))}

      </div>
    </div>
  );
}
