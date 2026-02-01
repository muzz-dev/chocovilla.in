"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface PromoCodeInputProps {
  className?: string;
}

export default function PromoCodeInput({ className = "" }: PromoCodeInputProps) {
  const { appliedPromo, applyPromoCode, removePromoCode, getSubtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsLoading(true);
    setError("");

    const result = await applyPromoCode(promoCode.trim());

    setIsLoading(false);

    if (!result.success) {
      setError(result.error || "Failed to apply promo code");
    } else {
      setPromoCode("");
      setError("");
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyPromo();
    }
  };

  if (appliedPromo) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              🎉 {appliedPromo.code}
            </div>
            <div className="text-sm text-green-700">
              {appliedPromo.discountPercent}% OFF - Save ₹{appliedPromo.discount.toLocaleString()}
            </div>
          </div>
          <button
            onClick={handleRemovePromo}
            className="text-green-600 hover:text-green-800 text-sm font-medium underline"
            aria-label="Remove promo code"
          >
            Remove
          </button>
        </div>
        {appliedPromo.description && (
          <p className="text-xs text-green-600 mt-2">{appliedPromo.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex gap-3">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Enter promo code"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent uppercase tracking-wide"
          disabled={isLoading}
          aria-label="Promo code input"
        />
        <button
          onClick={handleApplyPromo}
          disabled={isLoading || !promoCode.trim() || getSubtotal() === 0}
          className="px-6 py-3 bg-primary-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          aria-label="Apply promo code"
        >
          {isLoading ? "Applying..." : "Apply"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {getSubtotal() === 0 && (
        <p className="text-sm text-gray-500">
          Add items to your cart to apply a promo code
        </p>
      )}
    </div>
  );
}