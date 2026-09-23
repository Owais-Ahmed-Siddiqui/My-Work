export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  color: string;
  online?: boolean;
};

export type Label = {
  id: string;
  name: string;
  color: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

export type Comment = {
  id: string;
  taskId: string;
  userId: string;
  body: string;
  createdAt: string;
  likes?: string[];
};

export type Task = {
  id: string;
  projectId: string;
  columnId: string;
  title: string;
  description: string;
  assignees: string[];
  labels: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string | null;
  checklist: ChecklistItem[];
  comments: Comment[];
  attachments: { id: string; name: string; size: string; type: string }[];
  cover?: string | null;
  order: number;
  createdAt: string;
  watchers: string[];
};

export type Column = {
  id: string;
  projectId: string;
  title: string;
  order: number;
};

export type Project = {
  id: string;
  name: string;
  key: string;
  color: string;
  description: string;
  members: string[];
  isStarred?: boolean;
  cover?: string;
};

export type FeedPost = {
  id: string;
  userId: string;
  body: string;
  createdAt: string;
  likes: string[];
  comments: { userId: string; body: string; createdAt: string }[];
  attachment?: string;
  projectId?: string;
  taskId?: string;
};

export type NotificationItem = {
  id: string;
  type: 'mention' | 'assigned' | 'comment' | 'completed' | 'invite';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  projectId?: string;
  taskId?: string;
  userId?: string;
};

export type Activity = {
  id: string;
  userId: string;
  action: string;
  target: string;
  projectId: string;
  createdAt: string;
};
