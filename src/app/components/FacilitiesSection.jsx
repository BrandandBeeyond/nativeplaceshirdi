import Image from "next/image";
import {
  Leaf,
  PartyPopper,
  Sparkles,
  Trees,
  UtensilsCrossed,
  Waves,
} from "lucide-react";

const facilities = [
  {
    title: "Swimming Pool",
    description: "Unwind, relax and soak in pure bliss.",
    image: "/images/amenities/pool2.jpeg",
    icon: Waves,
  },
  {
    title: "Dining Hall",
    description: "Delicious meals, warm ambience, memorable moments.",
    image: "/images/dininghall/dininghall.jpeg",
    icon: UtensilsCrossed,
  },
  {
    title: "Banquet Hall",
    description: "Celebrate life's special occasions in style.",
    image: "/images/banners/weddinghall.WEBP",
    icon: PartyPopper,
  },
  {
    title: "Kids' Play Area",
    description: "A safe and joyful space for little adventurers.",
    image: "/images/amenities/kidsplayarea.jpeg",
    icon: Sparkles,
  },
  {
    title: "Relaxation Spaces",
    description: "Quiet corners to sit back, breathe and rejuvenate.",
    image: "/images/amenities/machan.jpeg",
    icon: Trees,
  },
  {
    title: "Machan Lounge",
    description: "An elevated retreat for coffee, conversations and calm views.",
    image: "/images/amenities/machan.jpeg",
    icon: Leaf,
  },
];

function FacilityCard({ facility, ...aosProps }) {
  const Icon = facility.icon;

  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border border-[#ece2cf] bg-[#f5efdf] shadow-[0_18px_45px_rgba(40,55,35,0.08)]"
      data-aos="zoom-in-up"
      {...aosProps}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={facility.image}
          alt={facility.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          priority={facility.title === "Swimming Pool"}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/16 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
          <div className="flex items-end gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f1f2e7]/95 text-[#6b8444] shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>

            <div className="max-w-[92%] text-white">
              <h3 className="font-subheading text-[0.9rem] uppercase tracking-[0.22em] sm:text-[1rem]">
                {facility.title}
              </h3>
              <p className="mt-1 max-w-md text-sm leading-6 text-white/86 sm:text-[15px]">
                {facility.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FacilitiesSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f4ea] py-16 sm:py-20 lg:py-24" data-aos="fade-up">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,233,213,0.75),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(219,231,192,0.32),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
          <span className="font-subheading text-[12px] font-semibold uppercase tracking-[0.4em] text-[#6b8444] sm:text-sm">
            Our Resort Facilities
          </span>

          <div className="mt-3 flex items-center justify-center gap-4 text-[#89a35f]">
            <span className="h-px w-16 bg-[#cdbf9a]" />
            <Leaf className="h-5 w-5" strokeWidth={1.8} />
            <span className="h-px w-16 bg-[#cdbf9a]" />
          </div>

          <h2 className="mt-4 font-heading text-4xl leading-[1.08] text-[#1f3c2f] sm:text-5xl lg:text-[4.15rem]">
            Everything You Need, All in One Place
          </h2>

          <p className="mx-auto mt-5 max-w-3xl font-body text-[15px] leading-7 text-[#56615a] sm:text-lg">
            From refreshing mornings by the pool to joyful evenings with loved
            ones, our thoughtfully designed spaces make every moment truly
            special.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12">
          {facilities.map((facility, index) => (
            <FacilityCard key={facility.title} facility={facility} data-aos-delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
