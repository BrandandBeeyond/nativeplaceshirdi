import dbConnect from "./dbConnect";
import { BookingEnquiry, ContactEnquiry, Lead } from "./models";

const zeroStats = {
  dashboard: {
    totalBookings: 0,
    contactEnquiries: 0,
    websiteLeads: 0,
    systemHealth: "Good",
  },
  contact: {
    total: 0,
    new: 0,
    replied: 0,
    resolved: 0,
  },
  booking: {
    total: 0,
    today: 0,
    pending: 0,
    confirmed: 0,
  },
  leads: {
    total: 0,
    new: 0,
    qualified: 0,
    converted: 0,
  },
};

const startOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export async function getConsoleLiveStats() {
  try {
    await dbConnect();

    const today = startOfToday();

    const [totalBookings, todayBookings, pendingBookings, confirmedBookings, totalContacts, newContacts, repliedContacts, resolvedContacts, totalLeads, newLeads, qualifiedLeads, convertedLeads] =
      await Promise.all([
        BookingEnquiry.countDocuments({}),
        BookingEnquiry.countDocuments({ createdAt: { $gte: today } }),
        BookingEnquiry.countDocuments({ status: "pending" }),
        BookingEnquiry.countDocuments({ status: "confirmed" }),
        ContactEnquiry.countDocuments({}),
        ContactEnquiry.countDocuments({ status: "new" }),
        ContactEnquiry.countDocuments({ status: "replied" }),
        ContactEnquiry.countDocuments({ status: "closed" }),
        Lead.countDocuments({}),
        Lead.countDocuments({ status: "new" }),
        Lead.countDocuments({ status: "qualified" }),
        Lead.countDocuments({ status: "converted" }),
      ]);

    return {
      dashboard: {
        totalBookings,
        contactEnquiries: totalContacts,
        websiteLeads: totalLeads,
        systemHealth: "Live MongoDB",
      },
      contact: {
        total: totalContacts,
        new: newContacts,
        replied: repliedContacts,
        resolved: resolvedContacts,
      },
      booking: {
        total: totalBookings,
        today: todayBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
      },
      leads: {
        total: totalLeads,
        new: newLeads,
        qualified: qualifiedLeads,
        converted: convertedLeads,
      },
    };
  } catch {
    return zeroStats;
  }
}
