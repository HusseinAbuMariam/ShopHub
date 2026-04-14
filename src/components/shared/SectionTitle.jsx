import { Link } from "react-router-dom";

export default function SectionTitle({
  title,
  action = "View All",
  to = "/products",
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>

      <Link
        to={to}
        className="px-6 py-2 rounded-full bg-[var(--primary)] text-white dark:bg-white dark:text-black font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        {action}
      </Link>
    </div>
  );
}