"use client";

import Sidebar from "../../components/Sidebar";
import AiAssistant from "../../components/AiAssistant";
import { SidebarProvider, useSidebar } from "../../components/SidebarContext";
import { RequireAuth } from "../../components/auth/RequireAuth";
import { ReactNode } from "react";

function DashboardContent({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] text-white">
      <Sidebar />
      <main
        className={`flex flex-1 flex-col overflow-y-auto overflow-x-hidden min-w-0 transition-all duration-300 ease-in-out ${
          collapsed ? "md:pl-[68px]" : "md:pl-64"
        }`}
      >
        {children}
      </main>
      <AiAssistant />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </RequireAuth>
  );
}
