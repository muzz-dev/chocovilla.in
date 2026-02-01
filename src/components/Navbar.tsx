"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems } = useCart();

  // Helper function to check if link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gradient-to-r from-[#3d2817] via-[#5C4A2F] to-[#3d2817] text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-primary-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image 
                src="/logo.svg" 
                alt="ChocoVilla Logo" 
                width={56} 
                height={56}
                className="h-14 w-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                priority
              />
              {/* Glow effect on logo hover */}
              <div className="absolute inset-0 bg-primary-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-yellow-300 to-primary-gold tracking-wide">
                ChocoVilla
              </span>
              {/* Elegant underline */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-60"></div>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/products' },
              { name: 'About Us', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-5 py-2 text-base font-medium tracking-wide transition-all duration-400 group ${
                  isActive(link.path) 
                    ? 'text-primary-gold' 
                    : 'text-white hover:text-primary-gold'
                }`}
              >
                {/* Link text */}
                <span className="relative z-10">{link.name}</span>
                
                {/* Animated underline */}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-gold to-yellow-400 transform origin-left transition-transform duration-400 ${
                  isActive(link.path) 
                    ? 'scale-x-100' 
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
                
                {/* Hover glow effect */}
                <span className="absolute inset-0 bg-primary-gold/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="ml-4 p-2.5 rounded-full bg-primary-gold/10 text-primary-gold hover:bg-primary-gold hover:text-primary-dark transition-all duration-400 transform hover:scale-110 group relative"
              aria-label="View shopping cart"
              title="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {/* Cart badge */}
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {getTotalItems() > 99 ? '99+' : getTotalItems()}
                </span>
              )}
              {/* Glow effect on hover */}
              <span className="absolute inset-0 bg-primary-gold/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
            </Link>

            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/chocovilla.in"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 p-2.5 rounded-full bg-primary-gold/10 text-primary-gold hover:bg-primary-gold hover:text-primary-dark transition-all duration-400 transform hover:scale-110 group relative"
              aria-label="Follow ChocoVilla on Instagram"
              title="Follow ChocoVilla on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {/* Glow effect on hover */}
              <span className="absolute inset-0 bg-primary-gold/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative focus:outline-none p-2 rounded-lg hover:bg-primary-gold/10 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              {/* Hamburger icon with animation */}
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with slide-in animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gradient-to-b from-[#3d2817] to-[#2a1810] border-t border-primary-gold/20 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Products', path: '/products' },
              { name: 'Contact', path: '/contact' }
            ].map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${
                  isActive(link.path)
                    ? 'bg-primary-gold/20 text-primary-gold border-l-4 border-primary-gold'
                    : 'text-white hover:bg-primary-gold/10 hover:text-primary-gold border-l-4 border-transparent'
                }`}
                onClick={() => setIsOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                }}
              >
                <span className="font-medium text-base tracking-wide">{link.name}</span>
              </Link>
            ))}

            {/* Mobile Cart Link */}
            <Link
              href="/cart"
              className="block px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 text-white hover:bg-primary-gold/10 hover:text-primary-gold border-l-4 border-transparent"
              onClick={() => setIsOpen(false)}
              style={{
                animationDelay: '200ms',
                animation: isOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
              }}
            >
              <span className="font-medium text-base tracking-wide flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Cart {getTotalItems() > 0 && `(${getTotalItems()})`}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}
