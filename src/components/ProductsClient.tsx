"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

interface Product {
  id: string;
  name: string;
  description: string;
  marketPrice: number;
  ourPrice: number;
  imageUrl: string;
  category: string;
  bestSeller: boolean;
  inStock: boolean;
  limitedStock: boolean;
  displayOrder: number;
  showOnHome: boolean;
}

interface ProductsClientProps {
  initialProducts: Product[];
}

/**
 * Client component for products page with search and filter functionality
 * Receives products from server component and provides instant filtering
 */
export default function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(initialProducts.map(p => p.category));
    return Array.from(uniqueCategories).sort();
  }, [initialProducts]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply search filter (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [initialProducts, searchQuery, selectedCategory]);

  return (
    <div>
      {/* Search and Filter Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search chocolates by name or description..."
          />

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Results Count */}
          <div className="text-center text-gray-600">
            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              <p>
                Showing {filteredProducts.length} of {initialProducts.length} products
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4 bg-primary-cream">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-12 text-center">
              <div className="w-20 h-20 bg-primary-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary-brown mb-4">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No products match "${searchQuery}". Try adjusting your search.`
                  : "No products in this category yet."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-primary-gold text-primary-dark font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
