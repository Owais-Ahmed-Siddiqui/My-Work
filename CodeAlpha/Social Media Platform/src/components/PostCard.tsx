import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-gray-200 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <img 
            src={post.userAvatar} 
            alt={post.username} 
            className="w-12 h-12 rounded-full object-cover border border-gray-100"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 hover:underline cursor-pointer">@{post.username}</span>
              <span className="text-gray-400 text-sm">· {formatDistanceToNow(new Date(post.createdAt))} ago</span>
            </div>
            <p className="text-gray-500 text-xs">Public Post</p>
          </div>
        </div>
        <button className="text-gray-400 hover:bg-gray-50 p-2 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
        
        {post.image && (
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <img 
              src={post.image} 
              alt="Post attachment" 
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
        <div className="flex gap-6">
          <button 
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button 
            onClick={() => onComment(post.id)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments.length}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <button className="text-gray-500 hover:text-blue-500 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {post.comments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-50 space-y-3">
          {post.comments.slice(0, 2).map((comment) => (
            <div key={comment.id} className="flex gap-2 text-sm">
              <span className="font-bold text-gray-900">@{comment.username}</span>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          {post.comments.length > 2 && (
            <button className="text-blue-600 text-sm font-medium hover:underline">
              View all {post.comments.length} comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
