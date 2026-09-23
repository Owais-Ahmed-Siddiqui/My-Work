import { create } from 'zustand';
import {
  users as seedUsers,
  projects as seedProjects,
  columns as seedColumns,
  tasks as seedTasks,
  feedPosts as seedFeed,
  notifications as seedNotifications,
  labels as seedLabels,
  currentUserId as seedCurrentUserId,
} from './mockData';
import type { Task, Comment, FeedPost, Project, NotificationItem, Column, User, Label } from './types';

type AppState = {
  authenticated: boolean;
  currentUserId: string;
  currentProjectId: string;
  users: User[];
  projects: Project[];
  columns: Column[];
  labels: Label[];
  tasks: Task[];
  feed: FeedPost[];
  notifications: NotificationItem[];
  openTaskId: string | null;

  login: (email: string) => void;
  logout: () => void;
  setProject: (id: string) => void;
  openTask: (id: string | null) => void;

  moveTask: (taskId: string, toColumnId: string) => void;
  updateTask: (taskId: string, patch: Partial<Task>) => void;
  addComment: (taskId: string, body: string) => void;
  toggleChecklist: (taskId: string, itemId: string) => void;
  createTask: (columnId: string, title: string) => void;
  createProject: (name: string) => void;

  addFeedPost: (body: string) => void;
  toggleFeedLike: (postId: string) => void;
  addFeedComment: (postId: string, body: string) => void;

  markNotificationsRead: () => void;
};

const savedUser = (() => {
  const id = localStorage.getItem('flowboard_auth');
  return id && seedUsers.some(u => u.id === id) ? id : seedCurrentUserId;
})();

const defaultColTitles = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done'];

function makeColumns(projectId: string): Column[] {
  return defaultColTitles.map((title, order) => ({
    id: `${projectId}_${title.toLowerCase().replace(/\s+/g, '')}`,
    projectId,
    title,
    order,
  }));
}

export const useApp = create<AppState>((set, get) => ({
  authenticated: !!localStorage.getItem('flowboard_auth'),
  currentUserId: savedUser,
  currentProjectId: seedProjects[0]?.id ?? '',
  users: seedUsers,
  projects: seedProjects,
  columns: seedColumns,
  labels: seedLabels,
  tasks: seedTasks,
  feed: seedFeed,
  notifications: seedNotifications,
  openTaskId: null,

  login: (email) => {
    const found = seedUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || seedUsers[0];
    localStorage.setItem('flowboard_auth', found.id);
    set({ authenticated: true, currentUserId: found.id });
  },
  logout: () => {
    localStorage.removeItem('flowboard_auth');
    set({ authenticated: false });
  },
  setProject: (id) => set({ currentProjectId: id }),
  openTask: (id) => set({ openTaskId: id }),

  moveTask: (taskId, toColumnId) => set(state => ({
    tasks: state.tasks.map(t => (t.id === taskId ? { ...t, columnId: toColumnId } : t)),
  })),

  updateTask: (taskId, patch) => set(state => ({
    tasks: state.tasks.map(t => (t.id === taskId ? { ...t, ...patch } : t)),
  })),

  addComment: (taskId, body) => {
    const userId = get().currentUserId;
    const comment: Comment = {
      id: 'cm_' + Math.random().toString(36).slice(2, 9),
      taskId, userId, body,
      createdAt: new Date().toISOString(),
    };
    set(state => ({
      tasks: state.tasks.map(t => (t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t)),
    }));
  },

  toggleChecklist: (taskId, itemId) => set(state => ({
    tasks: state.tasks.map(t =>
      t.id === taskId
        ? { ...t, checklist: t.checklist.map(c => (c.id === itemId ? { ...c, done: !c.done } : c)) }
        : t
    ),
  })),

  createTask: (columnId, title) => {
    const s = get();
    const t: Task = {
      id: 't_' + Math.random().toString(36).slice(2, 9),
      projectId: s.currentProjectId,
      columnId,
      title,
      description: '',
      assignees: [s.currentUserId],
      labels: [],
      priority: 'medium',
      dueDate: null,
      checklist: [],
      comments: [],
      attachments: [],
      order: 0,
      createdAt: new Date().toISOString(),
      watchers: [],
    };
    set(state => ({ tasks: [t, ...state.tasks] }));
  },

  createProject: (name) => {
    const id = 'p_' + Math.random().toString(36).slice(2, 7);
    const key = (name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 4)) || 'PRJ';
    const palette = ['#6d5cf7', '#0ea5e9', '#f59e0b', '#14b8a6', '#ec4899', '#84cc16'];
    const project: Project = {
      id, name, key,
      color: palette[Math.floor(Math.random() * palette.length)],
      description: 'New workspace',
      members: [get().currentUserId],
    };
    set(s => ({
      projects: [project, ...s.projects],
      columns: [...s.columns, ...makeColumns(id)],
      currentProjectId: id,
    }));
  },

  addFeedPost: (body) => {
    const post: FeedPost = {
      id: 'fp_' + Math.random().toString(36).slice(2, 8),
      userId: get().currentUserId,
      body,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      projectId: get().currentProjectId,
    };
    set(s => ({ feed: [post, ...s.feed] }));
  },

  toggleFeedLike: (postId) => set(state => {
    const uid = state.currentUserId;
    return {
      feed: state.feed.map(p =>
        p.id === postId
          ? { ...p, likes: p.likes.includes(uid) ? p.likes.filter(x => x !== uid) : [...p.likes, uid] }
          : p
      ),
    };
  }),

  addFeedComment: (postId, body) => set(state => ({
    feed: state.feed.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { userId: state.currentUserId, body, createdAt: new Date().toISOString() }] }
        : p
    ),
  })),

  markNotificationsRead: () => set(s => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })),
  })),
}));
