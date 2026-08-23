import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  BadgeInfo,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";

export const metadata = {
  title: "Contact Us | The Native Place Shirdi",
  description:
    "Contact The Native Place Shirdi for bookings, information and general enquiries.",
};

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: faInstagram },
  { label: "Facebook", href: "https://facebook.com", icon: faFacebook },
  { label: "WhatsApp", href: "https://wa.me/918237036360", icon: faWhatsapp },
];

function InfoCard({ icon: Icon, title, children }) {
  return (
    <article className="rounded-[28px] border border-[#ece2cf] bg-[#f5efdf] p-7 shadow-[0_18px_45px_rgba(40,55,35,0.08)] sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef1df] text-[#6b8444]">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>

        <div>
          <h2 className="font-heading text-3xl text-[#20342b] sm:text-[2.35rem]">
            {title}
          </h2>
          <div className="mt-4 text-[15px] leading-7 text-[#56615a] sm:text-[16px]">{children}</div>
        </div>
      </div>
    </article>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden bg-[#fbf8ef]">
        <PageBanner
          eyebrow="Contact Us"
          title="Contact Us"
          description="Reach out for bookings, stay details, or any help you need before your visit."
          image="/images/common/IMG_9115.JPG.jpeg"
          imageAlt="The Native Place contact banner"
        />

        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-5 lg:grid-cols-2">
              <InfoCard icon={MapPin} title="Location">
                <p className="text-[16px] leading-7 text-[#56615a]">
                  The Native Place, Shirdi, Maharashtra, India
                </p>
                <p className="mt-3 flex items-center gap-2 text-[#20342b]">
                  <Clock3 className="h-4 w-4 text-[#6b8444]" />
                  Open for stays and enquiries throughout the day
                </p>
                <p className="mt-3 flex items-center gap-2 text-[#20342b]">
                  <BadgeInfo className="h-4 w-4 text-[#6b8444]" />
                  Near Sai Baba Temple, Shirdi
                </p>
              </InfoCard>

              <InfoCard icon={MessageCircle} title="Contact, Mail & Social Media">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#6b8444]" />
                  <a href="tel:+918237036360" className="hover:text-[#18352a]">
                    +91 82370 36360
                  </a>
                </p>
                <p className="mt-3 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#6b8444]" />
                  <a href="tel:+919370678010" className="hover:text-[#18352a]">
                    +91 93706 78010
                  </a>
                </p>
                <p className="mt-3 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#6b8444]" />
                  <a href="mailto:stay@thenativeplaceshirdi.com" className="hover:text-[#18352a]">
                    stay@thenativeplaceshirdi.com
                  </a>
                </p>

                <div className="mt-5">
                  <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6b8444]">
                    Social Media
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#18352a] shadow-[0_10px_25px_rgba(40,55,35,0.08)] transition-transform duration-300 hover:scale-105"
                      >
                        <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </InfoCard>
            </div>

            <div className="mt-8 rounded-[32px] border border-[#ece2cf] bg-white/80 p-6 shadow-[0_18px_45px_rgba(40,55,35,0.08)] backdrop-blur-sm sm:p-8 lg:mt-10 lg:p-10">
              <div className="max-w-3xl">
                <p className="font-subheading text-[12px] font-semibold uppercase tracking-[0.4em] text-[#6b8444]">
                  Send a Message
                </p>
                <h2 className="mt-3 font-heading text-4xl leading-tight text-[#20342b] sm:text-5xl">
                  Tell us how we can help.
                </h2>
              </div>

              <form className="mt-8 grid gap-5" action="#" method="post">
                <div className="grid gap-5 lg:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#37433c]">
                      Your name
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#37433c]">
                      Contact number
                    </span>
                    <input
                      type="tel"
                      name="contact"
                      required
                      inputMode="numeric"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      placeholder="10 digit mobile number"
                      className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                    />
                  </label>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#37433c]">
                      Subject
                    </span>
                    <select
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 focus:border-[#6b8444]"
                    >
                      <option value="" disabled>
                        Select subject
                      </option>
                      <option value="Booking">Booking</option>
                      <option value="Need info">Need info</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#37433c]">
                      Enquiry type
                    </span>
                    <select
                      name="enquiryType"
                      required
                      defaultValue=""
                      className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 focus:border-[#6b8444]"
                    >
                      <option value="" disabled>
                        Select enquiry type
                      </option>
                      <option value="URGENT">URGENT</option>
                      <option value="REGULAR">REGULAR</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#37433c]">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Write your message here"
                    className="w-full rounded-2xl border border-[#d8ded8] bg-[#fcfbf6] px-4 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 rounded-full bg-[#18352A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#2c4b38]"
                  >
                    Send Enquiry
                    <span className="text-lg leading-none">-&gt;</span>
                  </button>
                  <p className="text-sm text-[#67716a]">All fields are required.</p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
