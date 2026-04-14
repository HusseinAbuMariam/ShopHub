import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (name && email && password) {
      localStorage.setItem("user", JSON.stringify({ name, email }));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">

          {/* Sidebar */}
          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-md">
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-3xl font-bold text-white shadow-lg">
                🛍️
              </div>

              <h2 className="mt-5 text-2xl font-bold">Join Us</h2>
              <p className="mt-1 text-sm text-[var(--muted)] text-center">
                Create your account and start shopping
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="w-full rounded-xl bg-orange-500 py-2 text-white text-center font-medium">
                Register
              </div>

              <Link
                to="/account"
                className="block w-full rounded-xl py-2 text-center text-[var(--muted)] hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
            </div>
          </aside>

          {/* Register Form */}
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-md">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              Fill in your details below
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-5">

              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--muted)]">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-10 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="absolute left-3 top-3 text-gray-400">👤</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--muted)]">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="me@example.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-10 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="absolute left-3 top-3 text-gray-400">📧</span>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[var(--muted)]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-10 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span className="absolute left-3 top-3 text-gray-400">🔒</span>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-orange-500 transition"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition"
              >
                Create Account
              </button>

            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;