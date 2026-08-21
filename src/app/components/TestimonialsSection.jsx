"use client";

import Image from "next/image";
import { Leaf } from "lucide-react";

const testimonials = [
  {
    name: "Adarsh Shinde",
    role: "Guest",
    location: "Shirdi",
    quote:
      "A beautiful escape and one of the best resort near Shirdi. The calm surroundings, warm hospitality and clean spaces made our stay truly special.",
  },
  {
    name: "Ranjeet Gaikwad",
    role: "Traveller",
    location: "Pune",
    quote:
      "If you want the best villas and cottages with a peaceful vibe, this is exactly the place. It feels private, relaxed and very well cared for.",
  },
  {
    name: "Sandeep Kulkarni",
    role: "Family Visitor",
    location: "Nashik",
    quote:
      "We came for a family stay and left with great memories. The setting is serene, the service is thoughtful, and the experience feels premium.",
  },
  {
    name: "Ashok Borkar",
    role: "Weekend Guest",
    location: "Mumbai",
    quote:
      "A perfect retreat for anyone looking for comfort near nature. The Native Place is definitely among the best villas and cottages to unwind in peace.",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function TestimonialCard({ testimonial }) {
  const initials = getInitials(testimonial.name);

  return (
    <article className="rounded-[30px] border border-[#f1eadc] bg-[#fffdf8] p-7 shadow-[0_18px_50px_rgba(36,31,21,0.08)] sm:p-8">
      <div className="flex gap-1 text-[#d9ab2b]">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="text-[18px] leading-none">
            *
          </span>
        ))}
      </div>

      <p className="mt-5 font-heading text-[1.18rem] leading-[1.38] text-[#39504a] sm:text-[1.28rem]">
        <span aria-hidden="true">{'"'}</span>
        {testimonial.quote}
        <span aria-hidden="true">{'"'}</span>
      </p>

      <div className="mt-7 border-t border-[#ebe6d9] pt-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#88a24a,#dce7bd)] text-sm font-semibold text-[#173525] shadow-[0_10px_25px_rgba(95,121,45,0.18)]">
            {initials}
          </div>

          <div>
            <h3 className="font-heading text-[1.25rem] leading-tight text-[#20342b] sm:text-[1.4rem]">
              {testimonial.name}
            </h3>
            <p className="font-subheading text-[11px] font-medium uppercase tracking-[0.22em] text-[#88906e]">
              {testimonial.role}
            </p>
            <p className="mt-1 text-sm text-[#7d8579]">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f2e4] py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(184,220,79,0.12),transparent_26%),linear-gradient(180deg,rgba(248,244,234,1)_0%,rgba(255,254,250,1)_100%)]" />

      <div className="absolute inset-0 pointer-events-none opacity-55">
        <div className="relative h-full w-full">
          <Image
            src="/images/svg/testimonialvector.png"
            alt="Testimonial background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-44 opacity-35 sm:w-56">
        <Leaf
          className="absolute left-[-1rem] top-8 h-36 w-36 rotate-[18deg] text-[#b9c995]/30"
          strokeWidth={1.2}
        />
        <Leaf
          className="absolute left-[-2.4rem] top-32 h-28 w-28 rotate-[-18deg] text-[#cfd9b9]/25"
          strokeWidth={1.2}
        />
      </div>

      <div className="absolute right-0 top-0 h-full w-44 opacity-35 sm:w-56">
        <Leaf
          className="absolute right-[-1rem] bottom-24 h-32 w-32 rotate-[24deg] text-[#b9c995]/25"
          strokeWidth={1.2}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-4 text-[#b8a87a]">
            <span className="h-px w-12 bg-[#d6ccad] sm:w-16" />
            <span className="font-subheading text-[12px] font-semibold uppercase tracking-[0.45em] text-[#6f8342] sm:text-sm">
              Guest Experience
            </span>
            <span className="h-px w-12 bg-[#d6ccad] sm:w-16" />
          </div>

          <h2 className="mt-4 font-heading text-[clamp(2.45rem,5vw,4.7rem)] leading-[1.02] text-[#20342b]">
            Moments That Stay With You.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-body text-[15px] leading-7 text-[#7a837f] sm:text-lg">
            Hear from guests who came looking for a stay and left with memories.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={index === 3 ? "xl:col-start-2" : ""}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d9dfc3]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6f8342]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d9dfc3]" />
        </div>

        <div className="mt-6 flex justify-end">
          <div className="flex items-center gap-3 text-[#7a9250]">
            <span className="font-script text-[1.75rem] sm:text-[2rem]">
              More Happy Stories...
            </span>
            <span className="text-2xl leading-none">-&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
