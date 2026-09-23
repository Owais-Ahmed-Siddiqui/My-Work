export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  followingCount: number;
  followersCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  createdAt: string;
}
