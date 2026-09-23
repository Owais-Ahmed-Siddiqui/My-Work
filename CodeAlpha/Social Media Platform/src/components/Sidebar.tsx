import { Home, Compass, Bell, Mail, Bookmark, User, Settings, MoreHorizontal } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all ${active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
    <Icon className={`w-6 h-6 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
    <span className="text-lg">{label}</span>
  </button>
);

const Sidebar = ({ onViewChange, currentView }: { onViewChange: (view: 'feed' | 'profile') => void, currentView: string }) => {
  return (
    <aside className="w-full">
      <div className="space-y-2">
        <div onClick={() => onViewChange('feed')}>
          <SidebarItem icon={Home} label="Home" active={currentView === 'feed'} />
        </div>
        <SidebarItem icon={Compass} label="Explore" />
        <SidebarItem icon={Bell} label="Notifications" />
        <SidebarItem icon={Mail} label="Messages" />
        <SidebarItem icon={Bookmark} label="Bookmarks" />
        <div onClick={() => onViewChange('profile')}>
          <SidebarItem icon={User} label="Profile" active={currentView === 'profile'} />
        </div>
        <SidebarItem icon={Settings} label="Settings" />
        <div className="pt-4 mt-4 border-t border-gray-100">
           <button className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
            <MoreHorizontal className="w-6 h-6 text-gray-500" />
            <span className="text-lg">More</span>
          </button>
        </div>
      </div>
      
      <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
        Post
      </button>
    </aside>
  );
};

export default Sidebar;
