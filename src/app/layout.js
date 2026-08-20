import { Allura, Cormorant_Garamond, DM_Sans, Montserrat } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import AOSProvider from "./components/AOSProvider";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export const metadata = {
  title: "The Native Place Shirdi | The Boutique Nature Resort",
  description:
    "Experience nature, comfort and tranquility at The Native Place.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${subheadingFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AOSProvider />
        {children}
      </body>
    </html>
  );
}
