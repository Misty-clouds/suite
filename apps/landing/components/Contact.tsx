import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-app-border bg-app-surface"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-app-text md:text-4xl">
            Get in touch with us
          </h2>
          <p className="mt-3 text-app-text-muted">
            Questions about pricing, migration, or how the AI works? Tell us
            about your business and we&apos;ll show you Suite on your numbers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <form
            action="#"
            className="rounded-2xl border border-app-border bg-app-card p-6"
          >
            <div className="grid gap-4">
              <Field label="Full name" name="name" placeholder="Jane Doe" />
              <Field
                label="Work email"
                name="email"
                type="email"
                placeholder="jane@company.com"
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-app-text-muted"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your finance stack today…"
                  className="w-full resize-none rounded-xl border border-app-border bg-app-surface px-4 py-3 text-sm text-app-text placeholder:text-app-text-dim focus:border-brand focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-gradient h-[54px] rounded-full text-base font-medium text-white transition-transform hover:scale-[1.01]"
              >
                Send message
              </button>
            </div>
          </form>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <ContactCard
              icon={<Mail size={20} />}
              title="Email us"
              value="hello@suite.cloudstech.org"
            />
            <ContactCard
              icon={<Phone size={20} />}
              title="Call us"
              value="+44 20 1234 5678"
            />
            <ContactCard
              icon={<MapPin size={20} />}
              title="Visit us"
              value="London, United Kingdom"
            />
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-app-border bg-app-card">
              <div aria-hidden className="brand-swirl absolute inset-0 opacity-40" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface/80 px-4 py-2 text-sm text-app-text backdrop-blur">
                  <MapPin size={16} className="text-brand-bright" /> London ·
                  Remote-first
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-app-text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-app-border bg-app-surface px-4 py-3 text-sm text-app-text placeholder:text-app-text-dim focus:border-brand focus:outline-none"
      />
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-app-border bg-app-card p-5">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-app-border bg-app-surface text-brand-bright">
        {icon}
      </span>
      <span>
        <span className="block text-xs text-app-text-dim">{title}</span>
        <span className="block text-sm font-medium text-app-text">{value}</span>
      </span>
    </div>
  );
}
