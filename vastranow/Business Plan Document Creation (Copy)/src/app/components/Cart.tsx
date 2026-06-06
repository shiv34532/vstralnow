import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from './types';

interface CartProps {
  items: CartItem[];
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
}

export default function Cart({ items, updateQuantity, removeFromCart }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="bg-white border p-4 flex gap-4"
            >
              {/* Product Image */}
              <Link
                to={`/product/${item.id}`}
                className="w-24 h-32 flex-shrink-0 overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:opacity-75 transition-opacity"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.id}`}
                  className="font-semibold hover:text-[#D4AF37] transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Size: {item.selectedSize} | Color: {item.selectedColor}
                </p>
                <p className="text-sm text-gray-600">
                  {item.material}
                </p>
                <p className="font-bold mt-2">₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity - 1
                        )
                      }
                      className="p-2 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity + 1
                        )
                      }
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.selectedSize, item.selectedColor)
                    }
                    className="text-red-600 hover:text-red-700 flex items-center text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              {subtotal < 999 && (
                <p className="text-xs text-gray-500">
                  Add ₹{999 - subtotal} more for free shipping
                </p>
              )}
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors mb-3">
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="block text-center text-sm text-[#D4AF37] hover:underline"
            >
              Continue Shopping
            </Link>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure payment</span>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Fast delivery (3-7 days)</span>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% authentic products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
