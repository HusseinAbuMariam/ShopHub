export default function BrandsBar() {
  const brands = ["Apple", "Samsung", "Sony", "Nike", "Canon", "Adidas", "Philips", "Puma"];
  return (
    <section className="mt-10">
      <div className="flex items-center gap-4 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-4 scrollbar-hide shadow-sm">
        {brands.map((b) => (
          <div key={b} className="shrink-0 cursor-pointer rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-bold text-[var(--muted)] transition hover:border-violet-300 hover:text-violet-600">
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}