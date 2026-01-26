import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FontLoader from "@/components/FontLoader";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Lakshmi Mulgund | Visual Creative",
  description: "Visual creative focusing on stories of catharsis and personal identity through movement",
  openGraph: {
    title: "Lakshmi Mulgund | Visual Creative",
    description: "Visual creative focusing on stories of catharsis and personal identity through movement",
    type: "website",
  },
  other: {
    // Adobe Fonts - Aktiv Grotesk Extended Semibold
    // If using Adobe Fonts, uncomment and add your kit ID:
    // 'font-link': 'https://use.typekit.net/YOUR_KIT_ID.css',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FontLoader />
        <Navbar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
