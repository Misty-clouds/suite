"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Eye, RefreshCw, Search, ChevronRight } from "lucide-react";

type ProviderKind = "Commercial bank" | "Mobile money";

interface Provider {
  name: string;
  kind: ProviderKind;
  /** Local logo path; when absent, an initials avatar is shown. */
  logo?: string;
  initials?: string;
}

const PROVIDERS: Provider[] = [
  { name: "Wells Fargo", kind: "Commercial bank", logo: "/assets/images/banks/wells-fargo.png" },
  { name: "Chase", kind: "Commercial bank", logo: "/assets/images/banks/chase.jpg" },
  { name: "Bank of America", kind: "Commercial bank", initials: "BA" },
  { name: "Access Bank", kind: "Commercial bank", initials: "AC" },
  { name: "Citibank", kind: "Commercial bank", initials: "CI" },
  { name: "Capital One", kind: "Commercial bank", initials: "CO" },
  { name: "MTN MoMo", kind: "Mobile money", logo: "/assets/images/banks/mtn-momo.jpg" },
  { name: "Airtel Money", kind: "Mobile money", initials: "AM" },
  { name: "GTBank", kind: "Commercial bank", initials: "GT" },
];

const HOW_IT_WORKS = [
  {
    icon: Shield,
    iconBg: "#162C1E",
    iconColor: "#4ADE80",
    title: "Bank-level encryption",
    desc: "Your credentials are never stored by Suite",
  },
  {
    icon: Eye,
    iconBg: "#1A2A3F",
    iconColor: "#66A4FF",
    title: "Read-only access",
    desc: "Suite can view but never move your money",
  },
  {
    icon: RefreshCw,
    iconBg: "#2E2E18",
    iconColor: "#D7C24E",
    title: "Auto-sync",
    desc: "Transactions update on a schedule automatically",
  },
];

export function AccountsTab() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = PROVIDERS.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex p-6 lg:min-h-[calc(100vh-116px)]">
      <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#272727] bg-[#161616] shadow-lg lg:flex-row">
        {/* Left — intro + how it works */}
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-medium text-[#DEDEDE]">
              Connect Your Bank Accounts
            </h2>
            <p className="text-[14px] leading-[1.1] text-[#6E7B82]">
              Link your bank or mobile money account so Suite can pull your real
              financial data automatically.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-medium text-[#6E7B82]">HOW IT WORKS</p>
            <div className="flex flex-col">
              {HOW_IT_WORKS.map((item, i) => {
                const Icon = item.icon;
                const isLast = i === HOW_IT_WORKS.length - 1;
                return (
                  <div
                    key={item.title}
                    className={`flex items-center gap-2 ${i === 0 ? "pb-3" : isLast ? "pt-3" : "py-3"} ${
                      isLast ? "" : "border-b border-[#3B3B3B]"
                    }`}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-[12px] p-3"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <Icon size={16} style={{ color: item.iconColor }} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="truncate text-[14px] font-medium leading-[1.1] text-[#DEDEDE]">
                        {item.title}
                      </p>
                      <p className="text-[12px] leading-[1.2] text-[#6E7B82]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — provider list */}
        <div className="flex flex-1 flex-col gap-3 border-t border-[#272727] p-6 lg:border-l lg:border-t-0">
          <p className="text-[12px] font-medium text-[#6E7B82]">SELECT PROVIDER</p>

          {/* Search */}
          <div className="flex items-center gap-2.5 rounded-full bg-[#1A1A1A] px-4 py-3 shadow-sm">
            <Search size={16} className="shrink-0 text-[#6E7B82]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-[14px] text-[#DEDEDE] placeholder-[#6E7B82] focus:outline-none"
            />
          </div>

          {/* List */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-hide lg:max-h-none max-h-[360px]">
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-[13px] text-[#6E7B82]">
                No providers found
              </p>
            ) : (
              filtered.map((p, i) => {
                const isLast = i === filtered.length - 1;
                const isSelected = selected === p.name;
                return (
                  <button
                    key={p.name + i}
                    onClick={() => setSelected(p.name)}
                    className={`group flex items-center gap-3 py-3 text-left transition-colors ${
                      isLast ? "" : "border-b border-[#3B3B3B]"
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      {p.logo ? (
                        <Image
                          src={p.logo}
                          alt={p.name}
                          width={32}
                          height={32}
                          className="size-8 shrink-0 rounded-[8px] object-contain"
                        />
                      ) : (
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#023483] text-[14px] font-medium text-[#66A4FF]">
                          {p.initials}
                        </div>
                      )}
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p
                          className={`truncate text-[14px] font-medium leading-[1.1] ${
                            isSelected ? "text-white" : "text-[#DEDEDE]"
                          }`}
                        >
                          {p.name}
                        </p>
                        <p className="text-[12px] leading-[1.2] text-[#6E7B82]">
                          {p.kind}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-[#6E7B82] transition-colors group-hover:text-[#DEDEDE]"
                    />
                  </button>
                );
              })
            )}
          </div>

          {selected && (
            <p className="text-[12px] text-[#6E7B82]">
              Selected <span className="text-[#DEDEDE]">{selected}</span> —
              connection flow coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
