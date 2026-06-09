import { whyUs } from "@/lib/content";

export function WhyUs() {
  return (
    <section id="why" className="border-y border-app-border bg-app-surface">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {whyUs.map((f) => (
            <div key={f.title} className="text-center md:text-left">
              <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl btn-gradient text-white md:mx-0">
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-app-text">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-app-text-muted">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
