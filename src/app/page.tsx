import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, Product } from "@/lib/googleSheets";

export default async function Home() {
  // Fetch featured products from Google Sheets (server-side)
  let featuredProducts: Product[];
  
  try {
    featuredProducts = await getFeaturedProducts();
  } catch (err) {
    console.error("Failed to load featured products:", err);
    featuredProducts = [];
  }
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-brown via-primary-dark to-black text-white py-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Indulge in <span className="text-gradient">Premium Chocolates</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the finest artisan chocolates, handcrafted with passion and the world's best ingredients
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
              a moment of pure indulgence. Each piece is meticulously handcrafted by our master chocolatiers 
              using only the finest ingredients sourced from around the world.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From rich dark chocolates to creamy milk varieties, every bite tells a story of tradition, 
              quality, and passion. Discover the art of premium chocolate making with ChocoVilla.
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
