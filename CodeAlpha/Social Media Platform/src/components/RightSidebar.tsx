// Suggested user section with icons if needed

const SuggestedUser = ({ name, username, avatar }: { name: string, username: string, avatar: string }) => (
  <div className="flex items-center justify-between group">
    <div className="flex gap-3">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <p className="font-bold text-sm text-gray-900 leading-tight hover:underline cursor-pointer">{name}</p>
        <p className="text-gray-500 text-xs">@{username}</p>
      </div>
    </div>
    <button className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
      Follow
    </button>
  </div>
);

const RightSidebar = () => {
  return (
    <aside className="w-80 hidden xl:block sticky top-24 h-fit space-y-6">
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Who to follow</h2>
        <div className="space-y-4">
          <SuggestedUser 
            name="Sarah Connor" 
            username="sconnor" 
            avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" 
          />
          <SuggestedUser 
            name="David Chen" 
            username="dchen_dev" 
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
          />
          <SuggestedUser 
            name="Emma Wilson" 
            username="emma_w" 
            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" 
          />
        </div>
        <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">Show more</button>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Trending</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-xs">Technology · Trending</p>
            <p className="font-bold text-gray-900">#ReactJS</p>
            <p className="text-gray-500 text-xs">25.4K posts</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Politics · Trending</p>
            <p className="font-bold text-gray-900">Global Summit</p>
            <p className="text-gray-500 text-xs">120K posts</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Sports · Trending</p>
            <p className="font-bold text-gray-900">World Cup 2024</p>
            <p className="text-gray-500 text-xs">89.2K posts</p>
          </div>
        </div>
        <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">Show more</button>
      </div>

      <div className="px-4 text-gray-500 text-xs flex flex-wrap gap-x-3 gap-y-1">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Ads info</a>
        <span>© 2023 Socially by Owais Ahmed</span>
      </div>
    </aside>
  );
};

export default RightSidebar;
