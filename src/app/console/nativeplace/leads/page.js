import { ArrowUpRight, CalendarDays, ExternalLink, MessageCircle, Sparkles, Target, Users } from "lucide-react";
import ConsoleShell from "../ConsoleShell.jsx";
import { requireAdminSession } from "../auth.js";
import dbConnect from "@/app/lib/dbConnect.js";
import { Lead } from "@/app/lib/models/index.js";
import { getConsoleLiveStats } from "../../../lib/console-stats.js";

export const metadata = {
  title: "Leads | The Native Place",
  description: "Track website and campaign leads.",
};

const statusStyles = {
  new: "bg-[#edf6e1] text-[#507133]",
  qualified: "bg-[#eef4e3] text-[#47613a]",
  follow_up: "bg-[#f7f1df] text-[#8d6d2a]",
  converted: "bg-[#e4f1e8] text-[#2f6b42]",
  closed: "bg-[#f1f1f1] text-[#64706a]",
};

const formatDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

async function getLeadRows() {
  try {
    await dbConnect();
    const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();

    return leads.map((lead) => ({
      _id: String(lead._id),
      name: lead.name || "Lead",
      phone: String(lead.phone || "").trim(),
      email: String(lead.email || "").trim(),
      source: String(lead.source || "website").trim(),
      status: String(lead.status || "new").trim(),
      notes: String(lead.notes || "").trim(),
      createdAt: lead.createdAt,
    }));
  } catch {
    return [];
  }
}

function buildWhatsAppLink(phone, name, notes) {
  const cleanedPhone = String(phone || "").replace(/\D/g, "");
  const target = cleanedPhone.length === 10 ? `91${cleanedPhone}` : cleanedPhone;
  const message = encodeURIComponent(
    `Hi ${name || "there"}, thanks for reaching out to The Native Place. ${notes ? `You shared: ${notes}` : ""}`.trim(),
  );

  return `https://wa.me/${target}?text=${message}`;
}

export default async function LeadsPage() {
  await requireAdminSession("/console/nativeplace/leads");
  const { leads } = await getConsoleLiveStats();
  const leadRows = await getLeadRows();

  const summaryCards = [
    { label: "Total Leads", value: leads.total, note: "Connected lead source in MongoDB", icon: Users },
    { label: "New", value: leads.new, note: "Fresh prospects waiting", icon: Sparkles },
    { label: "Qualified", value: leads.qualified, note: "Interested visitors", icon: Target },
    { label: "Converted", value: leads.converted, note: "Bookings confirmed", icon: ArrowUpRight },
  ];

  return (
    <ConsoleShell
      pageTitle="Leads"
      pageDescription="Track potential guests and move them through your follow-up pipeline."
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

      <section className="mt-6 rounded-[28px] border border-[#e7e2d3] bg-white p-6 shadow-[0_16px_45px_rgba(36,48,38,0.08)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
              Lead Table
            </p>
            <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] text-[#18352a]">
              Live WhatsApp and website leads
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9dcc9] bg-[#fbf8ef] px-4 py-2 text-sm text-[#566155]">
            <CalendarDays className="h-4 w-4 text-[#6b8444]" />
            {leadRows.length} records
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-[#e8e2d5]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#ece4d3]">
              <thead className="bg-[#fbf8ef]">
                <tr>
                  {["Name", "Phone", "Source", "Status", "Created", "Action"].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#6b8444]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eadb] bg-white">
                {leadRows.length ? (
                  leadRows.map((lead) => (
                    <tr key={lead._id} className="align-top">
                      <td className="px-5 py-4">
                        <div className="font-medium text-[#18352a]">{lead.name}</div>
                        <p className="mt-1 max-w-[280px] text-sm leading-6 text-[#66716a]">
                          {lead.notes || "-"}
                        </p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-[#18352a]">
                        {lead.phone}
                        {lead.email ? <div className="mt-1 text-xs text-[#7a8276]">{lead.email}</div> : null}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm capitalize text-[#566155]">
                        {lead.source}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                            statusStyles[lead.status] || statusStyles.new
                          }`}
                        >
                          {lead.status.replaceAll("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-[#566155]">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={buildWhatsAppLink(lead.phone, lead.name, lead.notes)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1fa954]"
                          >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-2 rounded-full border border-[#d7dec6] bg-[#fbf8ef] px-4 py-2 text-sm font-semibold text-[#18352a] transition hover:bg-[#f2f7e4]"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Call
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-5 py-8 text-center text-sm text-[#7a8276]" colSpan={6}>
                      No leads yet. WhatsApp submissions will appear here automatically.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ConsoleShell>
  );
}
