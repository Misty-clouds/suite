import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="border-y border-app-border bg-app-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-app-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-app-surface px-6 py-10 text-center">
            <p className="text-3xl font-bold tracking-tight text-gradient md:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-app-text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
