import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us | The Native Place Shirdi",
  description:
    "Learn about The Native Place Shirdi, our vision, mission and the peaceful escape we create for every guest.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden bg-[#fbf8ef]">
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(219,231,192,0.28),transparent_34%)]" />

          <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div data-aos="fade-right">
              <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.45em] text-[#6b8444] sm:text-sm">
                About Us
              </p>

              <h1 className="mt-4 font-heading text-5xl leading-[1.05] text-[#20342b] sm:text-6xl lg:text-[4.5rem]">
                Welcome to The Native Place
              </h1>

              <p className="mt-6 max-w-2xl text-[18px] leading-8 text-[#56615a] sm:text-[19px]">
                Welcome to The Native Place - where life slows down and nature takes over.
              </p>

              <div className="mt-8 h-px w-20 bg-[#d8cfb7]" />

              <div className="mt-7 space-y-5 text-[16px] leading-8 text-[#5c6258] sm:text-lg">
                <p>
                  In the middle of our busy lives, we often forget to pause. The Native Place was
                  created as a quiet escape where you can step away from the rush, breathe fresh
                  air, and spend meaningful time with the people who matter.
                </p>
                <p>
                  Surrounded by greenery and open spaces, our little retreat near Shirdi is a
                  place to relax, reconnect and create memories - whether it&apos;s a family
                  getaway, a weekend with friends, or simply some time away from everyday life.
                </p>
                <p className="font-medium text-[#20342b]">
                  Come for a stay. Leave with a story to remember.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#18352A] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#2c4b38]"
                >
                  Enquire Now
                  <span className="text-lg leading-none">-&gt;</span>
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center gap-3 rounded-full border border-[#d8cfb7] bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#20342b] transition-all duration-300 hover:border-[#b8dc4f] hover:bg-[#f4f8ea]"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            <div className="relative" data-aos="fade-left">
              <div className="relative min-h-[520px]">
                <div className="absolute left-0 top-0 h-[72%] w-[72%] overflow-hidden rounded-[2.25rem] shadow-[0_24px_60px_rgba(45,54,38,0.18)]">
                  <Image
                    src="/images/common/IMG_9114.JPG.jpeg"
                    alt="The Native Place exterior"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute bottom-[8%] right-[2%] h-[42%] w-[45%] overflow-hidden rounded-[2rem] border-4 border-[#fbf8ef] shadow-[0_24px_60px_rgba(45,54,38,0.18)]">
                  <Image
                    src="/images/amenities/pool2.jpeg"
                    alt="Resort pool view"
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute left-[6%] bottom-0 w-[58%] rounded-[1.75rem] bg-white/88 px-6 py-5 shadow-[0_18px_45px_rgba(36,46,32,0.08)] backdrop-blur-sm">
                  <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6b8444]">
                    A peaceful escape near Shirdi
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#56615a]">
                    Designed for slow mornings, open skies and meaningful stays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-2">
            <article
              className="rounded-[28px] border border-[#ece2cf] bg-[#f5efdf] p-8 shadow-[0_18px_45px_rgba(40,55,35,0.08)] sm:p-10"
              data-aos="fade-up"
            >
              <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.4em] text-[#6b8444]">
                Vision
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-tight text-[#20342b] sm:text-5xl">
                To become one of the most preferred nature stays near Shirdi.
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#56615a] sm:text-lg">
                Known for peaceful surroundings, warm hospitality and memorable guest
                experiences.
              </p>
            </article>

            <article
              className="rounded-[28px] border border-[#ece2cf] bg-[#f5efdf] p-8 shadow-[0_18px_45px_rgba(40,55,35,0.08)] sm:p-10"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.4em] text-[#6b8444]">
                Mission
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-tight text-[#20342b] sm:text-5xl">
                Comfortable stays. Genuine hospitality. Peaceful memories.
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#56615a] sm:text-lg">
                To provide comfortable stays and genuine hospitality while creating a peaceful
                environment where families, friends and travellers can relax, connect and
                create lasting memories.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
