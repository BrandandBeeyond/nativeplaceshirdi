"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Villas", href: "/villas" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const policies = [
  { label: "Policies & Information", href: "/policies" },
  { label: "Arrival & Departure", href: "/policies#arrival-departure" },
  { label: "Booking & Payment", href: "/policies#booking-payment" },
  { label: "Cancellation & Refund", href: "/policies#cancellation-refund" },
  { label: "Personal Belongings", href: "/policies#personal-belongings" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thenativeplaceshirdi?igsh=MW91ZGJzazc3YjJjZw%3D%3D&utm_source=qr",
    icon: faInstagram,
    type: "fa",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18vXcmNG7v/?mibextid=wwXIfr",
    icon: faFacebook,
    type: "fa",
  },
  { label: "WhatsApp", href: "https://wa.me/918237036360", icon: faWhatsapp, type: "fa" },
  ];

function WhatsAppPopup({ open, onClose }) {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(
    "Hi, I would like to enquire about The Native Place."
  );

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const openChat = () => {
    const whatsappNumber = "918237036360";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[220] flex items-end justify-end bg-black/30 p-4 sm:p-6">
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white">
             <FontAwesomeIcon icon={faWhatsapp} />

            </span>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#6b8444]">
                WhatsApp
              </p>
              <p className="text-sm text-[#6a6f6a]">Chat with us</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close WhatsApp popup"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f4f4] text-[#1f2a24] transition-colors duration-300 hover:bg-[#e8e8e8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 pb-5 pt-4">
          <h3 className="text-2xl font-medium text-[#2a342e]">Chat with us on WhatsApp</h3>

          <div className="mt-5 space-y-4">
            <input
              type="text"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder="Enter your number"
              className="w-full rounded-2xl border border-[#d7dfd4] px-4 py-4 text-sm outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
            />

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-[#d7dfd4] px-4 py-4 text-sm outline-none transition-colors duration-300 placeholder:text-[#8a8f89] focus:border-[#6b8444]"
            />

            <button
              type="button"
              onClick={openChat}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3b79e0] px-4 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#2f68c9]"
            >
              Start a chat
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#18352a] px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div>
              <Image
                src="/images/logonativeplaceshirdi.png"
                alt="The Native Place"
                width={340}
                height={160}
                className="h-auto w-[280px] object-contain sm:w-[320px]"
              />

              <p className="mt-5 max-w-[360px] text-sm leading-7 text-white/75">
                A peaceful resort escape in Shirdi, surrounded by nature, comfort, and slow
                living.
              </p>
            </div>

            <div>
              <h4 className="font-subheading text-[12px] font-semibold uppercase tracking-[0.35em] text-[#b8dc4f]">
                Quick Links
              </h4>
              <div className="mt-5 flex flex-col gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    <ArrowUpRight className="h-4 w-4 text-[#b8dc4f]" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-subheading text-[12px] font-semibold uppercase tracking-[0.35em] text-[#b8dc4f]">
                Policy
              </h4>
              <div className="mt-5 flex flex-col gap-4">
                {policies.map((policy) => (
                  <Link
                    key={policy.label}
                    href={policy.href}
                    className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    <ArrowUpRight className="h-4 w-4 text-[#b8dc4f]" />
                    {policy.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-subheading text-[12px] font-semibold uppercase tracking-[0.35em] text-[#b8dc4f]">
                Address
              </h4>

              <div className="mt-5 space-y-4 text-sm text-white/80">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b8dc4f]" />
                  <span>
                    At Shahajapur, Shirdi - Surat highway, Near Kolpewadi, kopargaon - Shirdi
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[#b8dc4f]" />
                  <a href="tel:+918237036360" className="hover:text-white">
                    +91 82370 36360
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[#b8dc4f]" />
                  <a href="tel:+919370678010" className="hover:text-white">
                    +91 93706 78010
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-[#b8dc4f]" />
                  <a href="mailto:stay@thenativeplaceshirdi.com" className="hover:text-white">
                    stay@thenativeplaceshirdi.com
                  </a>
                </p>
              </div>

              <div className="mt-6">
                <h5 className="font-subheading text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b8dc4f]">
                  Social Media Handles
                </h5>

                <div className="mt-4 flex items-center gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:bg-[#b8dc4f] hover:text-[#18352a]"
                      >
                        {social.type === "fa" ? (
                          <FontAwesomeIcon icon={Icon} className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/60">
            <p>(c) 2026 The Native Place Shirdi. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Open WhatsApp chat"
        onClick={() => setWhatsappOpen(true)}
        className="fixed bottom-10 right-5 z-[210] inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          className="h-7 w-7"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </button>

      <WhatsAppPopup open={whatsappOpen} onClose={() => setWhatsappOpen(false)} />
    </>
  );
}
