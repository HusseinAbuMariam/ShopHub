const features = [
  {
    icon: "fa-solid fa-truck-fast",
    title: "Free Shipping",
    desc: "On orders over $49",
  },
  {
    icon: "fa-solid fa-lock",
    title: "Secure Payment",
    desc: "100% protected",
  },
  {
    icon: "fa-solid fa-rotate-left",
    title: "Easy Returns",
    desc: "30-day return policy",
  },
  {
    icon: "fa-solid fa-headset",
    title: "24/7 Support",
    desc: "Dedicated support",
  },
  {
    icon: "fa-solid fa-tags",
    title: "Best Prices",
    desc: "Guaranteed deals",
  },
];

export default function FeaturesStrip() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
      {features.map((f, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm"
        >
          <i className={`${f.icon} text-2xl text-[var(--text)]`} />

          <div>
            <p className="text-sm font-bold text-[var(--text)]">
              {f.title}
            </p>
            <p className="text-xs text-[var(--muted)]">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
