import { Post, User } from './types';

export const currentUser: User = {
  id: 'u1',
  username: 'owais_ahmed',
  name: 'Owais Ahmed',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  bio: 'Full Stack Developer | Creator of Socially. Exploring the digital frontier.',
  location: 'Karachi, Pakistan',
  followingCount: 124,
  followersCount: 850
};

export const posts: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    username: 'tech_guru',
    userAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
    content: 'Just finished building a new React component library. Open source is the way to go! 🚀 #coding #reactjs',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    likes: 45,
    liked: false,
    comments: [
      { id: 'c1', userId: 'u1', username: 'owais_ahmed', content: 'This looks amazing! Link to the repo?', createdAt: '2023-10-27T10:00:00Z' }
    ],
    createdAt: '2023-10-27T09:30:00Z'
  },
  {
    id: 'p2',
    userId: 'u3',
    username: 'traveler_jane',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Woke up to this view today. Nature is healing. 🏔️✨ #mountains #wanderlust',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    likes: 128,
    liked: true,
    comments: [],
    createdAt: '2023-10-26T15:45:00Z'
  },
  {
    id: 'p3',
    userId: 'u4',
    username: 'foodie_mike',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: 'The best ramen I have ever had. If you are in Tokyo, check this place out!',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    likes: 67,
    liked: false,
    comments: [
      { id: 'c2', userId: 'u5', username: 'noodle_lover', content: 'Added to my list!', createdAt: '2023-10-26T18:00:00Z' }
    ],
    createdAt: '2023-10-26T17:20:00Z'
  },
  {
    id: 'p4',
    userId: 'u1',
    username: 'owais_ahmed',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    content: 'Just launched Socially! 🚀 It is a fully functional social media app built with React, Django, and Tailwind. Check out the source code on my GitHub!',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    likes: 1024,
    liked: true,
    comments: [
      { id: 'c3', userId: 'u2', username: 'tech_guru', content: 'Incredible work Owais! The UI is so clean.', createdAt: '2023-10-28T09:00:00Z' }
    ],
    createdAt: '2023-10-28T08:00:00Z'
  },
  {
    id: 'p5',
    userId: 'u6',
    username: 'coding_cat',
    userAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop',
    content: 'Me trying to debug my Django models at 3 AM... 🐱💻',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
    likes: 245,
    liked: false,
    comments: [],
    createdAt: '2023-10-27T22:00:00Z'
  }
];
