import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              VogueStore
            </Link>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Curating the finest quality products for your lifestyle. Experience premium shopping like never before.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Mail className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Phone className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><MapPin className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-500 hover:text-indigo-600 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="text-gray-500 hover:text-indigo-600 transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Accessories" className="text-gray-500 hover:text-indigo-600 transition-colors">Accessories</Link></li>
              <li><Link to="/products?category=Apparel" className="text-gray-500 hover:text-indigo-600 transition-colors">Apparel</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-500 mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-gray-50 border-none rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} VogueStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
