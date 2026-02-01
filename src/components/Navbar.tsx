"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary-brown text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">ChocoVilla</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="hover:text-primary-gold transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-primary-gold transition-colors duration-300 font-medium"
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="hover:text-primary-gold transition-colors duration-300 font-medium"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary-gold transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-primary-brown hover:text-primary-gold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md hover:bg-primary-brown hover:text-primary-gold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="block px-3 py-2 rounded-md hover:bg-primary-brown hover:text-primary-gold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md hover:bg-primary-brown hover:text-primary-gold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
