import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import InstagramOffersSection from "@/components/InstagramOffersSection";
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
        <InstagramOffersSection />
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
