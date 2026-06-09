"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, DASHBOARD_URL } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-app-border bg-app-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" aria-label="Suite home">
          <Logo />
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-app-text-muted transition-colors hover:text-app-text"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`${DASHBOARD_URL}/login`}
            className="text-sm text-app-text-muted transition-colors hover:text-app-text"
          >
            Sign in
          </a>
          <a
            href={`${DASHBOARD_URL}/register`}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-bright"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-app-text"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-app-border bg-app-bg/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-app-text-muted hover:bg-app-card hover:text-app-text"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`${DASHBOARD_URL}/register`}
              className="mt-2 rounded-full bg-brand px-5 py-3 text-center text-sm font-medium text-white"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
