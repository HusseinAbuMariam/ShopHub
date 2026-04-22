import { useEffect, useState, useMemo, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://127.0.0.1:8000";

const PIE_COLORS = ["#f97316", "#3b82f6", "#8b5cf6", "#10b981", "#ec4899", "#f59e0b"];


const PRODUCT_IMAGE_MAP = {
  // Electronics
  "premium-smartphone":           "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80&auto=format&fit=crop",
  "gaming-laptop":                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80&auto=format&fit=crop",
  "wireless-bluetooth-headphone": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80&auto=format&fit=crop",
  "smart-watch":                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format&fit=crop",
  "4k-ultra-hd-tv":               "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80&auto=format&fit=crop",
  "wireless-charging-pad":        "https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=400&q=80&auto=format&fit=crop",
  "portable-power-bank":          "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80&auto=format&fit=crop",
  "usb-c-hub":                    "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80&auto=format&fit=crop",
  "mechanical-gaming-keyboard":   "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80&auto=format&fit=crop",
  "wireless-mouse":               "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80&auto=format&fit=crop",
  // Fashion
  "classic-denim-jeans":          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80&auto=format&fit=crop",
  "cotton-t-shirt":               "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80&auto=format&fit=crop",
  "leather-jacket":               "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80&auto=format&fit=crop",
  "running-sneakers":             "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format&fit=crop",
  "designer-handbag":             "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80&auto=format&fit=crop",
  "silk-scarf":                   "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80&auto=format&fit=crop",
  "wool-winter-coat":             "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80&auto=format&fit=crop",
  "casual-dress-summer":          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80&auto=format&fit=crop",
  "leather-belt":                 "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80&auto=format&fit=crop",
  "sports-cap":                   "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=400&q=80&auto=format&fit=crop",
  // Food
  "organic-fresh-strawberries":   "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80&auto=format&fit=crop",
  "premium-arabica-coffee":       "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80&auto=format&fit=crop",
  "fresh-whole-milk":             "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80&auto=format&fit=crop",
  "artisan-sourdough-bread":      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80&auto=format&fit=crop",
  "organic-free-range-eggs":      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80&auto=format&fit=crop",
  "fresh-salmon-fillet":          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80&auto=format&fit=crop",
  "extra-virgin-olive-oil":       "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80&auto=format&fit=crop",
  "organic-honey-raw":            "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80&auto=format&fit=crop",
  "fresh-spinach":                "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80&auto=format&fit=crop",
  "premium-dark-chocolate":       "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80&auto=format&fit=crop",
  // Home & Garden
  "modern-sofa":                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80&auto=format&fit=crop",
  "queen-size-memory-foam-mattress":"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80&auto=format&fit=crop",
  "led-floor-lamp":               "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
  "garden-tool-set":              "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80&auto=format&fit=crop",
  "stainless-steel-cookware":     "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80&auto=format&fit=crop",
  "indoor-plant-collection":      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&q=80&auto=format&fit=crop",
  "luxury-bedding-set":           "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80&auto=format&fit=crop",
  "garden-hose":                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop",
  "storage-baskets":              "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80&auto=format&fit=crop",
  // Health & Beauty
  "vitamin-c-serum":              "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80&auto=format&fit=crop",
  "hydrating-face-moisturizer":   "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80&auto=format&fit=crop",
  "matte-lipstick-set":           "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&q=80&auto=format&fit=crop",
  "professional-hair-dryer":      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80&auto=format&fit=crop",
  "luxury-perfume":               "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&q=80&auto=format&fit=crop",
  "multivitamin-supplement":      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80&auto=format&fit=crop",
  "sunscreen-spf":                "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&q=80&auto=format&fit=crop",
  "hair-shampoo-conditioner":     "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80&auto=format&fit=crop",
  // Sports
  "professional-football":        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80&auto=format&fit=crop",
  "yoga-mat-premium":             "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80&auto=format&fit=crop",
  "dumbbell-set":                 "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80&auto=format&fit=crop",
  "camping-tent":                 "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80&auto=format&fit=crop",
  "running-shoes-athletic":       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format&fit=crop",
  "basketball-official":          "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&q=80&auto=format&fit=crop",
  "hiking-backpack":              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80&auto=format&fit=crop",
  "resistance-bands-set":         "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80&auto=format&fit=crop",
  "tennis-racket":                "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&q=80&auto=format&fit=crop",
  "swimming-goggles":             "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=400&q=80&auto=format&fit=crop",
  // Books
  "bestselling-fiction-novel":    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80&auto=format&fit=crop",
  "programming-guide-advanced":   "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=80&auto=format&fit=crop",
  "childrens-storybook":          "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=80&auto=format&fit=crop",
  "educational-puzzle-set":       "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&q=80&auto=format&fit=crop",
  // Automotive
  "engine-oil-premium":           "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&q=80&auto=format&fit=crop",
  "car-battery":                  "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=400&q=80&auto=format&fit=crop",
  "all-season-tires":             "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80&auto=format&fit=crop",
  // Toys & Games
  "lego-classic-creative-bricks": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80&auto=format&fit=crop",
  "remote-control-racing-car":    "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&q=80&auto=format&fit=crop",
  "monopoly-classic-board-game":  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&q=80&auto=format&fit=crop",
  "kids-science-experiment-kit":  "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&q=80&auto=format&fit=crop",
  "stuffed-animal-teddy-bear":    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80&auto=format&fit=crop",
  "kids-art-craft-supply-set":    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80&auto=format&fit=crop",
  "wooden-building-blocks-set":   "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80&auto=format&fit=crop",
  "outdoor-bubble-machine":       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop",
  "kids-walkie-talkie-set":       "https://images.unsplash.com/photo-1535615615570-3b839f4359be?w=400&q=80&auto=format&fit=crop",
  "toy-kitchen-playset":          "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80&auto=format&fit=crop",
  "scooter-for-kids":             "https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=400&q=80&auto=format&fit=crop",
  "magnetic-drawing-board":       "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80&auto=format&fit=crop",
};

function getSlugImage(slug) {
  if (!slug) return null;
  for (const [keyword, url] of Object.entries(PRODUCT_IMAGE_MAP)) {
    if (slug.includes(keyword)) return url;
  }
  const slugParts = slug.split("-");
  for (const [keyword, url] of Object.entries(PRODUCT_IMAGE_MAP)) {
    const common = slugParts.filter((p) => keyword.split("-").includes(p));
    if (common.length >= 2) return url;
  }
  return null;
}

function resolveProductImage(product) {
  return product?.images?.[0] || product?.image || getSlugImage(product?.slug) || null;
}

function handleImgError(e, slug) {
  const fallback = getSlugImage(slug);
  if (fallback && e.target.src !== fallback) {
    e.target.src = fallback;
  } else {
    e.target.style.display = "none";
    if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
  }
}

function Icon({ d, d2 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      {d2 && <path strokeLinecap="round" strokeLinejoin="round" d={d2} />}
    </svg>
  );
}

const ICONS = {
  dashboard: "M3 3h7v7H3V3Zm0 11h7v7H3v-7Zm11-11h7v7h-7V3Zm0 11h7v7h-7v-7Z",
  bag:       "M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z",
  clipboard: "M9 5h6m-7 4h8m-9 4h10M5 3h14a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z",
  store:     "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z",
  heart:     "m12 21-1.45-1.32C5.4 15.03 2 11.96 2 8.2 2 5.13 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.07 6.07 0 0 1 16.5 3C19.58 3 22 5.13 22 8.2c0 3.76-3.4 6.83-8.55 11.49L12 21Z",
  user:      "M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.12a8.96 8.96 0 0 1 15 0",
  logout:    "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-3-3-3m0 0 3-3m-3 3H9",
  search:    "m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  bell:      "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
  menu:      "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
  x:         "M6 18 18 6M6 6l12 12",
  star:      "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
  grid:      "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
  home: "M3 12l9-9 9 9M4.5 10.5V21h15V10.5",
};

const NAV_ITEMS = [
  { label: "Home",      to: "/",           icon: ICONS.home  },
  { label: "Dashboard", to: "/dashboard", icon: ICONS.dashboard },
  { label: "Products",  to: "/products",  icon: ICONS.bag },
  { label: "Orders",    to: "/orders",    icon: ICONS.clipboard },
  { label: "Stores",    to: "/sellers",   icon: ICONS.store },
  { label: "Wishlist",  to: "/wishlist",  icon: ICONS.heart },
  { label: "Account",   to: "/account",   icon: ICONS.user },
];

const STATUS_STYLES = {
  Completed:  "bg-green-100 text-green-700",
  Pending:    "bg-yellow-100 text-yellow-700",
  Shipped:    "bg-blue-100  text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Cancelled:  "bg-red-100   text-red-700",
};
const STATUS_CYCLE = ["Completed", "Pending", "Shipped", "Processing"];

function getUser() {
  try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
}

function getOrders() {
  try { return JSON.parse(localStorage.getItem("orders")) || []; } catch { return []; }
}

function buildRevenueChart(orders) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const label = d.toLocaleDateString("en-US", { weekday: "short" });
    const revenue = orders
      .filter((o) => (o.date || "").startsWith(dateStr))
      .reduce((s, o) => s + (o.total || 0), 0);
    days.push({ day: label, revenue });
  }
  return days;
}

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 shadow-lg text-sm">
      <p className="font-semibold text-[var(--muted)]">{label}</p>
      <p className="font-bold text-orange-500">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 shadow-lg text-sm">
      <p className="font-bold">{payload[0].name}</p>
      <p className="text-[var(--muted)]">{payload[0].value} stores</p>
    </div>
  );
}

