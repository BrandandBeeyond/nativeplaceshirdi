import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Home,
  Leaf,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageBanner from "./PageBanner";

function IconPill({ icon: Icon, label }) {
  return (
    <div className="flex min-h-[92px] flex-col items-center justify-center rounded-[18px] border border-[#ece4d3] bg-white/70 px-4 py-4 text-center shadow-[0_10px_28px_rgba(44,56,38,0.05)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dde3ce] bg-[#f4f7ea] text-[#7d9562]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="mt-2 text-[12px] leading-4 text-[#516059]">{label}</span>
    </div>
  );
}

function BulletItem({ children }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-7 text-[#566155] sm:text-[16px]">
      <Leaf className="mt-1 h-4 w-4 shrink-0 text-[#7d9562]" />
      <span>{children}</span>
    </li>
  );
}

export default function StayDetailPage({
  stayLabel,
  stayTitle,
  bannerTitle,
  bannerDescription,
  bannerImage,
  heroImage,
  heroThumbs,
  introImage,
  galleryImages,
  amenities,
  highlights,
}) {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-[#fbf8ef] text-[#20342b]">
        <PageBanner
          eyebrow={stayLabel}
          title={bannerTitle || stayTitle}
          description={
            bannerDescription ||
            `Explore our ${stayTitle.toLowerCase()} and discover a nature-filled stay in Shirdi.`
          }
          image={bannerImage || heroImage}
          imageAlt={stayTitle}
        />

        <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/#stay-with-us"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#4f5b52] transition-colors duration-300 hover:text-[#20342b]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Villas & Cottages
            </Link>

            <div className="inline-flex items-center gap-3 rounded-full border border-[#e4ddcf] bg-white/55 px-4 py-2 text-sm font-medium text-[#49574e] shadow-[0_8px_24px_rgba(39,49,33,0.04)] backdrop-blur-sm">
              {stayLabel}
              <Grid3x3 className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1.05fr_0.9fr] lg:items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[22px] shadow-[0_22px_52px_rgba(44,56,38,0.12)]">
                <div className="relative aspect-[1.18/1] lg:aspect-[1.12/1]">
                  <Image src={heroImage} alt={stayTitle} fill priority className="object-cover" />
                </div>

                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#20342b] shadow-[0_8px_22px_rgba(20,28,17,0.18)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#20342b] shadow-[0_8px_22px_rgba(20,28,17,0.18)]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-5 gap-3 sm:gap-4">
                {heroThumbs.map((thumb, index) => (
                  <div
                    key={thumb}
                    className={`relative aspect-[1.2/0.82] overflow-hidden rounded-[12px] border ${
                      index === 0 ? "border-[#d8cdb6]" : "border-[#eadfca]"
                    } bg-white shadow-[0_10px_22px_rgba(44,56,38,0.06)]`}
                  >
                    <Image
                      src={thumb}
                      alt={`${stayTitle} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-2 py-2 lg:px-4 xl:px-8">
              <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.35em] text-[#6e7d63]">
                Nature-embraced stay
              </p>

              <h1 className="mt-4 max-w-xl font-heading text-[clamp(3.2rem,5vw,5.2rem)] leading-[0.92] text-[#2b4532]">
                {stayTitle}
              </h1>

              <div className="mt-5 h-px w-28 bg-[#d8d0be]" />

              <p className="mt-7 max-w-lg font-heading text-[clamp(1.9rem,2.6vw,3rem)] leading-[1.08] text-[#2b2f2d]">
                Spacious. Private.
                <br />
                Surrounded by Nature.
              </p>

              <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#566155]">
                Thoughtfully designed {stayTitle.toLowerCase()} offering generous spaces, peaceful
                surroundings and the comfort of staying together.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-[16px] border border-[#eee6d8] bg-[#f6f3e9] px-4 py-4 shadow-[0_10px_24px_rgba(44,56,38,0.04)]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf2e0] text-[#7d9562]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[14px] leading-5 text-[#4a584f]">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#204f30] px-7 py-4 text-[14px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_30px_rgba(33,67,42,0.2)] transition-all duration-300 hover:bg-[#2d6138]"
                >
                  Check Availability
                  <CalendarDays className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <article className="flex flex-col justify-center rounded-[18px] border border-[#ece2cf] bg-[#f5efdf] p-8 shadow-[0_18px_45px_rgba(40,55,35,0.08)] sm:p-10">
              <h2 className="font-heading text-[clamp(2.2rem,3vw,3.3rem)] leading-tight text-[#2b4532]">
                A Home, Away from Home
              </h2>

              <div className="mt-4 h-px w-24 bg-[#d7cfbc]" />

              <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#566155]">
                Our {stayTitle.toLowerCase()} are ideal for families, friends or small groups who
                wish to relax, reconnect and rejuvenate in a serene natural setting.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  "Ideal for families or groups",
                  "Spacious living & dining area",
                  "Private sit-out with garden views",
                  "Surrounded by greenery & fresh air",
                  "Blend of comfort, privacy & nature",
                ].map((item) => (
                  <BulletItem key={item}>{item}</BulletItem>
                ))}
              </ul>
            </article>

            <div className="relative overflow-hidden rounded-[18px] shadow-[0_18px_45px_rgba(40,55,35,0.08)]">
              <div className="relative aspect-[1.15/0.82] min-h-[360px] lg:min-h-full">
                <Image src={introImage} alt={`${stayTitle} lounge`} fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="text-center">
            <h2 className="font-heading text-[clamp(2.2rem,3vw,3.4rem)] leading-tight text-[#2b4532]">
              Step Inside Your Villa
            </h2>
            <div className="mx-auto mt-3 h-px w-20 bg-[#d7cfbc]" />
          </div>

          <div className="mt-8 flex items-stretch gap-4">
            <button
              type="button"
              aria-label="Previous gallery image"
              className="hidden h-14 w-14 shrink-0 items-center justify-center self-center rounded-full bg-white text-[#20342b] shadow-[0_8px_20px_rgba(20,28,17,0.14)] lg:inline-flex"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-[1.08/0.88] overflow-hidden rounded-[14px] shadow-[0_12px_28px_rgba(44,56,38,0.08)]"
                >
                  <Image
                    src={image}
                    alt={`${stayTitle} gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next gallery image"
              className="hidden h-14 w-14 shrink-0 items-center justify-center self-center rounded-full bg-white text-[#20342b] shadow-[0_8px_20px_rgba(20,28,17,0.14)] lg:inline-flex"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="text-center">
            <h2 className="font-heading text-[clamp(2.1rem,2.7vw,3.2rem)] leading-tight text-[#2b4532]">
              Villa Amenities
            </h2>
            <div className="mx-auto mt-3 h-px w-20 bg-[#d7cfbc]" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {amenities.map((item) => {
              const Icon = item.icon;

              return <IconPill key={item.label} icon={Icon} label={item.label} />;
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="overflow-hidden rounded-[16px] border border-[#ece2cf] bg-[#eff1df] shadow-[0_18px_40px_rgba(40,55,35,0.08)]">
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="px-8 py-10 sm:px-10 lg:py-12">
                <h2 className="max-w-lg font-heading text-[clamp(2rem,2.8vw,3rem)] leading-tight text-[#2b4532]">
                  Ready to experience comfort in the lap of nature?
                </h2>

                <p className="mt-5 max-w-md text-[15px] leading-7 text-[#566155]">
                  Book your stay and unwind with your loved ones.
                </p>

                <a
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#204f30] px-7 py-4 text-[14px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#2d6138]"
                >
                  Book Your Villa
                  <CalendarDays className="h-4 w-4" />
                </a>
              </div>

              <div className="relative min-h-[240px] lg:min-h-[280px]">
                <Image
                  src="/images/amenities/relax.jpeg"
                  alt="Relaxing villa stay"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(239,241,223,0.1),rgba(239,241,223,0.15))]" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Best Rate Guarantee", text: "Get the best rates when you book directly." },
              { icon: PhoneCall, title: "Flexible Cancellation", text: "Plans change, we understand." },
              { icon: Sparkles, title: "Exclusive Offers", text: "Enjoy special benefits on direct bookings." },
              { icon: Home, title: "Support", text: "We're here to help you 24x7." },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[18px] border border-[#eee3d0] bg-white/65 p-5 shadow-[0_12px_26px_rgba(44,56,38,0.05)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e4dccb] bg-[#f8f5ea] text-[#7d9562]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#2b4532]">{item.title}</h3>
                      <p className="mt-1 text-[13px] leading-6 text-[#677268]">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
