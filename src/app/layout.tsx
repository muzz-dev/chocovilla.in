import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "ChocoVilla - Premium Chocolate | Imported & International Chocolates Online",
  description: "Buy premium chocolate, imported chocolate, and international chocolate online at ChocoVilla. Handcrafted luxury chocolates with worldwide flavors. Order via WhatsApp for fresh delivery.",
  keywords: [
    "premium chocolate",
    "imported chocolate",
    "international chocolate",
    "luxury chocolate",
    "artisan chocolate",
    "handcrafted chocolate",
    "premium chocolate online",
    "imported chocolate India",
    "international chocolate brands",
    "best premium chocolate",
    "gourmet chocolate",
    "chocolate gift boxes",
    "dark chocolate premium",
    "milk chocolate premium",
    "white chocolate premium"
  ],
  authors: [{ name: "ChocoVilla", url: "https://chocovilla.in" }],
  creator: "ChocoVilla",
  publisher: "ChocoVilla",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "ChocoVilla - Premium Chocolate | Imported & International Chocolates",
    description: "Buy premium chocolate, imported chocolate, and international chocolate online. Handcrafted luxury chocolates delivered fresh.",
    type: "website",
    locale: "en_IN",
    siteName: "ChocoVilla",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChocoVilla - Premium Chocolate | Imported & International Chocolates",
    description: "Buy premium, imported & international chocolates online at ChocoVilla",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <FloatingSocialBar />
      </body>
    </html>
  );
}
