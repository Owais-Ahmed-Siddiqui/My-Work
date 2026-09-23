import { User, Project, Column, Task, FeedPost, NotificationItem, Label } from './types';

export const users: User[] = [
  { id: 'u_owais', name: 'Owais Ahmed', email: 'owais@flowboard.dev', avatar: 'OA', role: 'Founder & PM', color: '#6d5cf7', online: true },
  { id: 'u_ayesha', name: 'Ayesha Khan', email: 'ayesha@flowboard.dev', avatar: 'AK', role: 'Product Designer', color: '#ec6f6a', online: true },
  { id: 'u_zain', name: 'Zain Malik', email: 'zain@flowboard.dev', avatar: 'ZM', role: 'Frontend Engineer', color: '#22c55e', online: true },
  { id: 'u_sara', name: 'Sara Imran', email: 'sara@flowboard.dev', avatar: 'SI', role: 'Backend Engineer', color: '#f59e0b', online: false },
  { id: 'u_hamza', name: 'Hamza Tariq', email: 'hamza@flowboard.dev', avatar: 'HT', role: 'Growth', color: '#0ea5e9', online: true },
  { id: 'u_nadia', name: 'Nadia Farooq', email: 'nadia@flowboard.dev', avatar: 'NF', role: 'QA Lead', color: '#d946ef', online: false },
  { id: 'u_ali', name: 'Ali Raza', email: 'ali@flowboard.dev', avatar: 'AR', role: 'Mobile Dev', color: '#14b8a6', online: true },
];

export const labels: Label[] = [
  { id: 'l_feature', name: 'Feature', color: '#6d5cf7' },
  { id: 'l_bug', name: 'Bug', color: '#ef4444' },
  { id: 'l_design', name: 'Design', color: '#ec4899' },
  { id: 'l_api', name: 'API', color: '#0ea5e9' },
  { id: 'l_docs', name: 'Docs', color: '#f59e0b' },
  { id: 'l_research', name: 'Research', color: '#14b8a6' },
  { id: 'l_marketing', name: 'Marketing', color: '#84cc16' },
];

export const projects: Project[] = [
  {
    id: 'p_flowboard',
    name: 'Flowboard Web',
    key: 'FLOW',
    color: '#6d5cf7',
    description: 'The main collab workspace. Trello x Asana x Linear.',
    members: users.map(u=>u.id),
    isStarred: true,
    cover: 'linear-gradient(135deg,#6d5cf7 0%, #ff836f 100%)',
  },
  {
    id: 'p_nimbus',
    name: 'Nimbus Mobile App',
    key: 'NIM',
    color: '#0ea5e9',
    description: 'React Native client for iOS/Android',
    members: ['u_owais','u_ayesha','u_ali','u_zain'],
    isStarred: true,
  },
  {
    id: 'p_launch',
    name: 'Q4 Launch',
    key: 'LCH',
    color: '#f59e0b',
    description: 'Marketing & GTM for December launch',
    members: ['u_owais','u_hamza','u_ayesha','u_nadia'],
  },
  {
    id: 'p_infra',
    name: 'Platform Infra',
    key: 'INF',
    color: '#14b8a6',
    description: 'API, realtime, auth',
    members: ['u_owais','u_sara','u_zain'],
  }
];

const defaultColTitles = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done'];

export const columns: Column[] = projects.flatMap(p =>
  defaultColTitles.map((title, order) => ({
    id: p.id === 'p_flowboard'
      ? ['col_backlog','col_todo','col_progress','col_review','col_done'][order]
      : `${p.id}_${title.toLowerCase().replace(/\s+/g,'')}`,
    projectId: p.id,
    title,
    order,
  }))
);

const now = Date.now();
const d = (daysAgo: number) => new Date(now - daysAgo*86400000).toISOString();

