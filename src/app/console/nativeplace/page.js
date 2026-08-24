import { BarChart3, CalendarDays, CheckCircle2, MessageSquareText, TrendingUp, Users } from "lucide-react";
import ConsoleShell from "./ConsoleShell.jsx";
import { requireAdminSession } from "./auth.js";
import { getConsoleLiveStats } from "../../lib/console-stats.js";

export const metadata = {
  title: "Admin Dashboard | The Native Place",
  description: "Protected console dashboard for The Native Place.",
};

function DashboardStat({ card }) {
  const Icon = card.icon;

  return (
    <article className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#637069]">{card.label}</p>
          <h3 className="mt-3 font-heading text-[clamp(2rem,3vw,2.9rem)] leading-none text-[#18352a]">
            {card.value}
          </h3>
          <p className="mt-2 text-sm text-[#7b847d]">{card.note}</p>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef4e3] text-[#6b8444]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

const activityItems = [
  "New enquiry received from website",
  "Booking request moved to follow-up",
  "Latest blog draft saved as a draft",
  "Dashboard login completed",
];

export default async function AdminDashboardPage() {
  await requireAdminSession("/console/nativeplace");

  const { dashboard } = await getConsoleLiveStats();

  const dashboardCards = [
    { label: "Total Bookings", value: dashboard.totalBookings, note: "Live MongoDB count", icon: CalendarDays },
    { label: "Contact Enquiries", value: dashboard.contactEnquiries, note: "Messages from website forms", icon: MessageSquareText },
    { label: "Website Leads", value: dashboard.websiteLeads, note: "Prospects captured from the site", icon: Users },
    { label: "System Health", value: dashboard.systemHealth, note: "Protected and active", icon: CheckCircle2 },
  ];

  return (
    <ConsoleShell
      pageTitle="Dashboard"
      pageDescription="Live business tracking across bookings, enquiries and content management."
    >
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => (
          <DashboardStat key={card.label} card={card} />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                Quick Actions
              </p>
              <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
                Dashboard overview
              </h3>
            </div>
            <BarChart3 className="h-6 w-6 text-[#6b8444]" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["Review new enquiries", "Check booking requests", "Publish blogs and banners", "Manage lead follow-ups"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-[#e9e3d4] bg-[#fbf8ef] p-5 text-[15px] font-medium text-[#18352a]"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </article>

        <article className="rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-[#6b8444]" />
            <h3 className="font-heading text-[clamp(1.7rem,2.4vw,2.4rem)] text-[#18352a]">
              Recent Activity
            </h3>
          </div>
          <div className="mt-5 space-y-4">
            {activityItems.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-[20px] bg-[#fbf8ef] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef4e3] text-[#6b8444]">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-[#18352a]">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </ConsoleShell>
  );
}
