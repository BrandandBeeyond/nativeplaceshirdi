// components/Navbar.jsx

"use client";

import { ChevronDown, Menu, PhoneCallIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Villas & cottages", dropdown: true },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [villasMenuOpen, setVillasMenuOpen] = useState(false);
    const villasMenuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (villasMenuRef.current && !villasMenuRef.current.contains(event.target)) {
                setVillasMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <header className="relative z-50 w-full border-t border-[#07552F]/20 bg-[#FCFBF5]">
            <nav className="relative z-50 mx-auto flex h-[88px] max-w-[1400px] items-center overflow-visible px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="block">
                        <Image
                            src="/images/logonativeplaceshirdi.png"
                            alt="The Native Place"
                            width={240}
                            height={130}
                            className="h-auto w-[190px] object-contain sm:w-[220px] lg:w-[280px]"
                            priority
                        />
                    </Link>
                </div>

                {/* Center Navigation */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
                    {navLinks.map((link) =>
                        link.dropdown ? (
                            <div
                                key={link.name}
                                ref={villasMenuRef}
                                className="relative"
                                onMouseEnter={() => setVillasMenuOpen(true)}
                                onMouseLeave={() => setVillasMenuOpen(false)}
                            >
                                <button
                                    type="button"
                                    onClick={() => setVillasMenuOpen((open) => !open)}
                                    className="group inline-flex items-center gap-1 whitespace-nowrap text-[16px] font-medium tracking-[0.02em] text-[#18352A] transition-colors duration-300 hover:text-[#07552F]"
                                    aria-expanded={villasMenuOpen}
                                    aria-haspopup="menu"
                                >
                                    {link.name}
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-300 ${villasMenuOpen ? "rotate-180" : ""}`}
                                    />
                                    <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#B8DC4F] transition-all duration-300 group-hover:w-full" />
                                </button>

                                <div
                                    className={`absolute left-1/2 top-[calc(100%+0.85rem)] z-[70] w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#05391f]/90 p-2 shadow-[0_22px_48px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-200 ${
                                        villasMenuOpen
                                            ? "pointer-events-auto translate-y-0 opacity-100"
                                            : "pointer-events-none -translate-y-2 opacity-0"
                                    }`}
                                >
                                    <Link
                                        href="/villas"
                                        onClick={() => setVillasMenuOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-white/10 hover:text-white"
                                    >
                                        Villa
                                    </Link>
                                    <Link
                                        href="/cottages"
                                        onClick={() => setVillasMenuOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-white/10 hover:text-white"
                                    >
                                        Cottages
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group relative whitespace-nowrap text-[16px] font-medium tracking-[0.02em] text-[#18352A] transition-colors duration-300 hover:text-[#07552F]"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#B8DC4F] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ),
                    )}
                </div>

                {/* Call Us */}
                <div className="ml-auto hidden items-center lg:flex">
                    <a
                        href="tel:+919999999999"
                        className="rounded-full bg-[#07552F] px-8 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#B8DC4F] hover:text-[#18352A]"
                    >
                        <div className="group flex flex-row items-center gap-2">
                            <PhoneCallIcon
                                size={18}
                                className="text-[#B8DC4F] transition-colors duration-300 group-hover:text-white"
                            />

                            <span className="ml-2 text-white transition-colors duration-300 hover:text-[white]">
                                Call Us
                            </span>
                        </div>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#07552F]/15 bg-white text-[#07552F] transition-colors duration-300 hover:bg-[#07552F] hover:text-white lg:hidden"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

            </nav>

            {/* Mobile Overlay Menu */}
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-out ${
                    menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
            >
                <div
                    className={`absolute inset-0 bg-[#05391f]/70 backdrop-blur-sm transition-opacity duration-500 ease-out ${
                        menuOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />

                <div
                    className={`absolute right-3 top-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] origin-top-right overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#05391f]/92 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out sm:right-6 sm:top-6 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-3rem)] ${
                        menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-[#B8DC4F]/10 blur-3xl" />

                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setMenuOpen(false)}
                        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:right-6 sm:top-6"
                    >
                        <X size={22} />
                    </button>

                    <div className="flex h-full flex-col items-center justify-center px-6">
                        <div className="flex flex-col items-center gap-6 text-center">
                            {navLinks.map((link) =>
                                link.dropdown ? (
                                    <div key={link.name} className="flex flex-col items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setVillasMenuOpen((open) => !open)}
                                            className="inline-flex items-center gap-2 text-2xl font-semibold tracking-wide text-white transition-colors duration-300 hover:text-[#B8DC4F]"
                                        >
                                            {link.name}
                                            <ChevronDown
                                                size={18}
                                                className={`transition-transform duration-300 ${villasMenuOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        <div
                                            className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-300 ${
                                                villasMenuOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <Link
                                                href="/villas"
                                                onClick={() => {
                                                  setMenuOpen(false);
                                                  setVillasMenuOpen(false);
                                                }}
                                                className="text-xl font-medium tracking-wide text-white/90 transition-colors duration-300 hover:text-[#B8DC4F]"
                                            >
                                                Villa
                                            </Link>
                                            <Link
                                                href="/cottages"
                                                onClick={() => {
                                                  setMenuOpen(false);
                                                  setVillasMenuOpen(false);
                                                }}
                                                className="text-xl font-medium tracking-wide text-white/90 transition-colors duration-300 hover:text-[#B8DC4F]"
                                            >
                                                Cottages
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-2xl font-semibold tracking-wide text-white transition-colors duration-300 hover:text-[#B8DC4F]"
                                    >
                                        {link.name}
                                    </Link>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
