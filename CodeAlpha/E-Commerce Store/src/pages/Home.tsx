import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-50"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md text-indigo-300 font-semibold text-sm mb-6 border border-indigo-500/30">
              New Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Elevate Your <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Everyday Style</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
              Discover our curated collection of premium essentials designed for modern living. Quality meets aesthetic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                Shop Collection <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/about" 
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Fast Delivery', desc: 'Free shipping on all orders over $100' },
            { icon: Shield, title: 'Secure Payment', desc: '100% secure payment processing' },
            { icon: Truck, title: 'Easy Returns', desc: '30-day money back guarantee' },
          ].map((feature, i) => (
            <div key={i} className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Handpicked items from our latest collection.</p>
          </div>
          <Link to="/products" className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden h-96">
          <img 
            src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Promo"
          />
          <div className="absolute inset-0 bg-indigo-900/60 flex items-center">
            <div className="px-12 max-w-xl text-white">
              <h2 className="text-4xl font-bold mb-4">Summer Sale is Live!</h2>
              <p className="text-indigo-100 text-lg mb-8">Get up to 50% off on selected items from our summer collection. Limited time only.</p>
              <Link to="/products" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors inline-block">
                Claim Offer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
