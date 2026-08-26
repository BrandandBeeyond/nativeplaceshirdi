import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
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
import FadeCarousel from "./FadeCarousel";

function BulletItem({ children }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-7 text-[#566155] sm:text-[16px]">
      <Leaf className="mt-1 h-4 w-4 shrink-0 text-[#7d9562]" />
      <span>{children}</span>
    </li>
  );
}

function StayTitle({ title }) {
  const match = String(title || "").trim().match(/^(\d+)\s*(.*)$/);

  if (!match) {
    return title;
  }

  const [, leadingNumber, remainingTitle] = match;

  return (
    <>
      <span className="text-[1.15em]">{leadingNumber}</span>
      <span>{remainingTitle ? ` ${remainingTitle}` : ""}</span>
    </>
  );
}

const amenityDescriptions = {
  "2 Bedrooms": "Comfortable sleeping spaces for families and close groups.",
  "Private Sit-out": "A private place to relax and enjoy the surroundings.",
  "Garden Views": "Open views that keep you close to nature.",
  "Comfortable Rooms": "Peaceful rooms designed for a restful stay.",
  "Cozy Sit-out": "A quiet sit-out area for slow mornings and evenings.",
  "Green Surroundings": "Fresh greenery around the stay for a calm vibe.",
  "Nature Feel": "A stay that feels connected to the outdoors.",
  "Wi-Fi Access": "Stay connected whenever you need to.",
  "Tea / Coffee Maker": "Simple comforts for easy mornings.",
  "Wardrobe Space": "Storage space to keep your stay organized.",
  "Mini Fridge": "Convenient cooling for drinks and snacks.",
  "Compact Storage": "Practical storage for your belongings.",
  "Power Backup": "Comfort continues without interruptions.",
  "Housekeeping": "Clean, maintained spaces throughout your stay.",
};

function AmenityCard({ icon: Icon, label, text }) {
  return (
    <div className="group rounded-[22px] border border-[#ece1d1] bg-white/90 p-5 text-center shadow-[0_12px_30px_rgba(36,46,32,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(36,46,32,0.08)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef1df] text-[#758e54] transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-6 w-6" strokeWidth={1.7} />
      </div>
      <h4 className="mt-4 text-[15px] font-semibold text-[#2f4c3d]">{label}</h4>
      <p className="mt-2 text-[13px] leading-6 text-[#667168]">
        {text || amenityDescriptions[label] || "Thoughtfully included for a better stay."}
      </p>
    </div>
  );
}

function AmenitiesSection({ eyebrow, title, description, amenities }) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#efe6d8] bg-[#fffdf8] px-5 py-8 shadow-[0_18px_50px_rgba(36,46,32,0.06)] sm:px-8 sm:py-10 lg:px-10">
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-bl-[90px] bg-[radial-gradient(circle_at_center,rgba(133,170,89,0.16),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-tr-[90px] bg-[radial-gradient(circle_at_center,rgba(133,170,89,0.12),transparent_70%)]" />

      <div className="relative text-center">
        <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.38em] text-[#6b8444] sm:text-sm sm:tracking-[0.45em]">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-heading text-[clamp(2rem,4.8vw,3.3rem)] leading-tight text-[#2b5a46]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-[#5d665f] sm:text-base">
          {description}
        </p>
        <div className="mx-auto mt-5 h-px w-28 bg-[#d9d2c4]" />
      </div>

      <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {amenities.map((item) => {
          const Icon = item.icon;

          return <AmenityCard key={item.label} icon={Icon} label={item.label} text={item.text} />;
        })}
      </div>
    </section>
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
  amenityEyebrow,
  amenityTitle,
  amenityDescription,
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
            <FadeCarousel
              images={heroThumbs?.length ? heroThumbs : [heroImage]}
              alt={stayTitle}
              className="bg-[#fbf8ef] shadow-[0_22px_52px_rgba(44,56,38,0.12)]"
              aspectClassName="aspect-[1.18/0.84] lg:aspect-[1.12/0.8]"
              imageClassName="object-contain bg-[#fbf8ef]"
              containerRoundedClassName="rounded-[22px]"
            />

            <div className="px-2 py-2 lg:px-4 xl:px-8">
              <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.35em] text-[#6e7d63]">
                Nature-embraced stay
              </p>

              <h1 className="mt-4 max-w-xl font-heading text-[clamp(3.2rem,5vw,5.2rem)] leading-[0.92] text-[#2b4532]">
                <StayTitle title={stayTitle} />
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
          <AmenitiesSection
            eyebrow={amenityEyebrow || `${stayLabel.replace(/^All\s+/i, "")} Amenities`}
            title={amenityTitle || "Comfort. Nature. Every Detail."}
            description={
              amenityDescription ||
              "Thoughtfully curated amenities to make your stay relaxing, comfortable and truly memorable."
            }
            amenities={amenities}
          />
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="text-center">
            <h2 className="font-heading text-[clamp(2.2rem,3vw,3.4rem)] leading-tight text-[#2b4532]">
              Step Inside Your Villa
            </h2>
            <div className="mx-auto mt-3 h-px w-20 bg-[#d7cfbc]" />
          </div>

          <div className="mt-8 mx-auto max-w-5xl">
            <FadeCarousel
              images={galleryImages}
              alt={`${stayTitle} gallery`}
              className="shadow-[0_12px_28px_rgba(44,56,38,0.08)]"
              aspectClassName="aspect-[1.08/0.74] sm:aspect-[1.08/0.62] lg:aspect-[1.08/0.52]"
              containerRoundedClassName="rounded-[14px]"
              showThumbs={false}
            />
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
