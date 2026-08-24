"use client";

import Image from "next/image";
import { Leaf, Star } from "lucide-react";

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
  {
    name: "Pooja Patil",
    role: "Family Guest",
    location: "Pune",
    quote:
      "One of the best resort near Shirdi for a peaceful family stay. The greenery, comfort and warm service made everything feel effortless.",
  },
  {
    name: "Nikhil Sharma",
    role: "Traveller",
    location: "Hyderabad",
    quote:
      "If you are searching for best villas and cottages with calm surroundings, this place is exactly what you need. It feels private, clean and relaxing.",
  },
  {
    name: "Meera Joshi",
    role: "Holiday Guest",
    location: "Nagpur",
    quote:
      "Our stay was serene and memorable. The resort near Shirdi offers the right balance of nature, comfort and thoughtful hospitality.",
  },
  {
    name: "Arjun Deshmukh",
    role: "Weekend Traveller",
    location: "Mumbai",
    quote:
      "A refreshing escape with beautiful spaces and great service. We found the best villas and cottages experience for a quiet break with family.",
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
    <article className="h-full rounded-[26px] border border-[#f1eadc] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(36,31,21,0.08)] sm:rounded-[30px] sm:p-8">
      <div className="flex gap-1 text-[#d9ab2b]" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-4 w-4 fill-current text-[#d9ab2b]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="mt-4 font-heading text-[1.05rem] leading-[1.34] text-[#39504a] sm:mt-5 sm:text-[1.28rem]">
        <span aria-hidden="true">{'"'}</span>
        {testimonial.quote}
        <span aria-hidden="true">{'"'}</span>
      </p>

      <div className="mt-6 border-t border-[#ebe6d9] pt-4 sm:mt-7 sm:pt-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#88a24a,#dce7bd)] text-[13px] font-semibold text-[#173525] shadow-[0_10px_25px_rgba(95,121,45,0.18)] sm:h-12 sm:w-12 sm:text-sm">
            {initials}
          </div>

          <div>
            <h3 className="font-heading text-[1.1rem] leading-tight text-[#20342b] sm:text-[1.4rem]">
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
  const sliderTestimonials = [...testimonials, ...testimonials];

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

        <div className="mt-10 overflow-hidden">
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f7f2e4] to-transparent sm:w-28" />
            <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f7f2e4] to-transparent sm:w-28" />

            <div className="flex w-max gap-4 sm:gap-6 animate-testimonial-marquee group-hover:[animation-play-state:paused]">
              {sliderTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="w-[82vw] flex-none sm:w-[400px] lg:w-[440px]">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
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
