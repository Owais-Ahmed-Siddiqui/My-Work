import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-indigo-600 font-bold underline">
          Back to products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all">
                 <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">{product.category}</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 font-medium">{product.reviews} customer reviews</span>
            </div>
          </div>

          <p className="text-4xl font-bold text-gray-900 mb-8">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-indigo text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-center space-x-6">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center font-bold text-xl hover:text-indigo-600"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-xl hover:text-indigo-600"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="h-6 w-6" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-50 p-3 rounded-full mb-3 text-indigo-600">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-sm font-bold text-gray-900">Free Shipping</span>
              <span className="text-xs text-gray-500 mt-1">On orders over $100</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-50 p-3 rounded-full mb-3 text-green-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-sm font-bold text-gray-900">2 Year Warranty</span>
              <span className="text-xs text-gray-500 mt-1">Full protection</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-50 p-3 rounded-full mb-3 text-orange-600">
                <RotateCcw className="h-6 w-6" />
              </div>
              <span className="text-sm font-bold text-gray-900">Easy Returns</span>
              <span className="text-xs text-gray-500 mt-1">30 days period</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
