import { Allura, Anton, Cormorant_Garamond, DM_Sans, Montserrat } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import AOSProvider from "./components/AOSProvider";
import LenisProvider from "./components/LenisProvider";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const antonFont = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const subheadingFont = Montserrat({
  variable: "--font-subheading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const scriptFont = Allura({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thenativeplaceshirdi.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Native Place Shirdi",
    template: "%s | The Native Place Shirdi",
  },
  description:
    "The Native Place Shirdi is a nature resort near Shirdi with villas, cottages, swimming pool stays, peaceful greenery and family-friendly experiences.",
  keywords: [
    "The Native Place Shirdi",
    "resort near Shirdi",
    "villas near Shirdi",
    "cottages near Shirdi",
    "swimming pool resort Shirdi",
    "nature resort near Shirdi",
    "family resort Shirdi",
    "luxury stay in Shirdi",
  ],
  authors: [{ name: "The Native Place Shirdi" }],
  creator: "The Native Place Shirdi",
  applicationName: "The Native Place Shirdi",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "The Native Place Shirdi",
    title: "The Native Place Shirdi",
    description:
      "Nature resort near Shirdi with villas, cottages, swimming pool stays and peaceful greenery.",
    images: [
      {
        url: "/images/favicon.png",
        width: 512,
        height: 512,
        alt: "The Native Place Shirdi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Native Place Shirdi",
    description:
      "Nature resort near Shirdi with villas, cottages, swimming pool stays and peaceful greenery.",
    images: ["/images/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${antonFont.variable} ${subheadingFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AOSProvider />
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
