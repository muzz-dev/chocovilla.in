import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary-brown via-primary-dark to-primary-brown text-white border-t border-primary-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-serif font-bold text-primary-gold mb-6 tracking-wide">ChocoVilla</h3>
            <p className="text-primary-beige leading-relaxed mb-6">
              Indulging in the finest luxury chocolates from renowned international brands.
              Premium artisan chocolates crafted with passion and the finest ingredients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6 text-primary-gold">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-primary-beige hover:text-primary-gold transition-all duration-300 hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-beige hover:text-primary-gold transition-all duration-300 hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-primary-beige hover:text-primary-gold transition-all duration-300 hover:translate-x-1 inline-block">
                  Premium Collection
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-beige hover:text-primary-gold transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6 text-primary-gold">Connect</h4>
            <ul className="space-y-4 text-primary-beige">
              <li className="flex items-center space-x-3">
                <span className="text-primary-gold">👤</span>
                <span>Aaishama Muzammil Nagariya</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary-gold">📱</span>
                <a href="tel:+919825947680" className="hover:text-primary-gold transition-colors">+91 98259 47680</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary-gold">✉️</span>
                <a href="mailto:info.chocovilla@gmail.com" className="hover:text-primary-gold transition-colors">info.chocovilla@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary-gold">💬</span>
                <a
                  href="https://wa.me/919825947680"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-gold transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-gold/20 mt-12 pt-8 text-center">
          <p className="text-primary-beige text-sm">
            © {currentYear} ChocoVilla. All rights reserved. | Premium Chocolates Crafted with Passion
          </p>
        </div>
      </div>
    </footer>
  );
}
