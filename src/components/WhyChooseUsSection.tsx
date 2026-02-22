interface WhyChooseUsSectionProps {
  happyCustomers?: number;
  citiesServed?: number;
}

export default function WhyChooseUsSection({ happyCustomers = 1000, citiesServed = 40 }: WhyChooseUsSectionProps) {
  const trustPoints = [
    {
      icon: (
        <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Authenticity badge">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "100% Original Imported Chocolates",
      description: "We source authentic international chocolates directly from trusted suppliers."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Freshness guarantee">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fresh Stock",
      description: "Regularly updated inventory to ensure freshness and quality."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Secure packaging">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Secure Packaging",
      description: "Carefully packed to prevent damage and preserve taste."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Fast delivery">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast Delivery",
      description: "Quick dispatch and reliable delivery across India."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Best price guarantee">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Best Price Guarantee",
      description: "Competitive pricing on premium imported chocolates."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Customer trust">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: `Trusted by ${happyCustomers.toLocaleString()}+ Happy Customers`,
      description: `Loved and recommended by customers across ${citiesServed}+ cities in India.`
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary-brown via-primary-dark to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Buy From <span className="text-gradient">ChocoVilla</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the difference with our commitment to quality, authenticity, and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-white/20"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-white">
                {point.title}
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}