function LiveBadge() {
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Live
    </span>
  );
}

function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-[var(--border)] ${className}`} />;
}

export default function Dashboard() {
  const { itemCount, logout } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading]         = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch]           = useState("");
  const [notifOpen, setNotifOpen]     = useState(false);
  const [readIds, setReadIds]         = useState(() => {
    try { return JSON.parse(localStorage.getItem("notif_read") || "[]"); } catch { return []; }
  });
  const notifRef = useRef(null);

  // API data
  const [storesTotal, setStoresTotal]     = useState(0);
  const [productsTotal, setProductsTotal] = useState(0);
  const [categories, setCategories]       = useState([]);
  const [topProducts, setTopProducts]     = useState([]);
  const [featuredStores, setFeaturedStores] = useState([]);

  const user   = getUser();
  const orders = getOrders();

  const displayName   = user?.name || user?.email?.split("@")[0] || "there";
  const avatarInitial = displayName[0]?.toUpperCase() ?? "U";
  const totalSpent    = orders.reduce((s, o) => s + (o.total || 0), 0);

  const revenueChartData = useMemo(() => buildRevenueChart(orders), [orders]);

  const categoryChartData = useMemo(
    () =>
      categories
        .filter((c) => c.stores_count > 0)
        .slice(0, 6)
        .map((c, i) => ({ name: c.name, value: c.stores_count, color: PIE_COLORS[i] })),
    [categories]
  );

  const recentOrders = useMemo(
    () =>
      [...orders]
        .reverse()
        .slice(0, 5)
        .map((o, i) => ({
          id:       o.id ?? `ORD-${1000 + i}`,
          date:     o.date ?? "—",
          status:   STATUS_CYCLE[i % STATUS_CYCLE.length],
          total:    o.total ?? 0,
          items:    o.items?.length ?? 0,
        })),
    [orders]
  );

  const notifications = useMemo(() => {
    const orderNotifs = [...orders]
      .reverse()
      .slice(0, 3)
      .map((o, i) => ({
        id:   `order-${o.id ?? i}`,
        icon: "📦",
        title: `Order #${o.id ?? `ORD-${1000 + i}`} placed`,
        body:  `${o.items?.length ?? 0} item(s) · ${formatCurrency(o.total ?? 0)}`,
        time:  o.date ?? "Recently",
        to:    "/orders",
      }));

    const platformNotifs = [
      {
        id:    "notif-new-products",
        icon:  "🛍️",
        title: "New products available",
        body:  "Check out the latest items in the store",
        time:  "Today",
        to:    "/products",
      },
      {
        id:    "notif-stores",
        icon:  "🏪",
        title: "Featured stores updated",
        body:  "Discover new vendors on the platform",
        time:  "Today",
        to:    "/sellers",
      },
      {
        id:    "notif-wishlist",
        icon:  "❤️",
        title: "Items in your wishlist",
        body:  "Don't forget to check your saved products",
        time:  "Yesterday",
        to:    "/wishlist",
      },
    ];

    return [...orderNotifs, ...platformNotifs];
  }, [orders]);

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  const markAllRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
    localStorage.setItem("notif_read", JSON.stringify(allIds));
  };

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  useEffect(() => {
    const ctrl = new AbortController();
    const { signal } = ctrl;

    Promise.all([
      fetch(`${BASE_URL}/api/customer/home`,             { signal }).then((r) => r.json()),
      fetch(`${BASE_URL}/api/customer/stores`,           { signal }).then((r) => r.json()),
      fetch(`${BASE_URL}/api/customer/products`,         { signal }).then((r) => r.json()),
      fetch(`${BASE_URL}/api/customer/store-categories`, { signal }).then((r) => r.json()),
    ])
      .then(([homeRes, storesRes, productsRes, catsRes]) => {
        // Stores
        const stores = storesRes.data || [];
        setStoresTotal(storesRes.extra?.total ?? stores.length);
        setFeaturedStores(stores.slice(0, 4));

        // Products
        const products = productsRes.data?.data || productsRes.data || [];
        setProductsTotal(products.length);

        // Categories
        setCategories(catsRes.data || []);

        // Top products (from home sections)
        const sections    = homeRes.data || [];
        const homeSection = sections.find((s) => s.type === "products");
        setTopProducts(homeSection?.data?.products?.slice(0, 5) || products.slice(0, 5));

        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });

    return () => ctrl.abort();
  }, []);

  const handleLogout = () => { logout(); navigate("/account"); };

  const stats = [
    {
      label: "Total Stores",
      value: loading ? null : storesTotal,
      sub:   "Active vendors",
      icon:  ICONS.store,
      to:    "/sellers",
      live:  true,
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Products",
      value: loading ? null : productsTotal,
      sub:   "Available items",
      icon:  ICONS.bag,
      to:    "/products",
      live:  true,
      iconBg: "bg-orange-100 text-orange-600",
    },
    {
      label: "Store Categories",
      value: loading ? null : categories.length,
      sub:   "Store types",
      icon:  ICONS.grid,
      to:    "/products",
      live:  true,
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      label: "My Orders",
      value: orders.length,
      sub:   `${formatCurrency(totalSpent)} spent`,
      icon:  ICONS.clipboard,
      to:    "/orders",
      live:  false,
      iconBg: "bg-green-100 text-green-600",
    },
  ];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[var(--border)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-extrabold text-lg select-none">
          S
        </div>
        <span className="text-xl font-extrabold tracking-tight">ShopHub</span>
      </div>

      <p className="px-6 mt-5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
        Navigation
      </p>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--text)]"
              }`
            }
          >
            <Icon d={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6 pt-4 border-t border-[var(--border)]">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:bg-red-50 hover:text-red-500"
        >
          <Icon d={ICONS.logout} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[var(--border)] bg-[var(--card)] shadow-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute right-4 top-4 text-[var(--muted)] hover:text-[var(--text)] transition lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <Icon d={ICONS.x} />
        </button>
        {sidebar}
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3.5 lg:px-8">
          <button
            className="lg:hidden text-[var(--muted)] hover:text-[var(--text)] transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon d={ICONS.menu} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-base font-extrabold truncate">Welcome back, {displayName}! 👋</h1>
            <p className="text-xs text-[var(--muted)]">Here's your store overview</p>
          </div>

          {/* Search */}
          <label className="hidden md:flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 w-52 cursor-text">
            <Icon d={ICONS.search} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim())
                  navigate(`/products?search=${encodeURIComponent(search.trim())}`);
              }}
              placeholder="Search products…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)] text-[var(--text)]"
            />
          </label>

          {/* Bell + Notification dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="relative text-[var(--muted)] hover:text-[var(--text)] transition p-1"
              aria-label="Notifications"
            >
              <Icon d={ICONS.bell} />
              {unreadCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-10 z-50 w-80 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold text-orange-500 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <ul className="max-h-80 overflow-y-auto divide-y divide-[var(--border)]">
                  {notifications.map((n) => {
                    const isUnread = !readIds.includes(n.id);
                    return (
                      <li key={n.id}>
                        <Link
                          to={n.to}
                          onClick={() => {
                            setNotifOpen(false);
                            if (isUnread) {
                              const next = [...readIds, n.id];
                              setReadIds(next);
                              localStorage.setItem("notif_read", JSON.stringify(next));
                            }
                          }}
                          className={`flex items-start gap-3 px-4 py-3 transition hover:bg-[var(--bg)] ${
                            isUnread ? "bg-orange-50/60 dark:bg-orange-900/10" : ""
                          }`}
                        >
                          <span className="text-xl flex-shrink-0 mt-0.5">{n.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm truncate ${isUnread ? "font-bold" : "font-medium"}`}>
                                {n.title}
                              </p>
                              {isUnread && (
                                <span className="flex-shrink-0 h-2 w-2 rounded-full bg-orange-500 mt-1.5" />
                              )}
                            </div>
                            <p className="text-xs text-[var(--muted)] mt-0.5 truncate">{n.body}</p>
                            <p className="text-[10px] text-[var(--muted)] mt-1">{n.time}</p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Footer */}
                <div className="border-t border-[var(--border)] px-4 py-2.5 text-center">
                  <Link
                    to="/orders"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-semibold text-orange-500 hover:underline"
                  >
                    View all orders →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <Link to="/account" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white shadow select-none">
              {avatarInitial}
            </div>
            <span className="hidden text-sm font-semibold md:block truncate max-w-[100px]">{displayName}</span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 space-y-7 p-4 lg:p-8">

          {/* ── Stats cards ── */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <Link
                key={s.label}
                to={s.to}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {s.label}
                  </p>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
                    <Icon d={s.icon} />
                  </span>
                </div>

                {loading && s.live ? (
                  <Skeleton className="h-8 w-24 mb-2" />
                ) : (
                  <p className="text-3xl font-extrabold tabular-nums">
                    {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
                  </p>
                )}

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-[var(--muted)]">{s.sub}</p>
                  {s.live && <LiveBadge />}
                </div>
              </Link>
            ))}
          </div>

          {/* ── Revenue chart + Top products ── */}
          <div className="grid gap-6 xl:grid-cols-3">

            {/* Revenue line chart */}
            <div className="xl:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-wide">Revenue Overview</h2>
                  <p className="text-xs text-[var(--muted)] mt-0.5">Your spending — last 7 days</p>
                </div>
                <span className="rounded-xl bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                  {formatCurrency(totalSpent)} total
                </span>
              </div>

              <ResponsiveContainer width="100%" height={230}>
                <LineChart data={revenueChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "var(--muted)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v === 0 ? "$0" : `$${(v / 1000).toFixed(1)}k`}
                  />
                  <Tooltip content={<RevenueTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#f97316" }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {orders.length === 0 && (
                <p className="text-center text-xs text-[var(--muted)] -mt-4">
                  No orders yet —{" "}
                  <Link to="/products" className="text-orange-500 hover:underline">start shopping!</Link>
                </p>
              )}
            </div>

            {/* Top products from API */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-wide">Top Products</h2>
                <Link to="/products" className="text-xs font-semibold text-orange-500 hover:underline">
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-7 w-7 flex-shrink-0" />
                      <Skeleton className="h-9 w-9 flex-shrink-0 rounded-xl" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-2.5 w-1/2" />
                      </div>
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              ) : topProducts.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">No products available.</p>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((p, i) => {
                    const image  = resolveProductImage(p);
                    const vendor = p.store?.name || "—";
                    const rating = typeof p.rating === "object" ? parseFloat(p.rating?.value) : p.rating;

                    return (
                      <Link
                        key={p.id}
                        to={`/products/${p.slug || p.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-xs font-bold text-orange-600">
                          {i + 1}
                        </span>
                        <div className="relative h-11 w-11 flex-shrink-0">
                          {image && (
                            <img
                              src={image}
                              alt={p.name}
                              className="h-11 w-11 rounded-xl object-cover"
                              onError={(e) => handleImgError(e, p.slug)}
                            />
                          )}
                          <div
                            className="h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg)] text-xl"
                            style={{ display: image ? "none" : "flex" }}
                          >
                            🛍️
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold group-hover:text-orange-500 transition">{p.name}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-[var(--muted)] truncate">{vendor}</span>
                            {rating > 0 && (
                              <span className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold flex-shrink-0">
                                ★ {Number(rating).toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm font-bold text-orange-500 flex-shrink-0">
                          {formatCurrency(p.price || 0)}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── Recent orders + Category distribution ── */}
          <div className="grid gap-6 xl:grid-cols-3">

            {/* Recent orders table */}
            <div className="xl:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-wide">Recent Orders</h2>
                <Link to="/orders" className="text-xs font-semibold text-orange-500 hover:underline">
                  View all
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-4xl mb-3">📦</p>
                  <p className="text-sm text-[var(--muted)]">No orders yet.</p>
                  <Link to="/products" className="mt-2 inline-block text-sm font-semibold text-orange-500 hover:underline">
                    Browse products →
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        {["Order ID", "Items", "Date", "Status", "Total"].map((h) => (
                          <th key={h} className="pb-3 px-2 text-left text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {recentOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-[var(--bg)] transition">
                          <td className="py-3 px-2 font-mono text-xs text-[var(--muted)]">#{o.id}</td>
                          <td className="py-3 px-2 font-semibold">{o.items} item{o.items !== 1 ? "s" : ""}</td>
                          <td className="py-3 px-2 text-[var(--muted)]">{o.date}</td>
                          <td className="py-3 px-2">
                            <span className={`rounded-lg px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[o.status] ?? "bg-gray-100 text-gray-600"}`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 font-bold text-orange-500">{formatCurrency(o.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Category distribution — real API data */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-wide">Stores by Category</h2>
                <LiveBadge />
              </div>
              <p className="text-xs text-[var(--muted)] mb-4">Distribution across store types</p>

              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-44 w-44 rounded-full" />
                  <div className="w-full space-y-2">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
                  </div>
                </div>
              ) : categoryChartData.length === 0 ? (
                <p className="text-sm text-[var(--muted)] text-center py-8">No category data.</p>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryChartData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="mt-4 space-y-2">
                    {categoryChartData.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-[var(--muted)] truncate">{cat.name}</span>
                        </div>
                        <span className="font-bold ml-2 flex-shrink-0">{cat.value} stores</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Featured stores — real API ── */}
          {(loading || featuredStores.length > 0) && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-wide">Featured Stores</h2>
                  <p className="text-xs text-[var(--muted)] mt-0.5">Active vendors on the platform</p>
                </div>
                <div className="flex items-center gap-3">
                  <LiveBadge />
                  <Link to="/sellers" className="text-xs font-semibold text-orange-500 hover:underline">View all</Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {loading
                  ? [...Array(4)].map((_, i) => (
                      <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 flex items-center gap-4">
                        <Skeleton className="h-14 w-14 flex-shrink-0 rounded-2xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))
                  : featuredStores.map((store) => {
                      const rating = typeof store.rating === "object" ? parseFloat(store.rating?.value) : store.rating;
                      return (
                        <Link
                          key={store.id}
                          to={`/store/${store.slug || store.id}`}
                          className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-orange-300"
                        >
                          {store.logo ? (
                            <img src={store.logo} alt={store.name} className="h-14 w-14 flex-shrink-0 rounded-2xl object-cover" />
                          ) : (
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600 select-none">
                              {store.name?.[0]}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold truncate">{store.name}</p>
                            <p className="text-xs text-[var(--muted)] truncate">{store.category?.name ?? "Store"}</p>
                            {rating > 0 && (
                              <p className="text-xs text-amber-500 font-semibold mt-0.5">
                                ★ {Number(rating).toFixed(1)}
                              </p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
