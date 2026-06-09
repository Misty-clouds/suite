import { Sparkles, ArrowUpRight, TrendingUp } from "lucide-react";
import { hero, DASHBOARD_URL } from "@/lib/content";

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden pt-16">
      {/* Top brand gradient wash + radial glow, matching the Figma hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand/70 to-transparent opacity-60"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-glow" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 text-center md:pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5">
          <span className="gradient-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-app-text">
            {hero.badge}
            <Sparkles size={16} className="text-brand-bright" />
          </span>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-app-text md:text-6xl">
            {hero.title}
            <span className="text-gradient">{hero.titleAccent}</span>
          </h1>

          <p className="max-w-xl text-base text-app-text-muted md:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={`${DASHBOARD_URL}/register`}
              className="btn-gradient inline-flex h-[54px] w-[160px] items-center justify-center rounded-full text-base font-medium tracking-tight text-white transition-transform hover:scale-[1.02]"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#contact"
              className="inline-flex h-[54px] w-[160px] items-center justify-center rounded-full border border-app-border bg-app-card text-base font-medium tracking-tight text-white transition-colors hover:bg-app-card-hover"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Product preview, sitting on the brand swirl band */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div
            aria-hidden
            className="brand-swirl absolute -inset-x-10 -inset-y-8 rounded-[40px] opacity-70 blur-2xl"
          />
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface/90 shadow-2xl backdrop-blur">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-app-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-app-text-dim">
          app.suite.cloudstech.org
        </span>
      </div>

      <div className="grid gap-4 p-5 text-left sm:grid-cols-3">
        <StatTile label="Revenue (MTD)" value="$148,920" delta="+12.4%" />
        <StatTile label="Outstanding" value="$23,410" delta="3 invoices" muted />
        <StatTile label="Est. tax set aside" value="$31,260" delta="On track" />

        <div className="rounded-xl border border-app-border bg-app-card p-4 sm:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-app-text">
              Cash flow forecast
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-brand-bright">
              <TrendingUp size={14} /> 90-day
            </span>
          </div>
          <Sparkline />
        </div>

        <div className="rounded-xl border border-brand/30 bg-brand/10 p-4">
          <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-brand-bright">
            <Sparkles size={14} /> AI insight
          </div>
          <p className="text-sm leading-relaxed text-app-text-muted">
            Northwind is pacing 6 days late on payment. Want me to send a
            reminder?
          </p>
          <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-app-text">
            Review <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  delta,
  muted,
}: {
  label: string;
  value: string;
  delta: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-xl border border-app-border bg-app-card p-4">
      <p className="text-xs text-app-text-dim">{label}</p>
      <p className="mt-1 text-xl font-bold text-app-text">{value}</p>
      <p
        className={`mt-1 text-xs ${muted ? "text-app-text-dim" : "text-[#28c840]"}`}
      >
        {delta}
      </p>
    </div>
  );
}

function Sparkline() {
  // Static decorative SVG sparkline — purely presentational.
  return (
    <svg viewBox="0 0 320 80" className="h-20 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0792f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0792f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 60 L40 52 L80 56 L120 38 L160 44 L200 28 L240 32 L280 16 L320 20"
        fill="none"
        stroke="#0792f1"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 60 L40 52 L80 56 L120 38 L160 44 L200 28 L240 32 L280 16 L320 20 L320 80 L0 80 Z"
        fill="url(#spark)"
      />
    </svg>
  );
}
