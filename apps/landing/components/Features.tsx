import { features } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="The platform"
        title="Everything your finances need"
        description="A range of finance tools designed to help your business stay funded, compliant, and in control."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-app-border bg-app-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-app-card p-7 transition-colors hover:bg-app-card-hover"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-app-border bg-app-surface text-brand-bright transition-colors group-hover:border-brand/40">
              <f.icon size={22} />
            </div>
            <h3 className="text-lg font-semibold text-app-text">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-app-text-muted">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
