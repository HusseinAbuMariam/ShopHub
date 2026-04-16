import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ product }) {
  const { addToCart, isLoggedIn } = useCart();
  const navigate = useNavigate();

  // Normalize fields to support both mock data and API data
  const image = product.image || (Array.isArray(product.images) && product.images[0]) || null;
  const vendorName = product.vendor || product.store?.name || "";
  const oldPrice = product.oldPrice ?? product.compare_price;
  const rawRating = product.rating;
  const rating = typeof rawRating === "object" ? parseFloat(rawRating?.value || 0) : (rawRating || 0);
  const badge = product.badge || (product.discount_percentage ? `-${product.discount_percentage}%` : null);
  const productUrl = `/products/${product.slug || product.id}`;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/account");
      return;
    }
    addToCart(product);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link to={productUrl} className="block overflow-hidden bg-[var(--surface)]">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-orange-50 text-5xl">
            🛍️
          </div>
        )}
      </Link>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          {badge ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
              {badge}
            </span>
          ) : (
            <span />
          )}

          <span className="text-sm text-amber-500">
            {"★".repeat(Math.floor(rating))}
            <span className="text-slate-300">
              {"★".repeat(5 - Math.floor(rating))}
            </span>
          </span>
        </div>

        <Link to={productUrl} className="block">
          <h3 className="text-lg font-bold">{product.name}</h3>
          {vendorName && (
            <p className="mt-1 text-sm text-[var(--muted)]">{vendorName}</p>
          )}
        </Link>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-extrabold">
              {formatCurrency(product.price)}
            </p>
            {oldPrice != null && (
              <p className="text-sm text-[var(--muted)] line-through">
                {formatCurrency(oldPrice)}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-2xl bg-[var(--nav)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}