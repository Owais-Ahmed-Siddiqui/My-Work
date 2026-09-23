import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartTotal + (cartTotal > 100 ? 0 : 15) + (cartTotal * 0.08);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-gray-50 max-w-lg mx-auto"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase, {user?.name || 'Guest'}! Your order #ORD-{Math.floor(Math.random() * 1000000)} has been placed successfully and will be shipped shortly.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Section */}
          <div className={`bg-white p-8 rounded-3xl shadow-sm border ${step === 1 ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-gray-50'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input type="text" defaultValue={user?.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue={user?.email} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="123 Street Name" />
              </div>
            </div>
            
            {step === 1 && (
              <button 
                onClick={() => setStep(2)}
                className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
              >
                Continue to Payment
              </button>
            )}
          </div>

          {/* Payment Section */}
          <div className={`bg-white p-8 rounded-3xl shadow-sm border ${step === 2 ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-gray-50'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
            </div>
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="p-4 border-2 border-indigo-600 bg-indigo-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6 text-indigo-600" />
                    <span className="font-bold text-gray-900">Credit / Debit Card</span>
                  </div>
                  <div className="h-5 w-5 rounded-full border-4 border-indigo-600 bg-white"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">CVC</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="000" />
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="max-h-64 overflow-y-auto mb-6 space-y-4 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    <p className="font-bold text-indigo-600 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{cartTotal > 100 ? 'Free' : '$15.00'}</span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
