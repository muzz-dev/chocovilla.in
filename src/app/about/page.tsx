import type { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "About Us - ChocoVilla",
  description: "Learn about ChocoVilla's story, mission, and commitment to crafting premium artisan chocolates with the finest ingredients.",
};

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-brown via-primary-dark to-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Story</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A journey of passion, craftsmanship, and the pursuit of chocolate perfection
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary-brown mb-6">
                The Birth of <span className="text-gradient">ChocoVilla</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                ChocoVilla was born from a simple yet powerful dream: to create chocolates that 
                transcend ordinary taste and become unforgettable experiences. Founded by master 
                chocolatiers with decades of combined expertise, we set out to redefine what 
                premium chocolate means.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Every piece that leaves our atelier is a testament to our unwavering commitment 
                to quality, innovation, and the timeless art of chocolate making. We don&apos;t just 
                make chocolates—we craft edible memories.
              </p>
            </div>
            <div className="bg-primary-cream rounded-lg p-8 shadow-xl">
              <div className="space-y-6">
                <div className="border-l-4 border-primary-gold pl-6">
                  <h3 className="text-2xl font-bold text-primary-brown mb-2">Our Vision</h3>
                  <p className="text-gray-700">
                    To be recognized globally as the premier destination for handcrafted, 
                    luxury chocolates that celebrate tradition and innovation.
                  </p>
                </div>
                <div className="border-l-4 border-primary-gold pl-6">
                  <h3 className="text-2xl font-bold text-primary-brown mb-2">Our Mission</h3>
                  <p className="text-gray-700">
                    To craft exceptional chocolates using only the finest ingredients, 
                    sustainable practices, and unparalleled artisanal expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Quality */}
      <section className="py-20 px-4 bg-primary-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
              Premium <span className="text-gradient">Quality</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our chocolate making process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality Card 1 */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary-brown text-center mb-4">
                Finest Ingredients
              </h3>
              <p className="text-gray-700 text-center">
                We source premium cocoa beans from the world's best plantations, ensuring 
                rich flavor and exceptional quality in every bite.
              </p>
            </div>

            {/* Quality Card 2 */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary-brown text-center mb-4">
                Artisan Craftsmanship
              </h3>
              <p className="text-gray-700 text-center">
                Each chocolate is meticulously handcrafted by our master chocolatiers, 
                blending traditional techniques with modern innovation.
              </p>
            </div>

            {/* Quality Card 3 */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary-brown text-center mb-4">
                Made with Love
              </h3>
              <p className="text-gray-700 text-center">
                Every creation is infused with passion and dedication, transforming 
                simple ingredients into extraordinary chocolate experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-cream rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary-brown mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We are committed to ethical sourcing and sustainable practices, working directly 
                with cocoa farmers to ensure fair trade and environmental responsibility.
              </p>
            </div>
            <div className="bg-primary-cream rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary-brown mb-4">Innovation</h3>
              <p className="text-gray-700">
                While honoring traditional chocolate-making methods, we continuously explore 
                new flavors and techniques to delight our customers.
              </p>
            </div>
            <div className="bg-primary-cream rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary-brown mb-4">Authenticity</h3>
              <p className="text-gray-700">
                We believe in transparency and authenticity, never compromising on quality or 
                using artificial ingredients in our chocolates.
              </p>
            </div>
            <div className="bg-primary-cream rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary-brown mb-4">Customer Delight</h3>
              <p className="text-gray-700">
                Your satisfaction is our priority. We strive to exceed expectations with every 
                order and create moments of pure joy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-brown to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the <span className="text-gradient">ChocoVilla</span> Difference
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of chocolate lovers who trust us for their sweetest moments
          </p>
          <Button
            href="/products"
            variant="primary"
          >
            Explore Our Chocolates
          </Button>
        </div>
      </section>
    </div>
  );
}
