import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, name);
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
          <h1 className="text-3xl font-extrabold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">Join our community of style enthusiasts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

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
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
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
            Create Account <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="text-center mt-10 text-gray-500">
          Already have an account? {' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
