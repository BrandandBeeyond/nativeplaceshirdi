"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
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

function NavLink({ href, label, icon: Icon, active, nested = false }) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition-colors duration-300 ${active ? "bg-white/12 text-white" : "text-white/78 hover:bg-white/8 hover:text-white"} ${nested ? "pl-12" : ""}`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${active ? "border-white/16 bg-white/14" : "border-white/12 bg-white/8"} ${nested ? "h-9 w-9" : ""}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1">{label}</span>
    </Link>
  );
}

function NavGroup({ label, icon: Icon, items }) {
  const pathname = usePathname();
  const active = items.some((item) => isActive(pathname, item.href));
  const [userOpen, setUserOpen] = useState(active);
  const open = userOpen || active;

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setUserOpen((value) => !value)}
        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition-colors duration-300 ${active ? "bg-white/12 text-white" : "text-white/78 hover:bg-white/8 hover:text-white"}`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${active ? "border-white/16 bg-white/14" : "border-white/12 bg-white/8"}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex-1">{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="space-y-2 border-l border-white/10 pl-3">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon || Image}
              active={isActive(pathname, item.href)}
              nested
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ConsoleShell({ children, pageTitle, pageDescription }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#eef3ea]">
      <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
        <aside className="bg-[linear-gradient(180deg,#102f24_0%,#183f2f_100%)] text-white lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#d8f184]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#cfe0a4]">
                    Business
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold leading-none text-white">
                    The Native Place
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex-1 px-4 py-6">
              <p className="px-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                Main Menu
              </p>
              <div className="mt-4 space-y-2">
                {navigation.map((item) => {
                  if (item.items) {
                    return (
                      <NavGroup
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        items={item.items}
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
                    />
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                <p className="text-sm font-semibold text-white">Owner Access</p>
                <p className="mt-1 text-sm leading-6 text-white/72">
                  Signed in as admin with protected route access.
                </p>
                <Link
                  href="/api/console/nativeplace/logout"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#b8dc4f] px-4 py-3 text-sm font-semibold text-[#18352a] transition-colors duration-300 hover:bg-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
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
  );
}
