import { User } from '../types';
import { MapPin, Calendar, Link as LinkIcon, Edit3 } from 'lucide-react';

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      {/* Profile Header */}
      <div className="px-6 pb-6">
        <div className="flex justify-between items-end -mt-12 mb-6">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition-colors">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
          </div>

          <p className="text-gray-800 text-lg leading-relaxed">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-blue-600 hover:underline">github.com/Owais-Ahmed-Siddiqui</a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined October 2023</span>
            </div>
          </div>

          <div className="flex gap-6 pt-4">
            <div className="flex gap-1 items-center">
              <span className="font-bold text-gray-900">{user.followingCount}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold text-gray-900">{user.followersCount}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex border-t border-gray-100">
        <button className="flex-1 py-4 text-center border-b-2 border-blue-600 font-bold text-blue-600">Posts</button>
        <button className="flex-1 py-4 text-center text-gray-500 font-medium hover:bg-gray-50">Replies</button>
        <button className="flex-1 py-4 text-center text-gray-500 font-medium hover:bg-gray-50">Highlights</button>
        <button className="flex-1 py-4 text-center text-gray-500 font-medium hover:bg-gray-50">Media</button>
        <button className="flex-1 py-4 text-center text-gray-500 font-medium hover:bg-gray-50">Likes</button>
      </div>
    </div>
  );
};

export default Profile;
