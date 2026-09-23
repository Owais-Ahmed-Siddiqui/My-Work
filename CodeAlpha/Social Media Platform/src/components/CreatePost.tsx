import { useState } from 'react';
import { Image, MapPin, Smile, Send } from 'lucide-react';

interface CreatePostProps {
  onPost: (content: string, image?: string) => void;
}

const CreatePost = ({ onPost }: CreatePostProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6">
      <div className="flex gap-4">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
          alt="User" 
          className="w-12 h-12 rounded-full object-cover border border-gray-100"
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border-none focus:ring-0 text-lg text-gray-800 placeholder-gray-400 resize-none min-h-[100px]"
            ></textarea>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
              <div className="flex gap-2">
                <button type="button" className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button type="button" className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                  <MapPin className="w-5 h-5" />
                </button>
                <button type="button" className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button 
                type="submit"
                disabled={!content.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <span>Post</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
