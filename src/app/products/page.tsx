import type { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";
import { getProductsFromSheet, Product } from "@/lib/googleSheets";

export const metadata: Metadata = {
  title: "Premium Chocolate Products | Imported & International Chocolates - ChocoVilla",
  description: "Browse premium chocolate products including imported chocolates and international chocolate brands. Shop luxury artisan chocolates, dark chocolate, milk chocolate, and gourmet gift boxes. Order online via WhatsApp.",
  keywords: [
    "premium chocolate products",
    "imported chocolate brands",
    "international chocolate collection",
    "luxury chocolate online",
    "premium dark chocolate",
    "premium milk chocolate",
    "imported chocolate India",
    "international gourmet chocolate",
    "premium chocolate gift boxes"
  ],
  openGraph: {
    title: "Premium Chocolate Products | Imported & International Chocolates",
    description: "Browse our collection of premium, imported & international chocolates. Shop luxury chocolates online.",
  },
};

export default async function Products() {
  // Fetch products from Google Sheets (server-side)
  let products: Product[];
  let error: string | null = null;

  try {
    products = await getProductsFromSheet();
  } catch (err) {
    console.error("Failed to load products:", err);
    error = err instanceof Error ? err.message : "Failed to load products";
    products = [];
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-brown via-primary-dark to-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Premium, Imported & <span className="text-gradient">International Chocolates</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse our luxury collection of premium chocolates, imported chocolate brands, and international gourmet chocolates. Search, filter by category, and order instantly via WhatsApp.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Error State */}
      {error && (
        <section className="py-20 px-4 bg-primary-cream">
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-800 mb-2 font-semibold">Failed to Load Products</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <p className="text-gray-600 text-sm">Please check your Google Sheets configuration and try again.</p>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!error && products.length === 0 && (
        <section className="py-20 px-4 bg-primary-cream">
          <div className="max-w-2xl mx-auto bg-white border border-primary-gold rounded-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-primary-brown mb-4">No Products Available</h3>
            <p className="text-gray-600 mb-6">
              We&apos;re updating our collection. Please check back soon!
            </p>
            <a
              href="https://wa.me/919825947680?text=Hello%20ChocoVilla%2C%20I%20would%20like%20to%20know%20about%20available%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-gold text-primary-dark font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </section>
      )}

      {/* Products with Search and Filter */}
      {!error && products.length > 0 && (
        <ProductsClient initialProducts={products} />
      )}

      {/* Info Banner */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary-cream rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-primary-brown mb-4">
              How to Order
            </h3>
            <p className="text-gray-700 mb-4">
              Simply click &quot;Order on WhatsApp&quot; on any product to chat with us. 
              We&apos;ll confirm your order details, arrange payment, and ensure fresh delivery to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-dark font-bold">1</span>
                </div>
                <p className="text-gray-700">Choose your favorite chocolate</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-dark font-bold">2</span>
                </div>
                <p className="text-gray-700">Click "Order Now"</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-dark font-bold">3</span>
                </div>
                <p className="text-gray-700">Chat with us on WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-brown to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Can&apos;t Decide? <span className="text-gradient">We Can Help!</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Chat with our chocolate experts on WhatsApp for personalized recommendations
          </p>
          <a
            href="https://wa.me/919825947680?text=Hello%20ChocoVilla%2C%20I%20need%20help%20choosing%20chocolates."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary-gold text-primary-dark font-semibold px-8 py-4 rounded-full hover:bg-yellow-500 hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
