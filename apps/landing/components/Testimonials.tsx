import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section id="customers" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        align="center"
        eyebrow="Customers"
        title="Finance teams run leaner on Suite"
        description="From solo founders to growing finance teams, Suite turns financial busywork into clarity."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-app-border bg-app-card p-7"
          >
            <Quote size={28} className="text-brand-bright" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-app-text">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-app-border pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-full btn-gradient text-sm font-semibold text-white">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-app-text">
                  {t.name}
                </span>
                <span className="block text-xs text-app-text-dim">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
