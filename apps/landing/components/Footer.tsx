import { Logo } from "./Logo";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-app-border bg-app-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-app-text-muted">
              The AI-native business finance platform. Invoicing, budgeting,
              tax, and reporting — in one intelligent workspace.
            </p>
          </div>

          <FooterCol title="Product" links={footer.product} />
          <FooterCol title="Company" links={footer.company} />
          <FooterCol title="Socials" links={footer.socials} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-app-border pt-8 text-sm text-app-text-dim md:flex-row">
          <p>© {new Date().getFullYear()} Suite by Cloudstech Innovations. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-app-text">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-app-text">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-app-text">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-app-text-muted transition-colors hover:text-app-text"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
