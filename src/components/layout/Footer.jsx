import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-xl font-extrabold">ShopHub</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Modern multi-vendor marketplace UI built with React and Tailwind CSS.
          </p>
        </div>
        <div>
          <h4 className="font-bold">Marketplace</h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li><Link to="/products" className="hover:underline">
              Products
            </Link></li>
            <li><Link to="/vendors" className="hover:underline">
              Vendors
            </Link></li>
            <li><Link to="/sellers" className="hover:underline">
              Sellers
            </Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li><Link to="/contact" className="hover:underline">
              Contact
            </Link></li>
            <li><Link to="/account" className="hover:underline">
              Account
            </Link></li>
            <li><Link to="/faq" className="hover:underline">
              FAQ
            </Link></li>

          </ul>
        </div>
        <div>
          <h4 className="font-bold">For Vendors</h4>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Join the platform and manage your store from a dedicated dashboard.
          </p>
        </div>
      </div>
    </footer>
  );
}
