import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import Logo from "../shared/Logo";

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 21-1.45-1.32C5.4 15.03 2 11.96 2 8.2 2 5.13 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.07 6.07 0 0 1 16.5 3C19.58 3 22 5.13 22 8.2c0 3.76-3.4 6.83-8.55 11.49L12 21Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12m-9 0a1 1 0 1 0 2 0m6 0a1 1 0 1 0 2 0" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6m-7 4h8m-9 4h10M5 3h14a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.12a8.96 8.96 0 0 1 15 0" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3Zm0 11h7v7H3v-7Zm11-11h7v7h-7V3Zm0 11h7v7h-7v-7Z" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = String(form.get("query") || "").trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  const topLinks = [
    { label: "Wishlist", to: "/wishlist", icon: <HeartIcon />, badge: 2 },
    { label: "Cart", to: "/cart", icon: <CartIcon />, badge: itemCount },
    { label: "Orders", to: "/orders", icon: <OrdersIcon />, badge: 3 },
    { label: "Dashboard", to: "/dashboard", icon: <DashboardIcon />, badge: 0 },
    { label: "Account", to: "/account", icon: <AccountIcon />, badge: 0 },
  ];

  return (
    <header className="sticky top-0 z-50 animate-fadeUp">
      <nav className="border-b border-white/10 shadow-soft backdrop-blur" style={{ backgroundColor: "var(--nav)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <Logo />

          <form onSubmit={handleSearch} className="hidden flex-1 md:block">
            <div className="mx-auto flex max-w-2xl items-center overflow-hidden rounded-xl border border-white/10 bg-white shadow-md">
              <div className="px-4 text-slate-400">
                <SearchIcon />
              </div>
              <input
                name="query"
                type="text"
                placeholder="Search for products..."
                className="w-full bg-transparent px-2 py-3 text-sm text-slate-900 outline-none"
              />
              <button className="bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600">
                <SearchIcon />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {topLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="relative hidden flex-col items-center text-white/90 transition hover:text-white md:flex"
              >
                <div className="relative">
                  {item.icon}
                  {item.badge > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-[11px]">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="px-4 pb-4 md:hidden">
          <div className="flex items-center overflow-hidden rounded-xl bg-white shadow-md">
            <div className="px-4 text-slate-400">
              <SearchIcon />
            </div>

            <input
              name="query"
              type="text"
              placeholder="Search for products..."
              className="w-full bg-transparent px-2 py-3 text-sm text-slate-900 outline-none"
            />

            <button className="bg-orange-500 px-4 py-3 text-white transition hover:bg-orange-600">
              Go
            </button>
          </div>
        </form>
      </nav>
    </header>
  );
}
