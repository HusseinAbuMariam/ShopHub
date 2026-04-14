import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center text-[var(--text)]">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white">
        Back Home
      </Link>
    </div>
  );
}
