import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Playfair_Display } from "next/font/google";
import { Grain } from "@/components/ui/Grain";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], display: "swap", variable: "--font-caveat" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nans-one.vercel.app";
const DESCRIPTION = "A Diwali letter, lit one diya at a time.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "For Nans", template: "%s · For Nans" },
  description: DESCRIPTION,
  keywords: [
    "For Nans",
    "Nans",
    "Anku",
    "Diwali letter",
    "Diwali wishes",
    "digital love letter",
  ],
  authors: [{ name: "Anku" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "For Nans",
    description: DESCRIPTION,
    url: "/",
    siteName: "For Nans",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Nans",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = { themeColor: "#FFF3DC" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="bg-paper font-sans text-ink">
        {children}
        <Grain />
      </body>
    </html>
  );
}