export const tasks: Task[] = [
  {
    id: 't_1', projectId: 'p_flowboard', columnId: 'col_progress',
    title: 'Real-time presence cursors',
    description: 'Show who is viewing a board in real-time. Avatars stacked in top bar, live cursors like Figma.\n\n- [x] WebSocket presence\n- [ ] Cursor broadcast throttling\n- [ ] Mobile fallbacks',
    assignees: ['u_zain','u_sara'],
    labels: ['l_feature','l_api'],
    priority: 'high',
    dueDate: d(-2),
    checklist: [
      { id: 'c1', text: 'Socket presence channel', done: true },
      { id: 'c2', text: 'Heartbeat / idle detection', done: true },
      { id: 'c3', text: 'Cursor position sync', done: false },
    ],
    comments: [
      { id: 'cm1', taskId:'t_1', userId:'u_zain', body:'Pushed the presence hook, looking crisp! We get <50ms latency on Fly.io.', createdAt: d(0.15) },
      { id: 'cm2', taskId:'t_1', userId:'u_owais', body:'Love it. Can we tint cursors per user color? Feels more “us”.', createdAt: d(0.11) },
    ],
    attachments: [{ id:'a1', name:'presence-spec.md', size:'12 kb', type:'doc' }],
    order: 0, createdAt: d(6),
    watchers: ['u_owais','u_zain'],
    cover: null,
  },
  {
    id: 't_2', projectId: 'p_flowboard', columnId: 'col_progress',
    title: 'Drag & drop polish – mobile + a11y',
    description: 'Beautiful tactile DnD that works perfectly on touch. Haptics, auto-scroll, keyboard sorting.',
    assignees: ['u_ayesha','u_zain'],
    labels: ['l_design','l_feature'],
    priority: 'medium',
    dueDate: d(-1),
    checklist: [
      { id: 'c1', text: 'Touch sensor tuning', done: true },
      { id: 'c2', text: 'Keyboard reorder nav', done: false },
    ],
    comments: [
      { id: 'cm3', taskId:'t_2', userId:'u_ayesha', body:'Dropped in new motion curves. Feels buttery now. 🎯', createdAt: d(0.3) },
    ],
    attachments: [],
    order: 1, createdAt: d(4),
    watchers: ['u_ayesha'],
    cover: null,
  },
  {
    id: 't_3', projectId: 'p_flowboard', columnId: 'col_todo',
    title: 'Command palette (⌘K)',
    description: 'Global fuzzy search. Jump to task, project, user. Create task inline. Linear-style.',
    assignees: ['u_zain'],
    labels: ['l_feature'],
    priority: 'high',
    dueDate: d(-4),
    checklist: [],
    comments: [],
    attachments: [],
    order: 0, createdAt: d(2),
    watchers: ['u_owais'],
  },
  {
    id: 't_4', projectId: 'p_flowboard', columnId: 'col_todo',
    title: 'Task comments with @mentions + threads',
    description: 'Rich comments in task drawer. Mentions, emoji, file paste.',
    assignees: ['u_sara','u_owais'],
    labels: ['l_feature'],
    priority: 'medium',
    dueDate: null,
    checklist: [
      { id: 'c1', text: 'Mention autocomplete', done: true },
      { id: 'c2', text: 'Real-time typing indicators', done: false },
      { id: 'c3', text: 'Emoji reactions', done: false },
    ],
    comments: [],
    attachments: [],
    order: 1, createdAt: d(3),
    watchers: [],
  },
  {
    id: 't_5', projectId: 'p_flowboard', columnId: 'col_review',
    title: 'Notifications center + email digest',
    description: 'Unified inbox. Web push, Slack bridge.',
    assignees: ['u_hamza'],
    labels: ['l_feature','l_marketing'],
    priority: 'medium',
    dueDate: d(-0.4),
    checklist: [],
    comments: [
      { id: 'cm9', taskId:'t_5', userId:'u_hamza', body:'Digest template is live. Take a peek?', createdAt: d(0.5) },
    ],
    attachments: [],
    order: 0, createdAt: d(7),
    watchers: ['u_owais'],
  },
  {
    id: 't_6', projectId: 'p_flowboard', columnId: 'col_review',
    title: 'Board templates gallery',
    description: 'Sprint, Bug triage, Content calendar templates with 1-click import.',
    assignees: ['u_ayesha'],
    labels: ['l_design','l_marketing'],
    priority: 'low',
    dueDate: null,
    checklist: [],
    comments: [],
    attachments: [],
    order: 1, createdAt: d(5),
    watchers: [],
  },
  {
    id: 't_7', projectId: 'p_flowboard', columnId: 'col_backlog',
    title: 'Offline-first PWA sync',
    description: 'Full board works offline. CRDT sync when back online.',
    assignees: ['u_sara'],
    labels: ['l_research','l_api'],
    priority: 'low',
    dueDate: null,
    checklist: [],
    comments: [],
    attachments: [],
    order: 0, createdAt: d(8),
    watchers: [],
  },
  {
    id: 't_8', projectId: 'p_flowboard', columnId: 'col_backlog',
    title: 'Calendar / Timeline view',
    description: 'Gantt-style timeline for dependencies.',
    assignees: [],
    labels: ['l_feature'],
    priority: 'medium',
    dueDate: null,
    checklist: [],
    comments: [],
    attachments: [],
    order: 1, createdAt: d(9),
    watchers: [],
  },
  {
    id: 't_9', projectId: 'p_flowboard', columnId: 'col_done',
    title: 'Kanban board w/ swimlanes',
    description: 'Shipped! Drag columns, WIP limits, collapse.',
    assignees: ['u_zain','u_ayesha'],
    labels: ['l_feature'],
    priority: 'high',
    dueDate: d(12),
    checklist: [
      { id: 'c1', text: 'Drag drop', done: true },
      { id: 'c2', text: 'Column limits', done: true },
    ],
    comments: [
      { id: 'cm10', taskId:'t_9', userId:'u_owais', body:'This is *chef kiss*. Shipping.', createdAt: d(3.2) },
    ],
    attachments: [],
    order: 0, createdAt: d(14),
    watchers: [],
    cover: 'linear-gradient(120deg,#ffe6d9,#f7d9ff)',
  },
  {
    id: 't_10', projectId: 'p_flowboard', columnId: 'col_done',
    title: 'Auth: magic links + OAuth',
    description: 'Passwordless login shipped.',
    assignees: ['u_sara'],
    labels: ['l_api'],
    priority: 'urgent',
    dueDate: d(10),
    checklist: [],
    comments: [],
    attachments: [],
    order: 1, createdAt: d(17),
    watchers: [],
  },
  {
    id: 't_11', projectId: 'p_flowboard', columnId: 'col_done',
    title: 'Activity feed / social updates',
    description: 'Global feed with posts, likes, comments. Makes Flowboard feel alive.',
    assignees: ['u_owais','u_hamza'],
    labels: ['l_feature','l_marketing'],
    priority: 'high',
    dueDate: d(5),
    checklist: [
      { id: 'c1', text: 'Post composer', done: true },
      { id: 'c2', text: 'Like + Comments', done: true },
      { id: 'c3', text: 'WS realtime', done: true },
    ],
    comments: [],
    attachments: [],
    order: 2, createdAt: d(11),
    watchers: [],
  },
  {
    id: 't_12', projectId: 'p_flowboard', columnId: 'col_todo',
    title: 'Fix scrolling jump in Firefox on DnD',
    description: 'Small but annoying. Repro in Firefox 130+.',
    assignees: ['u_nadia','u_zain'],
    labels: ['l_bug'],
    priority: 'urgent',
    dueDate: d(-0.2),
    checklist: [],
    comments: [],
    attachments: [],
    order: 2, createdAt: d(0.7),
    watchers: [],
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: 'fp_1', userId: 'u_owais',
    body: 'Shipped the Activity Feed! Flowboard now feels like a real social workspace. Post updates, cheer teammates, follow tasks. This was the missing soul. 🫶\n\nBuilt with FastAPI + WebSockets. Try posting on the right →',
    createdAt: d(0.08),
    likes: ['u_ayesha','u_zain','u_hamza','u_sara','u_ali'],
    comments: [
      { userId: 'u_ayesha', body: 'It feels SO alive. Nice work Owais!', createdAt: d(0.06) },
      { userId: 'u_zain', body: 'WS latency is wild, <40ms', createdAt: d(0.05) }
    ],
    projectId: 'p_flowboard',
  },
  {
    id: 'fp_2', userId: 'u_ayesha',
    body: 'New board empty states + illustrations are live. Makes onboarding 100x warmer. Screenshots in FLOW-124.',
    createdAt: d(0.4),
    likes: ['u_owais','u_hamza','u_nadia'],
    comments: [],
    projectId: 'p_flowboard',
    taskId: 't_6'
  },
  {
    id: 'fp_3', userId: 'u_zain',
    body: 'Just landed drag & drop with proper mobile haptics. Try long-pressing a card on your phone. Feels like native. ✨',
    createdAt: d(0.83),
    likes: ['u_owais','u_ayesha','u_ali'],
    comments: [{ userId: 'u_ali', body:'buttery smooth', createdAt: d(0.7) }],
    projectId: 'p_flowboard',
    taskId: 't_2'
  },
  {
    id: 'fp_4', userId: 'u_hamza',
    body: 'We crossed 1,240 signups for the private beta waitlist. Q4 launch is going to be spicy. 🌶️',
    createdAt: d(1.3),
    likes: ['u_owais','u_ayesha','u_sara','u_nadia'],
    comments: [],
    projectId: 'p_launch'
  },
  {
    id: 'fp_5', userId: 'u_sara',
    body: 'Auth is fully passwordless now. Magic links + Google. JWTs stored httpOnly. Clean.',
    createdAt: d(2.1),
    likes: ['u_owais','u_zain'],
    comments: [],
    projectId: 'p_infra',
    taskId: 't_10'
  },
  {
    id: 'fp_6', userId: 'u_nadia',
    body: 'Test suite is at 84% coverage for the board module. Found that sneaky Firefox DnD jump bug though – filed FLOW-188.',
    createdAt: d(2.9),
    likes: ['u_zain'],
    comments: [],
    taskId: 't_12'
  },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', type: 'mention', title:'Ayesha mentioned you', body:'“@owais Can you review the empty states?” in Board templates gallery', createdAt: d(0.18), read: false, taskId: 't_6' },
  { id: 'n2', type: 'comment', title:'New comment', body:'Zain commented on Real-time presence cursors', createdAt: d(0.15), read: false, taskId: 't_1' },
  { id: 'n3', type: 'assigned', title:'You were assigned', body:'Fix scrolling jump in Firefox on DnD', createdAt: d(0.68), read: false, taskId: 't_12'},
  { id: 'n4', type: 'completed', title:'Task completed', body: 'Activity feed / social updates was marked Done', createdAt: d(4.7), read: true, taskId: 't_11'},
];

export const currentUserId = 'u_owais';
