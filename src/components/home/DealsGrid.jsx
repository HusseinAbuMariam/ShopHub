import { deals } from "../../data/mockData";
import SectionTitle from "../shared/SectionTitle";

export default function DealsGrid() {
  return (
    <section className="mt-14">
      <SectionTitle title="Best Deals of the Day" />
      <div className="grid gap-4 md:grid-cols-4">
        {deals.map((deal) => (
          <div key={deal.id} className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            <img src={deal.image} alt="Deal card" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
