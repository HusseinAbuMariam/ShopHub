export const categories = [
  { id: 1, name: "All Categories", slug: "all", image: "/assets/fashion.svg" },
  { id: 2, name: "Fashion", slug: "fashion", image: "/assets/fashion.svg" },
  { id: 3, name: "Electronics", slug: "electronics", image: "/assets/electronics.svg" },
  { id: 4, name: "Home & Living", slug: "home", image: "/assets/home.svg" },
  { id: 5, name: "Beauty", slug: "beauty", image: "/assets/beauty.svg" },
  { id: 6, name: "Sports", slug: "sports", image: "/assets/sports.svg" },
  { id: 7, name: "Toys", slug: "toys", image: "/assets/toys.svg" },
];

export const vendors = [
  { id: 1, name: "StyleHaven", tagline: "Modern trend based fashion", logo: "/assets/vendor-fashion.svg" },
  { id: 2, name: "TechZone", tagline: "Trusted electronics marketplace", logo: "/assets/vendor-tech.svg" },
  { id: 3, name: "HomeEssence", tagline: "Premium home products", logo: "/assets/vendor-home.svg" },
  { id: 4, name: "BeautyGlow", tagline: "Curated beauty essentials", logo: "/assets/vendor-beauty.svg" },
];

export const topSellers = [
  { id: 1, name: "EcoMarket", logo: "/assets/topseller-eco.svg" },
  { id: 2, name: "CityWears", logo: "/assets/topseller-city.svg" },
  { id: 3, name: "GizmoMart", logo: "/assets/topseller-gizmo.svg" },
  { id: 4, name: "DecorPlus", logo: "/assets/topseller-decor.svg" },
];

export const products = [
  {
    id: 1,
    name: "Smartwatch Pro",
    vendor: "GizmoMart",
    category: "electronics",
    price: 99,
    oldPrice: 129,
    image: "/assets/watch.svg",
    rating: 4.5,
    badge: "Hot",
    description: "Fitness tracking, AMOLED display, long battery life and premium comfort for daily wear.",
  },
  {
    id: 2,
    name: "Summer Dress",
    vendor: "StyleHaven",
    category: "fashion",
    price: 45,
    oldPrice: 60,
    image: "/assets/dress.svg",
    rating: 4.2,
    badge: "Sale",
    description: "Lightweight silhouette with breathable fabric for warm weather styling.",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    vendor: "ElectroHub",
    category: "electronics",
    price: 79,
    oldPrice: 95,
    image: "/assets/headphones.svg",
    rating: 4.4,
    badge: "Popular",
    description: "Immersive sound, active noise cancellation and all-day comfort.",
  },
  {
    id: 4,
    name: "Modern Sofa",
    vendor: "DecorPlus",
    category: "home",
    price: 320,
    oldPrice: 399,
    image: "/assets/sofa.svg",
    rating: 4.1,
    badge: "Best",
    description: "Minimal modern living room centerpiece built for style and comfort.",
  },
  {
    id: 5,
    name: "Beauty Kit",
    vendor: "BeautyGlow",
    category: "beauty",
    price: 59,
    oldPrice: 79,
    image: "/assets/beauty.svg",
    rating: 4.6,
    badge: "New",
    description: "Curated beauty essentials with premium shades and travel-ready design.",
  },
  {
    id: 6,
    name: "Running Shoes",
    vendor: "CityWears",
    category: "sports",
    price: 68,
    oldPrice: 88,
    image: "/assets/sports.svg",
    rating: 4.3,
    badge: "Deal",
    description: "Responsive cushioning and breathable upper for daily runs and city walks.",
  },
];

export const deals = [
  { id: 1, image: "/assets/deal-tv.svg" },
  { id: 2, image: "/assets/deal-shoes.svg" },
  { id: 3, image: "/assets/deal-makeup.svg" },
  { id: 4, image: "/assets/deal-mixer.svg" },
];

export const heroCards = {
  main: "/assets/hero-main.svg",
  fashion: "/assets/hero-fashion.svg",
  gadget: "/assets/hero-gadget.svg",
};
