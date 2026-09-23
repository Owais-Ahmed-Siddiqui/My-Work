import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation and API call would happen here
    login(email, email.split('@')[0] || 'User');
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl shadow-xl border border-gray-50 w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-t border-gray-100"></div>
            <span className="relative bg-white px-4 text-sm text-gray-400">Or continue with</span>
          </div>
          
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <User className="h-5 w-5" />
            Guest Access
          </button>
        </div>

        <p className="text-center mt-10 text-gray-500">
          Don't have an account? {' '}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
