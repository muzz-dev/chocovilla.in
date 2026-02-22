"use client";

export default function InstagramOffersSection() {
  return (
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
  );
}