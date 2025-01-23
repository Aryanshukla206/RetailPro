import React from 'react';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function POS() {
  const { products, cart, addToCart, removeFromCart, updateCartItemQuantity } = useStore();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <div className="grid grid-cols-12 gap-6 py-6">
      {/* Products Section */}
      <div className="col-span-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Products</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="mt-2 text-lg font-medium text-indigo-600">
                  {formatPrice(product.price)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="col-span-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Cart</h2>
          </div>
          <div className="p-4">
            {cart?.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item.productId, item.quantity - 1)
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span className="text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item.productId, item.quantity + 1)
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {cart && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">
                    {formatPrice(cart.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">GST</span>
                  <span className="text-gray-900">
                    {formatPrice(cart.totalGST)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-medium mt-4">
                  <span>Total</span>
                  <span>{formatPrice(cart.grandTotal)}</span>
                </div>
                <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}