import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ product }) {
  const { addToCart, isLoggedIn } = useCart();
  const navigate = useNavigate();

  const image = product.image || (Array.isArray(product.images) && product.images[0]) || null;
  const vendorName = product.vendor || product.store?.name || "";
  const oldPrice = product.oldPrice ?? product.compare_price;
  const rawRating = product.rating;
  const rating = typeof rawRating === "object" ? parseFloat(rawRating?.value || 0) : (rawRating || 0);
  const discount = product.discount_percentage || (oldPrice && product.price ? Math.round((1 - product.price / oldPrice) * 100) : null);
  const productUrl = `/products/${product.slug || product.id}`;

  const handleAddToCart = () => {
    if (!isLoggedIn) { navigate("/account"); return; }
    addToCart(product);
  };

  const stars = Math.round(rating);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
          -{discount}%
        </span>
      )}

      {/* Wishlist */}
      <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-slate-400 transition hover:text-red-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m12 21-1.45-1.32C5.4 15.03 2 11.96 2 8.2 2 5.13 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.07 6.07 0 0 1 16.5 3C19.58 3 22 5.13 22 8.2c0 3.76-3.4 6.83-8.55 11.49L12 21Z" />
        </svg>
      </button>

      <Link to={productUrl} className="block overflow-hidden">
        {image ? (
          <img src={image} alt={product.name} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-violet-50 to-slate-100">
            <span className="text-4xl">🛍️</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map((s) => (
            <svg key={s} className={`h-3.5 w-3.5 ${s <= stars ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-[var(--muted)] ml-1">({product.reviews_count || 0})</span>
        </div>

        <Link to={productUrl}>
          <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">{product.name}</h3>
          {vendorName && <p className="mt-0.5 text-xs text-[var(--muted)]">{vendorName}</p>}
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-[var(--text)]">{formatCurrency(product.price)}</span>
            {oldPrice != null && (
              <span className="ml-2 text-xs text-[var(--muted)] line-through">{formatCurrency(oldPrice)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600 transition hover:bg-violet-600 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
