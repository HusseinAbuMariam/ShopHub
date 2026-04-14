export default function FeaturesStrip() {
  const items = [
    "Free Shipping",
    "Secure Payments",
    "24/7 Support",
  ];

  return (
    <section className="mt-6 grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-5 text-center font-bold shadow-sm">
          {item}
        </div>
      ))}
    </section>
  );
}
