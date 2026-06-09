import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_URL } from "@/lib/content";

export function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-app-border bg-app-card px-8 py-16 text-center md:py-20">
        <div aria-hidden className="brand-swirl absolute inset-0 opacity-50" />
        <div aria-hidden className="absolute inset-0 hero-glow" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-app-text md:text-5xl">
            Ready to put your finances on autopilot?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-app-text-muted">
            Start free, connect your accounts, and let Suite&apos;s AI handle
            the busywork. No card required to explore.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={`${DASHBOARD_URL}/register`}
              className="btn-gradient inline-flex h-[54px] items-center gap-2 rounded-full px-7 text-base font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Get started
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                <ArrowUpRight size={16} />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex h-[54px] items-center justify-center rounded-full border border-app-border bg-app-surface px-7 text-base font-medium text-white transition-colors hover:bg-app-card-hover"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
