import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3">
      <div className="grid grid-cols-2 gap-1">
        <span className="h-3 w-3 rounded-sm bg-orange-500" />
        <span className="h-3 w-3 rounded-sm bg-sky-500" />
        <span className="h-3 w-3 rounded-sm bg-pink-500" />
        <span className="h-3 w-3 rounded-sm bg-emerald-500" />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          ShopHub
        </h1>
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
          Multi Vendor
        </p>
      </div>
    </Link>
  );
}
