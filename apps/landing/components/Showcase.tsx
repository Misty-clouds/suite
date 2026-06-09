import { Check } from "lucide-react";
import { showcases } from "@/lib/content";

export function Showcase() {
  return (
    <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
      {showcases.map((s, i) => {
        const reversed = i % 2 === 1;
        return (
          <div
            key={s.title}
            className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            <div className={reversed ? "md:order-2" : ""}>
              <span className="gradient-pill mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium text-app-text-muted">
                {s.eyebrow}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-app-text md:text-4xl">
                {s.title}
              </h2>
              <p className="mt-4 text-app-text-muted">{s.description}</p>
              <ul className="mt-6 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-app-text">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-bright">
                      <Check size={13} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual panel — brand swirl framing an icon glyph */}
            <div className={reversed ? "md:order-1" : ""}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-app-border bg-app-card">
                <div aria-hidden className="brand-swirl absolute inset-0 opacity-50" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-24 w-24 place-items-center rounded-2xl border border-app-border bg-app-surface/80 text-brand-bright backdrop-blur">
                    <s.icon size={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
