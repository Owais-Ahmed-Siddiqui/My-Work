import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-indigo-600 uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-600">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all active:scale-90"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
