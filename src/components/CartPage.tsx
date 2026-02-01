'use client';

import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import Image from 'next/image';
import PromoCodeInput from '@/components/PromoCodeInput';

export default function CartPage() {
  const {
    items,
    appliedPromo,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getSubtotal,
    getDiscount,
    getTotalPrice,
    clearCart
  } = useCart();
  const { addToast } = useToast();

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';

    let message = 'Hello ChocoVilla 👋\nI would like to place an order:\n\n';

    items.forEach((item) => {
      message += `${item.name} × ${item.quantity} – ₹${item.ourPrice * item.quantity}\n`;
    });

    const subtotal = getSubtotal();
    const discount = getDiscount();
    const finalTotal = getTotalPrice();

    message += `\nSubtotal: ₹${subtotal}`;

    if (appliedPromo) {
      message += `\nPromo Code: ${appliedPromo.code} (${appliedPromo.discountPercent}% OFF)`;
      message += `\nDiscount: – ₹${discount}`;
    }

    message += `\nFinal Total: ₹${finalTotal}\n\nPlease confirm availability and delivery details.`;

    return message;
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919825947680?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear cart after ordering (optional - you might want to keep it until confirmed)
    // clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some delicious chocolates to get started!</p>
            <Link
              href="/products"
              className="inline-block bg-primary-gold text-primary-dark font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-brown mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary-brown">{item.name}</h3>
                  <p className="text-primary-gold font-bold">₹{item.ourPrice} each</p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-center min-w-[3rem]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[4rem]">
                    <p className="font-bold text-primary-brown">₹{item.ourPrice * item.quantity}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      addToast('Item removed from cart', 'info', 2000);
                    }}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary-brown mb-4">Promo Code</h2>
          <PromoCodeInput />
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-brown mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal ({getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}):</span>
              <span>₹{getSubtotal().toLocaleString()}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-green-600">
                <span>Promo Code ({appliedPromo.code} - {appliedPromo.discountPercent}% OFF):</span>
                <span>– ₹{getDiscount().toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Final Total:</span>
              <span className="text-primary-gold">₹{getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <Link
              href="/products"
              className="px-6 py-3 border border-primary-brown text-primary-brown rounded-full hover:bg-primary-brown hover:text-white transition-all duration-300"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => {
                clearCart();
                addToast('Cart cleared successfully', 'info', 2000);
              }}
              className="px-6 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Clear Cart
            </button>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Place Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}