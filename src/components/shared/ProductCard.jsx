import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/products/${product.id}`} className="block overflow-hidden bg-[var(--surface)]">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
            {product.badge}
          </span>
          <span className="text-sm text-amber-500">
            {"★".repeat(Math.floor(product.rating))}<span className="text-slate-300">{"★".repeat(5 - Math.floor(product.rating))}</span>
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{product.vendor}</p>
        </Link>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-2xl font-extrabold">{formatCurrency(product.price)}</p>
            <p className="text-sm text-[var(--muted)] line-through">{formatCurrency(product.oldPrice)}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="rounded-2xl bg-[var(--nav)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
