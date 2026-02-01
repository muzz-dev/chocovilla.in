import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ChocoVilla - Premium Artisan Chocolates",
  description: "Indulge in the finest handcrafted chocolates. ChocoVilla offers premium quality chocolates made with the finest ingredients and traditional craftsmanship.",
  keywords: ["chocolate", "premium chocolate", "artisan chocolate", "luxury chocolate", "handcrafted chocolate"],
  authors: [{ name: "ChocoVilla" }],
  openGraph: {
    title: "ChocoVilla - Premium Artisan Chocolates",
    description: "Indulge in the finest handcrafted chocolates",
    type: "website",
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
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
