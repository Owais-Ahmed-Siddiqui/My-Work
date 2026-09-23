import { useAuth } from '../context/AuthContext';
import { User, Mail, Package, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="bg-indigo-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-indigo-600" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4" /> {user.email}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              <button className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors group">
                <Package className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 mb-2" />
                <span className="font-bold text-gray-900 text-sm">My Orders</span>
                <span className="text-xs text-gray-400 mt-1">Check status</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors group">
                <Settings className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 mb-2" />
                <span className="font-bold text-gray-900 text-sm">Settings</span>
                <span className="text-xs text-gray-400 mt-1">Edit profile</span>
              </button>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group"
              >
                <LogOut className="h-6 w-6 text-gray-400 group-hover:text-red-600 mb-2" />
                <span className="font-bold text-gray-900 text-sm text-red-600">Logout</span>
                <span className="text-xs text-gray-400 mt-1">End session</span>
              </button>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500 italic">
                No recent activity to show.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
