import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              VogueStore
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border-transparent focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">Shop</Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="font-medium text-sm">{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 font-medium">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
             <Link to="/cart" className="relative text-gray-600">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4">
          <Link to="/products" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Profile ({user?.name})</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block text-red-500 font-medium w-full text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block bg-indigo-600 text-white px-5 py-2 rounded-lg text-center font-medium" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
