import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="block overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-36 w-full object-cover"
      />

      <div className="p-4 text-center">
        <h3 className="font-bold">{category.name}</h3>
      </div>
    </Link>
  );
}