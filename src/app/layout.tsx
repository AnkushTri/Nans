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

const DESCRIPTION = "A small, slow letter. Best read without hurrying.";

export const metadata: Metadata = {
  title: "For Nans",
  description: DESCRIPTION,
  openGraph: {
    title: "For Nans",
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "For Nans", description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#FBF7F2" };

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
