import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useCart();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-md">
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-3xl font-bold text-white shadow-lg">
                🔐
              </div>

              <h2 className="mt-5 text-2xl font-bold">Welcome Back</h2>
              <p className="mt-1 text-center text-sm text-[var(--muted)]">
                Login to access your account
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="w-full rounded-xl bg-orange-500 py-2 text-center font-medium text-white">
                Login
              </div>
              <Link
                to="/Register"
                className="block w-full rounded-xl py-2 text-center text-[var(--muted)] transition hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          </aside>

          <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-md">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Enter your credentials below
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--muted)]">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="me@example.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-10 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="absolute left-3 top-3 text-gray-400">📧</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--muted)]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-10 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span className="absolute left-3 top-3 text-gray-400">🔒</span>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 transition hover:text-orange-500"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#" className="text-orange-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg"
              >
                Sign In
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Account;