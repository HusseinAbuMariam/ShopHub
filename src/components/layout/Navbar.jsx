import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import Logo from "../shared/Logo";
import { useState, useEffect, useRef } from "react";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount, isLoggedIn, currentUser, logout } = useCart();
  const navigate = useNavigate();
  const [marketOpen, setMarketOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const marketRef = useRef(null);
  const accountRef = useRef(null);

  // جلب الـ categories من الباك
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_URL}/api/customer/store-categories`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  // إغلاق القوائم لما تضغط برا
  useEffect(() => {
    const handler = (e) => {
      if (marketRef.current && !marketRef.current.contains(e.target)) setMarketOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)] shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">

        {/* Logo */}
        <Logo />

        {/* Center links */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? "text-violet-600" : "text-[var(--text)] hover:text-violet-600"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? "text-violet-600" : "text-[var(--text)] hover:text-violet-600"}`
            }
          >
            Features
          </NavLink>

          {/* Marketplace dropdown */}
          <div className="relative" ref={marketRef}>
            <button
              onClick={() => setMarketOpen(!marketOpen)}
              className="flex items-center gap-1 text-sm font-medium text-[var(--text)] transition hover:text-violet-600"
            >
              Marketplace
              <svg className={`h-3 w-3 transition-transform ${marketOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </button>

            {marketOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-2xl">
                <Link to="/products" onClick={() => setMarketOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-violet-50 hover:text-violet-600">
                  All Products
                </Link>
                <Link to="/vendors" onClick={() => setMarketOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-violet-50 hover:text-violet-600">
                  Stores
                </Link>
                {categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setMarketOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-violet-50 hover:text-violet-600"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? "text-violet-600" : "text-[var(--text)] hover:text-violet-600"}`
            }
          >
            Wishlist
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? "text-violet-600" : "text-[var(--text)] hover:text-violet-600"}`
            }
          >
            FAQ
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? "text-violet-600" : "text-[var(--text)] hover:text-violet-600"}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-violet-600"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
              </svg>
            )}
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-violet-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m12 21-1.45-1.32C5.4 15.03 2 11.96 2 8.2 2 5.13 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.07 6.07 0 0 1 16.5 3C19.58 3 22 5.13 22 8.2c0 3.76-3.4 6.83-8.55 11.49L12 21Z" />
            </svg>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-violet-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12m-9 0a1 1 0 1 0 2 0m6 0a1 1 0 1 0 2 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Login / Account */}
          {isLoggedIn && currentUser ? (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white transition hover:bg-violet-700"
              >
                {currentUser.name?.[0]?.toUpperCase()}
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
                  <div className="border-b border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="truncate text-sm font-bold text-[var(--text)]">{currentUser.name}</p>
                    <p className="truncate text-xs text-[var(--muted)]">{currentUser.email}</p>
                  </div>
                  <div className="p-2">
                    <Link to="/orders" onClick={() => setAccountOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-violet-50 hover:text-violet-600">
                      My Orders
                    </Link>
                    <Link to="/cart" onClick={() => setAccountOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-violet-50 hover:text-violet-600">
                      My Cart
                    </Link>
                  </div>
                  <div className="border-t border-[var(--border)] p-2">
                    <button onClick={handleLogout} className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/account"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:text-violet-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
