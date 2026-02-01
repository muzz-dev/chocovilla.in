import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import { getFeaturedProducts, getTestimonialsFromSheet, Product, Testimonial } from "@/lib/googleSheets";

export const metadata: Metadata = {
  title: "Premium Chocolate Online | Imported & International Chocolates - ChocoVilla",
  description: "Shop premium chocolate, imported chocolate, and international chocolate online at ChocoVilla. Luxury handcrafted chocolates from around the world. Free delivery on orders via WhatsApp.",
  keywords: [
    "premium chocolate online",
    "imported chocolate",
    "international chocolate",
    "buy premium chocolate",
    "luxury chocolate India",
    "best premium chocolate brands",
    "imported chocolate online India",
    "international chocolate brands online"
  ],
  openGraph: {
    title: "Premium Chocolate | Imported & International Chocolates - ChocoVilla",
    description: "Shop premium, imported & international chocolates online. Handcrafted luxury chocolates delivered fresh.",
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
    "keywords": "premium chocolate, imported chocolate, international chocolate, luxury chocolate, artisan chocolate",
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
      <section className="relative bg-gradient-to-br from-primary-brown via-primary-dark to-black text-white py-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Premium, Imported & <span className="text-gradient">International Chocolates</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Shop the finest premium chocolate, imported chocolates, and international chocolate brands online. Handcrafted luxury chocolates from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="primary">View Products</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Brand Introduction */}
      <section className="py-20 px-4 bg-primary-cream">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-brown mb-6">
              Welcome to <span className="text-gradient">ChocoVilla</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At ChocoVilla, we believe that chocolate is more than just a sweet treat—it&apos;s an experience, 
              a moment of pure indulgence. Discover our curated collection of premium chocolate, imported chocolates 
              from renowned international brands, and luxury artisan chocolates handcrafted by master chocolatiers 
              using only the finest ingredients sourced from around the world.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From rich dark premium chocolates to creamy imported milk varieties and exotic international flavors, 
              every bite tells a story of tradition, quality, and passion. Experience the art of premium chocolate 
              making with ChocoVilla—your destination for luxury chocolates online.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most loved chocolate creations
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
      
      {/* Stats Section */}
      <StatsSection />

      {/* Customer Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-brown to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience <span className="text-gradient">Premium Chocolate</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Order now via WhatsApp and get your chocolates delivered fresh to your doorstep
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
