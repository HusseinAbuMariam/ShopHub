import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Logo from "../components/shared/Logo";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

const EyeIcon = ({ open }) => open ? (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
) : (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, logout, isLoggedIn, currentUser } = useCart();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/sanctum/csrf-cookie`, { credentials: "include" });
      const res = await fetch(`${BASE_URL}/api/customer/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || ""),
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Invalid email or password."); return; }
      login({ email, name: data.data?.name || email.split("@")[0] });
      navigate("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Logged-in view ──────────────────────────────────────────────
  if (isLoggedIn && currentUser) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <header className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-4 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Logo />
            <span className="text-sm text-[var(--muted)]">My Account</span>
          </div>
        </header>
        <main className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-xl font-bold text-white">
              {currentUser.name?.[0]?.toUpperCase()}
            </div>
            <h1 className="mt-4 text-xl font-bold">{currentUser.name}</h1>
            <p className="text-sm text-[var(--muted)]">{currentUser.email}</p>
            <div className="mt-6 space-y-2">
              <Link to="/orders" className="block w-full rounded-xl border border-[var(--border)] py-2.5 text-sm font-medium transition hover:border-violet-300">
                My Orders
              </Link>
              <Link to="/cart" className="block w-full rounded-xl border border-[var(--border)] py-2.5 text-sm font-medium transition hover:border-violet-300">
                My Cart
              </Link>
              <button onClick={() => { logout(); navigate("/account"); }} className="w-full rounded-xl bg-red-50 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-100">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Login view ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <p className="text-sm text-[var(--muted)]">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-violet-600 hover:text-violet-700">Sign up</Link>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 lg:px-8">

        {/* Form card */}
        <div className="rounded-3xl bg-[var(--card)] p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-[var(--text)]">Welcome Back 👋</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Sign in to your account and continue shopping</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">Email Address</label>
              <div className="relative">
                <svg className="absolute left-3 top-3 h-4 w-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-3 pl-10 pr-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">Password</label>
              <div className="relative">
                <svg className="absolute left-3 top-3 h-4 w-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-3 pl-10 pr-10 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[var(--muted)] hover:text-violet-600">
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[var(--muted)]">
                <input type="checkbox" className="accent-violet-600" /> Remember me
              </label>
              <a href="#" className="font-medium text-violet-600 hover:text-violet-700">Forgot Password?</a>
            </div>

            {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : <>Sign In <span>→</span></>}
            </button>
          </form>

          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-xs text-[var(--muted)]">or continue with</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] py-2.5 text-sm font-medium text-[var(--text)] transition hover:border-violet-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] py-2.5 text-sm font-medium text-[var(--text)] transition hover:border-violet-300">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Apple
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-[var(--muted)]">
            By signing in, you agree to our <Link to="/" className="font-medium text-violet-600">Terms & Conditions</Link>
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-[var(--card)] p-5 text-center shadow-sm">
          {[["10K+", "Products"], ["500+", "Vendors"], ["50K+", "Happy Customers"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-xl font-extrabold text-violet-600">{val}</p>
              <p className="text-xs text-[var(--muted)]">{label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Account;
