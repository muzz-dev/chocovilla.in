import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import { getFeaturedProducts, getTestimonialsFromSheet, getStatisticsFromSheet, Product, Testimonial, Statistics } from "@/lib/googleSheets";

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
    "premium chocolates in Surat"
  ],
  openGraph: {
    title: "ChocoVilla - Premium, Imported & International Chocolates",
    description: "Shop premium, imported and international chocolates, luxury gift hampers and best sellers at ChocoVilla. Order chocolates easily on WhatsApp.",
    type: "website",
    locale: "en_IN",
    siteName: "ChocoVilla",
  },
};

export default async function Home() {
  // Fetch featured products from Google Sheets (server-side)
  let featuredProducts: Product[];
  
  try {
    featuredProducts = await getFeaturedProducts();
  } catch (err) {
    console.error("Failed to load featured products:", err);
    featuredProducts = [];
  }

  // Fetch testimonials from Google Sheets (server-side)
  let testimonials: Testimonial[];
  
  try {
    testimonials = await getTestimonialsFromSheet();
  } catch (err) {
    console.error("Failed to load testimonials:", err);
    testimonials = [];
  }

  // Fetch statistics from Google Sheets (server-side)
  let statistics: Statistics;
  
  try {
    statistics = await getStatisticsFromSheet();
  } catch (err) {
    console.error("Failed to load statistics:", err);
    // Fallback to default values
    statistics = {
      happyCustomers: 1000,
      totalOrders: 5000,
      citiesServed: 40
    };
  }

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "ChocoVilla",
    "description": "Premium, imported and international chocolate online store",
    "url": "https://chocovilla.in",
    "logo": "https://chocovilla.in/logo.svg",
    "image": "https://chocovilla.in/logo.svg",
    "priceRange": "₹₹-₹₹₹",
    "telephone": "+919825947680",
    "email": "info.chocovilla@gmail.com",
    "founder": {
      "@type": "Person",
      "name": "Aaishama Muzammil Nagariya"
    },
    "keywords": "premium chocolates, imported chocolates, international chocolates, luxury chocolates, chocolate gift hampers, buy imported chocolates online, order premium chocolates online",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "sameAs": [
      "https://wa.me/919825947680"
    ]
  };

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-brown via-primary-dark to-primary-brown text-white py-32 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary-gold/30 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-primary-gold/20 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-primary-gold/25 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-wide animate-fade-in leading-tight">
            Premium Imported & International Chocolates
          </h1>
          <p className="text-lg md:text-xl text-primary-beige mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Indulge in the finest luxury chocolate gift hampers from renowned international brands.
            Perfect for special occasions and those who appreciate premium chocolate craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/products">
              <Button variant="primary" className="text-lg px-8 py-4">Explore Collection</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" className="text-lg px-8 py-4 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-brown">Contact Us</Button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-cream to-transparent"></div>
      </section>

      {/* Exclusive Instagram Evening Offers */}
      <section className="py-12 px-4 bg-primary-cream">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-brown to-primary-dark rounded-2xl p-6 md:p-10 text-center text-white shadow-2xl border border-primary-gold/20">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <svg className="w-7 h-7 text-primary-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-gold">
                  Exclusive Instagram Evening Offers
                </h2>
              </div>

              {/* Time-based status badge */}
              <div className="mb-6">
                {(() => {
                  const now = new Date();
                  const currentHour = now.getHours();
                  const isOfferLive = currentHour >= 18 && currentHour < 21; // 6 PM to 9 PM

                  return (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      isOfferLive
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-primary-gold/10 text-primary-gold border border-primary-gold/30'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${isOfferLive ? 'bg-green-500' : 'bg-primary-gold'}`}></div>
                      {isOfferLive ? 'Offer Live Now' : 'Next Offer at 6 PM'}
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-primary-cream leading-relaxed">
                Special chocolate deals go live daily from{" "}
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary-gold to-yellow-500 text-primary-brown font-bold text-xl md:text-2xl rounded-full shadow-lg border-2 border-primary-gold/50 transform hover:scale-105 transition-all duration-300">
                  6 PM – 9 PM
                </span>{" "}
                on Instagram.
              </p>

              <p className="text-base md:text-lg text-primary-beige leading-relaxed max-w-2xl mx-auto">
                Offers are valid only for orders placed within the live offer window.
              </p>

              <div className="pt-6">
                <a
                  href="https://www.instagram.com/chocovilla.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary-gold text-primary-brown font-bold text-lg rounded-xl hover:bg-yellow-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-primary-gold"
                  aria-label="Follow ChocoVilla on Instagram for exclusive evening offers"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow @chocovilla.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Premium Collection (Top Products) */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
              Premium Chocolate <span className="text-gradient">Collection</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our finest selection of imported chocolates, luxury chocolate gift boxes, and premium chocolate brands
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center">
                <Link href="/products">
                  <Button variant="primary">View All Products</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">
                Loading our delicious chocolate collection...
              </p>
              <Link href="/products">
                <Button variant="primary">View All Products</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Buy From ChocoVilla (Trust Section) */}
      <section className="py-16 px-4 bg-primary-cream">
        <WhyChooseUsSection
          happyCustomers={statistics.happyCustomers}
          citiesServed={statistics.citiesServed}
        />
      </section>

      {/* Our Journey So Far (Statistics Section) */}
      <section className="py-16 px-4 bg-primary-cream">
        <StatsSection />
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <Testimonials testimonials={testimonials} />
      </section>

      {/* Short About / SEO Section */}
      <section className="py-16 px-4 bg-primary-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-brown mb-8">
            About ChocoVilla
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              At ChocoVilla, we curate the finest selection of premium imported and international chocolates from renowned global brands. Our collection features luxury chocolate gift hampers perfect for special occasions, celebrations, and meaningful gifting experiences.
            </p>
            <p>
              Loved by customers in Surat, Mumbai, Hyderabad and 30+ cities across India, we deliver fresh, authentic premium chocolates directly to your doorstep. Experience the art of chocolate craftsmanship with our carefully selected range of dark, milk, and white chocolate varieties.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call-To-Action (WhatsApp Order) */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-brown to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Order Premium <span className="text-gradient">Chocolates</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Order luxury chocolate gift hampers and imported chocolates online. Get fresh, authentic premium chocolates delivered to your doorstep via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://wa.me/919825947680?text=Hello%20ChocoVilla%2C%20I%20would%20like%20to%20place%20an%20order."
              variant="primary"
            >
              Order on WhatsApp
            </Button>
            <Link href="/products">
              <Button variant="secondary">Browse Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
