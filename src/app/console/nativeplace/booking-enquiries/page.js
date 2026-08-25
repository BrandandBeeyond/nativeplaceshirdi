import { CalendarDays, Clock3, Sparkles, Ticket } from "lucide-react";
import ConsoleShell from "../ConsoleShell.jsx";
import { requireAdminSession } from "../auth.js";
import { getConsoleLiveStats } from "../../../lib/console-stats.js";
import dbConnect from "@/app/lib/dbConnect.js";
import { BookingEnquiry } from "@/app/lib/models/index.js";

export const metadata = {
  title: "Booking Enquiries | The Native Place",
  description: "Track room and stay booking enquiries.",
};

export default async function BookingEnquiriesPage() {
  await requireAdminSession("/console/nativeplace/booking-enquiries");
  const [bookingStats, recentBookings] = await Promise.all([
    getConsoleLiveStats(),
    getRecentBookingEnquiries(),
  ]);
  const { booking } = bookingStats;

  const summaryCards = [
    { label: "Total Requests", value: booking.total, note: "Live booking data from MongoDB", icon: Ticket },
    { label: "Today", value: booking.today, note: "New booking forms received", icon: CalendarDays },
    { label: "Pending Reply", value: booking.pending, note: "Awaiting confirmation", icon: Clock3 },
    { label: "Confirmed", value: booking.confirmed, note: "Moved to reservation stage", icon: Sparkles },
  ];

  return (
    <ConsoleShell
      pageTitle="Booking Enquiries"
      pageDescription="Manage reservation requests and keep every stay inquiry in one place."
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

      <section className="mt-6 overflow-hidden rounded-[28px] border border-[#e7e2d3] bg-white shadow-[0_14px_40px_rgba(24,53,42,0.08)]">
        <div className="border-b border-[#ece3cf] px-6 py-5 sm:px-8">
          <h3 className="font-heading text-[clamp(1.8rem,2.4vw,2.5rem)] text-[#18352a]">
            Recent Booking Enquiries
          </h3>
          <p className="mt-2 text-sm leading-7 text-[#66716a]">
            Latest reservation requests submitted from the homepage booking form.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#ece3cf]">
            <thead className="bg-[#fbf8ef]">
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8444]">
                <th className="px-6 py-4 sm:px-8">Guest</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Check-in</th>
                <th className="px-6 py-4">Check-out</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0eadb]">
              {recentBookings.length ? (
                recentBookings.map((record) => (
                  <tr key={String(record._id)} className="align-top text-sm text-[#2c3a33]">
                    <td className="px-6 py-4 sm:px-8">
                      <div className="font-medium text-[#18352a]">
                        {record.firstName} {record.lastName}
                      </div>
                      <div className="mt-1 text-xs text-[#7b847d]">Homepage booking form</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatConsoleDate(record.checkIn)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatConsoleDate(record.checkOut)}</td>
                    <td className="px-6 py-4">
                      <p className="max-w-[320px] whitespace-normal leading-6 text-[#56615a]">
                        {record.message || "-"}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#56615a]">
                      {formatConsoleDate(record.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-[#eef4e3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c7a34]">
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm text-[#7b847d]">
                    No booking enquiries found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </ConsoleShell>
  );
}

async function getRecentBookingEnquiries() {
  try {
    await dbConnect();
    return BookingEnquiry.find({}).sort({ createdAt: -1 }).limit(20).lean();
  } catch (_error) {
    return [];
  }
}

function formatConsoleDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
}
