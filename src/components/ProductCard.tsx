"use client";

import Image from "next/image";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  marketPrice: number;
  ourPrice: number;
  imageUrl: string;
  category: string;
  bestSeller: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // WhatsApp message with product name and our price
  const whatsappMessage = `Hello ChocoVilla, I am interested in ${product.name} priced at ₹${product.ourPrice}. Please share details.`;
  const whatsappUrl = `https://wa.me/919825947680?text=${encodeURIComponent(whatsappMessage)}`;

  // Fallback image if product image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&h=600&fit=crop";
  const displayImage = product.imageUrl && !imageError ? product.imageUrl : fallbackImage;

  return (
    <>
      <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Product Image */}
        <div 
          className="relative h-64 bg-gray-200 overflow-hidden cursor-pointer"
          onClick={() => setIsImageViewerOpen(true)}
          title="Click to view full image"
        >
          {/* Best Seller Badge */}
          {product.bestSeller && (
            <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary-gold to-yellow-500 text-primary-dark px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-sm font-bold animate-pulse">
              <span className="text-base">⭐</span>
              <span>Best Seller</span>
            </div>
          )}

          {product.imageUrl && !imageError ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <Image
              src={fallbackImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Zoom indicator */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary-brown mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          {/* Pricing Section */}
          <div className="mb-4">
            {product.marketPrice > 0 && (
              <div className="text-sm text-gray-400 line-through mb-1">
                ₹{product.marketPrice}
              </div>
            )}
            <div className="text-2xl font-bold text-primary-gold">
              ₹{product.ourPrice}
            </div>
            {product.marketPrice > 0 && product.marketPrice > product.ourPrice && (
              <div className="text-sm text-green-600 font-semibold mt-1">
                Save ₹{(product.marketPrice - product.ourPrice).toFixed(0)}
              </div>
            )}
          </div>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-primary-gold text-primary-dark font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300 hover:scale-105 transform shadow-md"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isImageViewerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsImageViewerOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsImageViewerOpen(false)}
            aria-label="Close image viewer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container */}
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            
            {/* Product name overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white text-2xl font-bold">{product.name}</h3>
              <p className="text-gray-300 text-sm mt-1">Click anywhere to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
