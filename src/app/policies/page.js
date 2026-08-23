import Link from "next/link";
import {
  ArrowRight,
  BadgeInfo,
  CalendarDays,
  CreditCard,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";

const sections = [
  { id: "arrival-departure", label: "Arrival & Departure" },
  { id: "booking-payment", label: "Booking & Payment" },
  { id: "cancellation-refund", label: "Cancellation & Refund" },
  { id: "personal-belongings", label: "Personal Belongings" },
];

const arrivalItems = [
  "Check-in time is 1:00 PM.",
  "Check-out time is 11:00 AM.",
  "Early check-in or late check-out is subject to availability and may attract additional charges.",
  "Guests are requested to provide valid government-issued identification at check-in.",
];

const bookingItems = [
  "A booking is confirmed only after the required advance payment has been received.",
  "The remaining balance must be paid at check-in.",
  "Rates may vary depending on dates, occupancy, holidays and special occasions.",
  "Guests are requested to verify the booking details before making payment.",
];

const cancellationItems = [
  "Reservations cancelled more than 48 hours before the scheduled arrival date are eligible for a 100% refund of the amount paid.",
  "Reservations cancelled within 48 hours of the scheduled arrival date will be subject to a 100% cancellation fee, and no refund will be provided.",
  "In case of a no-show, the booking will be treated as cancelled and no refund will be provided.",
  "Bookings made under special or promotional offers requiring 100% advance payment are non-cancellable, non-refundable and non-amendable.",
  "Any eligible refund will be processed to the original payment method within 4–5 business days.",
  "Any change to the booking dates or number of guests is subject to availability and approval by the management.",
];

const belongingsItems = [
  "Guests are responsible for their personal belongings during their stay.",
  "The Native Place recommends that valuables and important documents be kept securely.",
  "The property is not responsible for loss or damage to personal belongings unless otherwise required by applicable law.",
];

function PolicyCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-[24px] border border-[#e9e0cd] bg-white p-6 shadow-[0_14px_35px_rgba(34,49,31,0.08)]">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef2df] text-[#6b8444]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-heading text-[clamp(1.9rem,2.6vw,2.6rem)] leading-tight text-[#20342b]">
            {title}
          </h2>
          <p className="mt-2 text-[15px] leading-7 text-[#56615a]">{description}</p>
        </div>
      </div>
    </article>
  );
}

function PolicySection({ id, title, items, icon: Icon }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[28px] border border-[#e9e0cd] bg-[#faf7ee] p-6 shadow-[0_16px_40px_rgba(34,49,31,0.06)] sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#204f30] text-white">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-heading text-[clamp(1.8rem,2.6vw,2.8rem)] leading-tight text-[#20342b]">
          {title}
        </h3>
      </div>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[18px] bg-white px-5 py-4 text-[15px] leading-7 text-[#56615a] shadow-[0_10px_24px_rgba(34,49,31,0.04)]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export const metadata = {
  title: "Policies & Important Information | The Native Place Shirdi",
  description: "Arrival, booking, cancellation and belongings policy information for guests.",
};

export default function PoliciesPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-[#fbf8ef]">
        <PageBanner
          eyebrow="Policies"
          title="Policies & Important Information"
          description="Please review the key stay policies before confirming your booking."
          image="/images/banners/banner3.jpeg"
          imageAlt="Policies banner"
        />

        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-6">
                <PolicyCard
                  icon={ShieldCheck}
                  title="Your stay, clearly explained"
                  description="Use the quick section links below to jump straight to the policy you want to review."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`#${section.id}`}
                      className="inline-flex items-center justify-between rounded-[20px] border border-[#e5dcc9] bg-white px-5 py-4 text-[15px] font-medium text-[#20342b] shadow-[0_12px_28px_rgba(34,49,31,0.05)] transition-colors duration-300 hover:border-[#b8dc4f] hover:bg-[#f6faee]"
                    >
                      <span>{section.label}</span>
                      <ArrowRight className="h-4 w-4 text-[#6b8444]" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[#e9e0cd] bg-[#f5efdf] p-7 shadow-[0_16px_40px_rgba(34,49,31,0.06)] sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef2df] text-[#6b8444]">
                    <BadgeInfo className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-[clamp(1.9rem,2.8vw,3rem)] leading-tight text-[#20342b]">
                      Policies at a glance
                    </h2>
                    <p className="mt-2 text-[15px] leading-7 text-[#56615a]">
                      Everything important is gathered in one place for quick reference.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Check-in starts at 1:00 PM",
                    "Check-out is by 11:00 AM",
                    "Advance payment confirms booking",
                    "Refunds follow the cancellation timeline",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[18px] bg-white px-4 py-3 text-[15px] text-[#56615a]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6">
              <PolicySection
                id="arrival-departure"
                title="Arrival & Departure Policy"
                items={arrivalItems}
                icon={CalendarDays}
              />
              <PolicySection
                id="booking-payment"
                title="Booking & Payment"
                items={bookingItems}
                icon={CreditCard}
              />
              <PolicySection
                id="cancellation-refund"
                title="Cancellation & Refund Policy"
                items={cancellationItems}
                icon={ShieldCheck}
              />
              <PolicySection
                id="personal-belongings"
                title="Personal Belongings"
                items={belongingsItems}
                icon={Leaf}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
