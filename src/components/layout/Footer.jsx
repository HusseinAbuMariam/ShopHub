import { Link } from "react-router-dom";
import { useState } from "react";

import {
  siVisa,
  siPaypal,
  siApplepay,
} from "simple-icons/icons";

export default function Footer() {
  const [email, setEmail] = useState("");

  const payments = [
    { name: "Visa", icon: siVisa },
    { name: "PayPal", icon: siPaypal },
    { name: "Apple Pay", icon: siApplepay },
  ];

  return (
    <footer className="mt-16 bg-[var(--card)] border-t border-[var(--border)]">

      {/* Newsletter */}
      <div className="bg-violet-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row lg:px-8">

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="text-xl">✉️</span>
            </div>

            <div className="text-white">
              <p className="font-bold">Subscribe to our Newsletter</p>
              <p className="text-sm text-violet-200">
                Get the latest updates, deals and exclusive offers.
              </p>
            </div>
          </div>

          <div className="flex w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm text-slate-700 outline-none"
            />
            <button className="bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-5 lg:px-8">

        <div className="lg:col-span-2">
          <h3 className="text-xl font-black text-[var(--text)]">
            Marketify
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Your one-stop marketplace for quality products from trusted vendors worldwide.
          </p>

          {/* Social */}
          <div className="mt-4 flex gap-3">
            {[
              "fab fa-facebook-f",
              "fab fa-twitter",
              "fab fa-linkedin-in",
              "fab fa-github",
            ].map((s) => (
              <div
                key={s}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)] transition hover:border-violet-400 hover:text-violet-600 cursor-pointer"
              >
                <i className={s}></i>
              </div>
            ))}
          </div>
        </div>

        {/* Columns */}
        {[
          {
            title: "Customer Service",
            links: [
              ["Help Center", "/faq"],
              ["Track Order", "/orders"],
              ["Returns & Refunds", "/faq"],
              ["Shipping Info", "/faq"],
              ["Contact Us", "/contact"],
            ],
          },
          {
            title: "Company",
            links: [
              ["About Us", "/"],
              ["Careers", "/"],
              ["Sell on Marketify", "/sellers"],
              ["Terms & Conditions", "/"],
              ["Privacy Policy", "/"],
            ],
          },
          {
            title: "My Account",
            links: [
              ["My Orders", "/orders"],
              ["Wishlist", "/wishlist"],
              ["Account Settings", "/account"],
              ["Addresses", "/account"],
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-[var(--text)]">
              {col.title}
            </h4>

            <ul className="mt-4 space-y-2">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-[var(--muted)] transition hover:text-violet-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--border)] px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">

          <p className="text-xs text-[var(--muted)]">
            © 2026 Marketify. All rights reserved.
          </p>

          {/* Payments (Simple Icons) */}
          <div className="flex items-center gap-3">
            {payments.map((p) => (
              <div
                key={p.name}
                title={p.name}
                className="flex items-center justify-center rounded border border-[var(--border)] bg-white px-3 py-2 shadow-sm hover:scale-105 transition"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-6 w-10"
                  fill={`#${p.icon.hex}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={p.icon.path} />
                </svg>
              </div>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}