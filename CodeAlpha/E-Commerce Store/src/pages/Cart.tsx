import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="h-12 w-12 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our collection to find something you like.</p>
        <Link 
          to="/products" 
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all inline-block shadow-xl hover:shadow-indigo-500/25"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase">{item.category}</span>
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-indigo-600 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-indigo-600 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{cartTotal > 100 ? 'Free' : '$15.00'}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (Estimated)</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>${(cartTotal + (cartTotal > 100 ? 0 : 15) + (cartTotal * 0.08)).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="h-5 w-5" />
            </button>
            
            <div className="mt-6 flex flex-col gap-3">
               <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="h-1 w-1 bg-green-500 rounded-full"></div>
                Secure SSL encrypted payment
              </div>
               <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="h-1 w-1 bg-green-500 rounded-full"></div>
                30-day money back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
