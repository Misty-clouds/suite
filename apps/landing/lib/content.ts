import {
  Sparkles,
  FileText,
  PiggyBank,
  Receipt,
  BarChart3,
  Wallet,
  Users,
  ShieldCheck,
  Zap,
  Brain,
  LineChart,
  Globe,
  type LucideIcon,
} from "lucide-react";

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3001";

export const nav = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Why Suite", href: "#why" },
  { label: "Customers", href: "#customers" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  badge: "AI-native financial management",
  title: "Run your business finances with ",
  titleAccent: "intelligence built in",
  subtitle:
    "Suite brings invoicing, budgeting, tax, and financial reporting into one workspace — with AI woven through every number, so you always know where your money stands.",
  primaryCta: "Get started",
  secondaryCta: "Book a demo",
};

// Core product capabilities — finance only.
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: FileText,
    title: "Smart Invoicing",
    description:
      "Create, send, and track invoices in seconds. AI drafts line items from past work, chases late payers automatically, and reconciles payments as they land.",
  },
  {
    icon: PiggyBank,
    title: "Budgeting & Forecasting",
    description:
      "Set budgets per project, client, or category and let Suite forecast cash flow forward — flagging overspend before it becomes a problem.",
  },
  {
    icon: Receipt,
    title: "Tax, Done Right",
    description:
      "Suite categorises every transaction, tracks deductible spend, and keeps tax estimates current year-round so filing season is never a scramble.",
  },
  {
    icon: BarChart3,
    title: "Financial Reporting",
    description:
      "Revenue, P&L, and cash position in live dashboards. Drill from a headline number down to the transaction without exporting a thing.",
  },
  {
    icon: Wallet,
    title: "Transactions & Reconciliation",
    description:
      "Connect your accounts and let AI match, categorise, and reconcile transactions automatically — your books stay closed and clean.",
  },
  {
    icon: Users,
    title: "Clients & Billing",
    description:
      "A single record for every client: contracts, invoices, balances, and payment history — with automated reminders that keep revenue moving.",
  },
];

// Differentiators (the "Why Suite" band).
export const whyUs: Feature[] = [
  {
    icon: Brain,
    title: "AI-native, not bolted on",
    description:
      "Suite was built around AI from day one. Insights, categorisation, and forecasting are part of the core — not an add-on you switch on later.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & compliant",
    description:
      "Bank-grade encryption, role-based access, and audit trails on every change. Your financial data is protected and your records stay defensible.",
  },
  {
    icon: Zap,
    title: "Real-time by default",
    description:
      "No overnight syncs or stale exports. Invoices, payments, and balances update the moment they change, so decisions run on today's numbers.",
  },
];

// Alternating product story sections.
export interface Showcase {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
}

export const showcases: Showcase[] = [
  {
    eyebrow: "AI insights",
    icon: LineChart,
    title: "Answers about your money, before you ask",
    description:
      "Suite watches your cash flow and surfaces what matters — a client trending late, a budget about to tip, a quarter pacing ahead of plan. Ask in plain language and get an answer grounded in your real numbers.",
    bullets: [
      "Natural-language questions over your live financials",
      "Proactive alerts on cash flow, overspend, and overdue invoices",
      "Forecasts that learn from your billing patterns",
    ],
  },
  {
    eyebrow: "One financial workspace",
    icon: Globe,
    title: "Every financial workflow, under one roof",
    description:
      "Stop stitching together a spreadsheet, an invoicing tool, and a tax app. Suite unifies invoicing, budgeting, tax, and reporting so your finances live in one place — consistent, connected, and always current.",
    bullets: [
      "Invoicing, budgets, tax, and reporting in a single platform",
      "Clients, transactions, and documents linked end to end",
      "Built on a modern, scalable stack that grows with you",
    ],
  },
];

export const stats = [
  { value: "10x", label: "faster invoice-to-cash" },
  { value: "98%", label: "auto-categorised transactions" },
  { value: "24/7", label: "AI financial monitoring" },
  { value: "1", label: "workspace for all your finances" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced three tools with Suite. Invoicing, budgets, and tax finally talk to each other — and the AI catches things our bookkeeper used to miss.",
    name: "Amara Okafor",
    role: "Founder, Northwind Studio",
  },
  {
    quote:
      "Cash flow used to be a monthly guessing game. Now Suite forecasts it for us and flags problems early. We make decisions on real numbers.",
    name: "Daniel Reyes",
    role: "Finance Lead, Cobalt Labs",
  },
  {
    quote:
      "Tax season went from a two-week scramble to an afternoon. Everything was already categorised and reconciled. That alone paid for it.",
    name: "Priya Nair",
    role: "Operations Director, Mavenly",
  },
];

export const sparkleIcon = Sparkles;

export const footer = {
  product: [
    { label: "Invoicing", href: "#features" },
    { label: "Budgeting", href: "#features" },
    { label: "Tax", href: "#features" },
    { label: "Reporting", href: "#features" },
  ],
  company: [
    { label: "About", href: "#why" },
    { label: "Customers", href: "#customers" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "X (formerly Twitter)", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};
