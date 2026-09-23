import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import Profile from './components/Profile';
import { posts as initialPosts, currentUser } from './seedData';
import { Post } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [view, setView] = useState<'feed' | 'profile'>('feed');

  const handlePost = (content: string, image?: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      content,
      image,
      likes: 0,
      liked: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    const commentText = prompt('Enter your comment:');
    if (commentText) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `c${Date.now()}`,
                userId: currentUser.id,
                username: currentUser.username,
                content: commentText,
                createdAt: new Date().toISOString()
              }
            ]
          };
        }
        return post;
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar onHomeClick={() => setView('feed')} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64 hidden lg:block sticky top-24 h-fit">
            <Sidebar onViewChange={setView} currentView={view} />
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-2xl">
            {view === 'feed' ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2">Home Feed</h1>
                  <p className="text-gray-500">Welcome back, {currentUser.name}! Check out what's happening.</p>
                </div>
                
                <CreatePost onPost={handlePost} />

                <div className="space-y-6">
                  {posts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      onLike={handleLike}
                      onComment={handleComment}
                    />
                  ))}
                </div>
              </>
            ) : (
              <Profile user={currentUser} />
            )}
          </div>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </main>

      {/* Mobile Floating Action Button */}
      <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-all z-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}


export default App;
