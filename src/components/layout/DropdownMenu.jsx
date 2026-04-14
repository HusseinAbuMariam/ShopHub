import { useState } from "react";
import { Link } from "react-router-dom";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

   
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition hover:-translate-y-0.5 hover:shadow-soft"
      >
        ☰
      </button>


      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 z-[99998]"
        />
      )}

   
      {open && (
        <div className="fixed left-4 top-20 w-52 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-xl overflow-hidden z-[99999]">

         <Link
            onClick={() => setOpen(false)}
            to="/"
            className="block px-4 py-2 text-sm transition-all duration-200 hover:bg-[var(--card)] hover:pl-5"
          >
            Home
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/FAQ"
            className="block px-4 py-2 text-sm transition-all duration-200 hover:bg-[var(--card)] hover:pl-5"
          >
            FAQ
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/cart"
            className="block px-4 py-2 text-sm transition-all duration-200 hover:bg-[var(--card)] hover:pl-5"
          >
            Cart
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="/contact"
            className="block px-4 py-2 text-sm transition-all duration-200 hover:bg-[var(--card)] hover:pl-5"
          >
            Contact
          </Link>
        </div>
      )}

    </div>
  );
}