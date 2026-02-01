"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

/**
 * CategoryFilter component for filtering products by category
 * Shows pill-style buttons for each category with "All" option
 */
export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  // Add "All" to the beginning of categories
  const allCategories = ['All', ...categories];

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3">
        {allCategories.map((category) => {
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'bg-primary-gold text-primary-dark shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-gold hover:text-primary-brown'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
