"use client";

import Image from "next/image";
import { ArrowRight, Leaf, PhoneCall, Sparkles, Users, UtensilsCrossed } from "lucide-react";

const perks = [
  {
    icon: Leaf,
    title: "Lush Green Surroundings",
    text: "Nature all around you",
  },
  {
    icon: Sparkles,
    title: "Peaceful & Comfortable",
    text: "Relax in total comfort",
  },
  {
    icon: UtensilsCrossed,
    title: "Nature & Local Experiences",
    text: "Feel the heart of nature",
  },
  {
    icon: Users,
    title: "Memorable Moments",
    text: "Moments to cherish forever",
  },
];

export default function BookingSection() {
  return (
    <section className="bg-[#f7f2e4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="rounded-[34px] border border-[#eadfca] bg-[#f3ecdb] p-4 shadow-[0_18px_60px_rgba(33,40,28,0.08)] sm:p-5">
          <div className="grid overflow-hidden rounded-[28px] bg-[#f7f1e2] lg:grid-cols-[1.05fr_1fr]">
            <div className="relative min-h-[640px] lg:min-h-[860px]">
              <Image
                src="/images/banners/banner2.jpeg"
                alt="Resort booking background"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.42)_78%),linear-gradient(180deg,rgba(24,16,8,0.12)_0%,rgba(24,16,8,0.48)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,8,4,0.46)_0%,rgba(12,8,4,0.12)_34%,rgba(12,8,4,0.05)_60%,rgba(12,8,4,0.2)_100%)]" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="max-w-[420px]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ecf0d9] backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    Book The Native Place
                  </div>

                  <div className="mt-10">
                    <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.45em] text-[#d8e29f]">
                      Nature. Comfort. Memories.
                    </p>
                    <h2 className="mt-5 font-heading text-[clamp(3.1rem,4.9vw,5.8rem)] leading-[0.95] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                      Your Escape Awaits.
                    </h2>
                    <p className="mt-6 max-w-[340px] text-[15px] leading-7 text-white/88 sm:text-[1rem]">
                      Unwind in the serenity of nature and indulge in comfort like never before.
                      A perfect blend of peace, luxury and unforgettable moments.
                    </p>
                  </div>

                  <div className="mt-10 rounded-[24px] border border-white/10 bg-[#254021]/80 p-5 shadow-[0_18px_35px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:max-w-[300px]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#254021]">
                      <PhoneCall className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-white/80">Have questions?</p>
                        <p className="text-sm text-white/70">We’re here to help!</p>
                        <a
                          href="tel:+918237036360"
                          className="mt-1 block text-[1.25rem] font-semibold text-[#d8f184]"
                        >
                          +91 82370 36360
                        </a>
                       
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {perks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-[18px] border border-white/70 bg-white/95 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef1df] text-[#7a9250]">
                            <Icon className="h-5 w-5" strokeWidth={1.8} />
                          </span>
                          <div>
                            <h3 className="text-sm font-semibold text-[#24362d]">{item.title}</h3>
                            <p className="mt-1 text-xs leading-5 text-[#647068]">{item.text}</p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative bg-[#f8f4ea] p-5 sm:p-7 lg:p-8">
              <div className="absolute right-3 top-3 h-32 w-32 rounded-full border border-[#dfe5ba] opacity-70" />
              <div className="absolute right-7 top-8 h-20 w-20 rounded-full border border-[#dfe5ba] opacity-50" />

              <div className="relative z-10 rounded-[30px] border border-[#eadfca] bg-[#fffdf8] p-6 shadow-[0_18px_40px_rgba(33,40,28,0.08)] sm:p-8 lg:p-10">
                <div className="max-w-[380px]">
                  <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.35em] text-[#6b8444]">
                    Book Your Stay
                  </p>
                  <h2 className="mt-3 font-heading text-[clamp(2.5rem,3.8vw,4.1rem)] leading-[0.98] text-[#20342b]">
                    Plan Your Escape
                  </h2>
                  <p className="mt-4 text-[15px] leading-7 text-[#5d665f]">
                    Fill in the details below and we’ll take care of the rest.
                  </p>
                </div>

                <form className="mt-8 space-y-5" action="#" method="post">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#37433c]">
                        First Name
                      </span>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        className="w-full rounded-2xl border border-[#d8ded8] bg-white px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#37433c]">
                        Last Name
                      </span>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        className="w-full rounded-2xl border border-[#d8ded8] bg-white px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#37433c]">
                        Phone
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        className="w-full rounded-2xl border border-[#d8ded8] bg-white px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#37433c]">
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        className="w-full rounded-2xl border border-[#d8ded8] bg-white px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#37433c]">
                        Check-in Date
                      </span>
                      <input
                        type="date"
                        name="checkIn"
                        className="w-full rounded-2xl border border-[#d8ded8] bg-white px-4 py-4 text-[15px] outline-none transition-colors duration-300 focus:border-[#6b8444]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#37433c]">
                        Check-out Date
                      </span>
                      <input
                        type="date"
                        name="checkOut"
                        className="w-full rounded-2xl border border-[#d8ded8] bg-white px-4 py-4 text-[15px] outline-none transition-colors duration-300 focus:border-[#6b8444]"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#37433c]">
                      Message <span className="text-[#8c948f]">(Optional)</span>
                    </span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Your message or any special request..."
                      className="w-full rounded-2xl border border-[#d8ded8] bg-white px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#203f20] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4f6f1d]"
                  >
                    Submit Booking Request
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
