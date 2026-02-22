import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import PageTransition from "@/components/PageTransition";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/ToastContainer";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ChocoVilla - Premium, Imported & International Chocolates",
  description: "Shop premium, imported and international chocolates, luxury gift hampers and best sellers at ChocoVilla. Order chocolates easily on WhatsApp.",
  keywords: [
    "premium chocolates",
    "imported chocolates",
    "international chocolates",
    "luxury chocolates",
    "chocolate gift hampers",
    "buy imported chocolates online",
    "order premium chocolates online",
    "luxury chocolate gift boxes",
    "best chocolates for gifting",
    "premium chocolates in India",
    "premium chocolates in Surat",
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
    title: "ChocoVilla - Premium, Imported & International Chocolates",
    description: "Shop premium, imported and international chocolates including gift hampers and best sellers. Order directly on WhatsApp from ChocoVilla.",
    type: "website",
    locale: "en_IN",
    siteName: "ChocoVilla",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChocoVilla - Premium, Imported & International Chocolates",
    description: "Shop premium, imported and international chocolates, luxury gift hampers and best sellers at ChocoVilla. Order chocolates easily on WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${cinzel.variable} antialiased font-sans`}>
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <FloatingSocialBar />
            <ToastContainer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
