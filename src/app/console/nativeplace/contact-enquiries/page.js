import { Mail, MessageSquareText, PhoneCall, Sparkles } from "lucide-react";
import ConsoleShell from "../ConsoleShell.jsx";
import { requireAdminSession } from "../auth.js";
import { getConsoleLiveStats } from "../../../lib/console-stats.js";

export const metadata = {
  title: "Contact Enquiries | The Native Place",
  description: "Track contact form enquiries.",
};

export default async function ContactEnquiriesPage() {
  await requireAdminSession("/console/nativeplace/contact-enquiries");
  const { contact } = await getConsoleLiveStats();

  const summaryCards = [
    { label: "Total Enquiries", value: contact.total, note: "Connected records from MongoDB", icon: Mail },
    { label: "New", value: contact.new, note: "Awaiting first reply", icon: MessageSquareText },
    { label: "Replied", value: contact.replied, note: "Responses sent back", icon: PhoneCall },
    { label: "Resolved", value: contact.resolved, note: "Closed conversations", icon: Sparkles },
  ];

  return (
    <ConsoleShell
      pageTitle="Contact Enquiries"
      pageDescription="Monitor messages sent from the public contact form and keep replies organized."
    >
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="rounded-[26px] border border-[#e7e2d3] bg-white p-6 shadow-[0_14px_40px_rgba(24,53,42,0.08)]"
            >
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
        })}
      </section>
    </ConsoleShell>
  );
}
