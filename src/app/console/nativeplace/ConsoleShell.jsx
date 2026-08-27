"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AdminToastProvider } from "./AdminToast.jsx";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Sparkles,
  Users,
} from "lucide-react";

const navigation = [
  { href: "/console/nativeplace", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "CMS",
    icon: FileText,
    items: [
      { href: "/console/nativeplace/cms/pages", label: "Home Page" },
      { href: "/console/nativeplace/cms/about", label: "About Us" },
      { href: "/console/nativeplace/cms/blogs", label: "Blogs" },
      { href: "/console/nativeplace/cms/testimonials", label: "Testimonials" },
      { href: "/console/nativeplace/cms/villas-cottages", label: "Villas & Cottages" },
    ],
  },
  { href: "/console/nativeplace/contact-enquiries", label: "Contact Enquiries", icon: Mail },
  { href: "/console/nativeplace/booking-enquiries", label: "Booking Enquiries", icon: CalendarDays },
  { href: "/console/nativeplace/leads", label: "Leads", icon: Users },
];

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, label, icon: Icon, active, nested = false, collapsed = false }) {
  return (
    <Link
      href={href}
      prefetch={false}
      title={collapsed ? label : undefined}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition-colors duration-300 ${
        active
          ? "bg-white text-[#183f2f] shadow-[0_8px_18px_rgba(24,63,47,0.08)]"
          : "text-[#5f6c64] hover:bg-white/70 hover:text-[#183f2f]"
      } ${nested ? "pl-12" : ""} ${collapsed ? "justify-center px-3" : ""}`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
          active ? "border-[#d9e6dd] bg-[#f4faf6]" : "border-[#d8e0d7] bg-white"
        } ${nested ? "h-9 w-9" : ""} ${collapsed ? "mx-auto" : ""}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      {!collapsed ? <span className="flex-1">{label}</span> : null}
    </Link>
  );
}

function NavGroup({ label, icon: Icon, items, collapsed = false }) {
  const pathname = usePathname();
  const active = items.some((item) => isActive(pathname, item.href));
  const [userOpen, setUserOpen] = useState(active);
  const open = userOpen || active;

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setUserOpen((value) => !value)}
        title={collapsed ? label : undefined}
        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition-colors duration-300 ${
          active
            ? "bg-white text-[#183f2f] shadow-[0_8px_18px_rgba(24,63,47,0.08)]"
            : "text-[#5f6c64] hover:bg-white/70 hover:text-[#183f2f]"
        } ${collapsed ? "justify-center px-3" : ""}`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            active ? "border-[#d9e6dd] bg-[#f4faf6]" : "border-[#d8e0d7] bg-white"
          } ${collapsed ? "mx-auto" : ""}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        {!collapsed ? <span className="flex-1">{label}</span> : null}
        {!collapsed ? (
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        ) : null}
      </button>

      {open && !collapsed ? (
        <div className="space-y-2 border-l border-white/10 pl-3">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon || Image}
              active={isActive(pathname, item.href)}
              nested
              collapsed={collapsed}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ConsoleShell({ children, pageTitle, pageDescription }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AdminToastProvider>
      <main className="min-h-screen bg-[#eef3ea]">
        <div
          className={`grid min-h-screen transition-[grid-template-columns] duration-300 ease-out ${
            sidebarCollapsed ? "lg:grid-cols-[88px_1fr]" : "lg:grid-cols-[300px_1fr]"
          }`}
        >
          <aside className="relative border-r border-[#dce5dc] bg-[linear-gradient(180deg,#fbfcf8_0%,#f3f7ef_100%)] text-[#183f2f] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((value) => !value)}
            className="absolute right-[-13px] top-6 z-20 hidden h-7 w-7 items-center justify-center rounded-full border border-[#cfe0ea] bg-white text-[#2465d0] shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105 lg:inline-flex"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>

          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-6 py-6">
              <div className={`flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff6ff] text-[#2465d0]">
                  <Sparkles className="h-5 w-5" />
                </div>
                {!sidebarCollapsed ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#7b8a92]">
                      Business
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold leading-none text-[#183f2f]">
                      The Native Place
                    </h1>
                  </div>
                ) : null}
              </div>
            </div>

            <div className={`flex-1 px-4 py-6 ${sidebarCollapsed ? "px-2" : ""}`}>
              {!sidebarCollapsed ? (
                <p className="px-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a97a7]">
                  Main Menu
                </p>
              ) : null}

              <div className="mt-4 space-y-2">
                {navigation.map((item) => {
                  if (item.items) {
                    return (
                      <NavGroup
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        items={item.items}
                        collapsed={sidebarCollapsed}
                      />
                    );
                  }

                  return (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      active={isActive(pathname, item.href)}
                      collapsed={sidebarCollapsed}
                    />
                  );
                })}
              </div>
            </div>

            <div className={`border-t border-[#dce5dc] p-4 ${sidebarCollapsed ? "px-2" : ""}`}>
              <div className="rounded-[24px] border border-[#dce5dc] bg-white p-4">
                {!sidebarCollapsed ? (
                  <>
                    <p className="text-sm font-semibold text-[#183f2f]">Owner Access</p>
                    <p className="mt-1 text-sm leading-6 text-[#6b7b74]">
                      Signed in as admin with protected route access.
                    </p>
                  </>
                ) : null}
                <Link
                  href="/api/console/nativeplace/logout"
                  prefetch={false}
                  title={sidebarCollapsed ? "Logout" : undefined}
                  className={`mt-4 inline-flex items-center gap-2 rounded-full bg-[#b8dc4f] px-4 py-3 text-sm font-semibold text-[#18352a] transition-colors duration-300 hover:bg-white ${
                    sidebarCollapsed ? "justify-center px-3" : ""
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  {!sidebarCollapsed ? "Logout" : null}
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="rounded-[28px] border border-white/70 bg-white/85 px-6 py-5 shadow-[0_16px_45px_rgba(36,48,38,0.08)] backdrop-blur-md sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#6b8444]">
                  Console
                </p>
                <h2 className="mt-2 font-heading text-[clamp(2rem,3vw,3.6rem)] leading-none text-[#18352a]">
                  {pageTitle}
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#64706a]">
                  {pageDescription}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e1d7] bg-[#fbfdf8] px-4 py-3 text-sm text-[#4d5a51]">
                <Sparkles className="h-4 w-4 text-[#6b8444]" />
                Protected admin console
              </div>
            </div>
          </div>

          <div className="mt-6">{children}</div>
          </section>
        </div>
      </main>
    </AdminToastProvider>
  );
}
