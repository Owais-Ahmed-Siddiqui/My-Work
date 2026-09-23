import { useEffect, useState } from 'react';
import { useApp } from '../lib/store';
import type { Task, User } from '../lib/types';
import { timeAgo, priorityMeta, cx } from '../lib/utils';
import {
  DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, closestCorners,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Bell, Search, Plus, Users, MessageSquare, Calendar,
  Paperclip, CheckSquare, Flag, X, Send, Heart, Hash, List as ListIcon,
  Sparkles, Star, LogOut, Filter, Clock, CheckCircle2, Inbox,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

/* ----------------------------- helpers ----------------------------- */

function getPriority(p: string) {
  return priorityMeta[p as keyof typeof priorityMeta] ?? priorityMeta.medium;
}

function Avatar({ id, size = 30 }: { id: string; size?: number }) {
  const user = useApp(s => s.users.find(u => u.id === id));
  const fallback = { avatar: '?', color: '#9ca3af', name: 'Unknown' };
  const u = user ?? (fallback as Partial<User>);
  return (
    <div
      title={u.name}
      className="rounded-full text-white font-semibold flex items-center justify-center shrink-0"
      style={{ background: u.color, width: size, height: size, fontSize: size * 0.4 }}
    >
      {u.avatar}
    </div>
  );
}

/* ----------------------------- sidebar ----------------------------- */

function UserMenu() {
  const meId = useApp(s => s.currentUserId);
  const me = useApp(s => s.users.find(u => u.id === s.currentUserId));
  const logout = useApp(s => s.logout);
  if (!me) return null;
  return (
    <div className="flex items-center gap-2.5 px-1.5 py-1.5 rounded-xl hover:bg-zinc-100">
      <Avatar id={meId} size={34} />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold truncate">{me.name}</div>
        <div className="text-[11px] text-zinc-500 truncate">{me.role}</div>
      </div>
      <button
        onClick={() => { logout(); toast('Signed out'); }}
        title="Sign out"
        className="w-8 h-8 rounded-lg hover:bg-zinc-200 flex items-center justify-center text-zinc-500 hover:text-rose-600"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}

function Sidebar() {
  const projects = useApp(s => s.projects);
  const users = useApp(s => s.users);
  const currentProjectId = useApp(s => s.currentProjectId);
  const setProject = useApp(s => s.setProject);
  const createProject = useApp(s => s.createProject);
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState('');

  return (
    <aside className="w-[270px] shrink-0 h-screen sticky top-0 bg-[#fbf9f7] border-r border-zinc-200 flex flex-col">
      <div className="h-[64px] px-5 flex items-center gap-3 border-b border-zinc-200">
        <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold">∿</div>
        <div>
          <div className="font-bold text-[15px]">Flowboard</div>
          <div className="text-[11px] text-zinc-500 -mt-0.5">by Owais Ahmed</div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <nav className="space-y-1">
          {[
            { icon: LayoutGrid, label: 'Boards', active: true },
            { icon: Inbox, label: 'My tasks' },
            { icon: Calendar, label: 'Calendar' },
            { icon: MessageSquare, label: 'Inbox' },
          ].map(it => (
            <button
              key={it.label}
              className={cx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px]',
                it.active ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
              )}
            >
              <it.icon size={17} /> {it.label}
            </button>
          ))}
        </nav>

        <div>
          <div className="flex items-center justify-between px-2 mb-2 text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
            Projects
            <button onClick={() => setShowNew(v => !v)} className="text-zinc-400 hover:text-zinc-800">
              <Plus size={15} />
            </button>
          </div>

          {showNew && (
            <div className="px-2 mb-2">
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && name.trim()) {
                    createProject(name.trim());
                    setName('');
                    setShowNew(false);
                    toast.success('Project created');
                  }
                }}
                placeholder="Project name…"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          )}

          <div className="space-y-1">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => setProject(p.id)}
                className={cx(
                  'w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-[13.5px] transition',
                  currentProjectId === p.id ? 'bg-white shadow-sm border border-zinc-200' : 'hover:bg-zinc-100 text-zinc-700'
                )}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[11px]"
                  style={{ background: p.color }}
                >
                  {p.key}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{p.name}</div>
                  <div className="text-[11px] text-zinc-500 truncate">{p.members.length} members</div>
                </div>
                {p.isStarred && <Star size={14} className="text-amber-500 fill-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        <div className="px-2">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500 mb-2 font-semibold">Team online</div>
          <div className="flex -space-x-2.5">
            {users.slice(0, 6).map(u => (
              <div key={u.id} className="ring-2 ring-[#fbf9f7] rounded-full">
                <Avatar id={u.id} size={32} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-zinc-200">
        <UserMenu />
        <a
          href="https://github.com/Owais-Ahmed-Siddiqui"
          target="_blank"
          rel="noreferrer"
          className="hover:text-zinc-800 text-[11px] text-zinc-500 block mt-2 px-1"
        >
          github.com/Owais-Ahmed-Siddiqui
        </a>
      </div>
    </aside>
  );
}

/* ----------------------------- topbar ----------------------------- */

function Topbar() {
  const project = useApp(s => s.projects.find(p => p.id === s.currentProjectId));
  const meId = useApp(s => s.currentUserId);
  const notifications = useApp(s => s.notifications);
  const tasks = useApp(s => s.tasks);
  const projects = useApp(s => s.projects);
  const markRead = useApp(s => s.markNotificationsRead);
  const openTask = useApp(s => s.openTask);
  const [openN, setOpenN] = useState(false);
  const [q, setQ] = useState('');

  const unread = notifications.filter(n => !n.read).length;
  const results = q.trim()
    ? tasks.filter(t =>
        t.title.toLowerCase().includes(q.toLowerCase()) ||
        t.description.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  if (!project) {
    return <div className="h-[64px] border-b border-zinc-200 bg-white" />;
  }

  return (
    <div className="h-[64px] border-b border-zinc-200 bg-white px-6 flex items-center justify-between gap-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow"
          style={{ background: project.color }}
        >
          {project.key}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-[17px] text-zinc-900 truncate">{project.name}</div>
          <div className="text-[12px] text-zinc-500 truncate">{project.description}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block relative">
          <div className="flex items-center bg-[#f4f1ee] rounded-full pl-3 pr-2 py-2 w-[300px] border border-zinc-200">
            <Search size={16} className="text-zinc-500 mr-2" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search tasks…"
              className="bg-transparent outline-none w-full text-[13px] placeholder:text-zinc-500"
            />
            {q && (
              <button onClick={() => setQ('')} className="text-zinc-400 hover:text-zinc-700">
                <X size={14} />
              </button>
            )}
          </div>
          {q.trim() && (
            <div className="absolute left-0 mt-2 w-[380px] rounded-2xl bg-white border border-zinc-200 shadow-2xl overflow-hidden z-50">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-[13px] text-zinc-400">No matches</div>
              ) : (
                results.slice(0, 7).map(t => (
                  <button
                    key={t.id}
                    onClick={() => { openTask(t.id); setQ(''); }}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-50 flex items-center gap-3 border-b border-zinc-100 last:border-0"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: getPriority(t.priority).color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold truncate">{t.title}</div>
                      <div className="text-[11px] text-zinc-500">{projects.find(p => p.id === t.projectId)?.name}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="hidden lg:flex -space-x-2">
          {project.members.slice(0, 5).map(uid => <Avatar key={uid} id={uid} size={32} />)}
        </div>

        <div className="relative">
          <button
            onClick={() => { setOpenN(v => !v); if (!openN) setTimeout(markRead, 800); }}
            className="relative w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full grid place-items-center px-1 font-bold">
                {unread}
              </span>
            )}
          </button>
          {openN && (
            <div
              onMouseLeave={() => setOpenN(false)}
              className="absolute right-0 mt-2 w-[350px] rounded-2xl bg-white border border-zinc-200 shadow-2xl overflow-hidden z-50"
            >
              <div className="px-4 py-3 font-semibold text-[13px] border-b">Notifications</div>
              <div className="max-h-[340px] overflow-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-[13px] text-zinc-400">Nothing new</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="px-4 py-3 border-b border-zinc-100 last:border-0">
                      <div className="text-[13px] font-semibold">{n.title}</div>
                      <div className="text-[12px] text-zinc-600">{n.body}</div>
                      <div className="text-[11px] text-zinc-400 mt-1">{timeAgo(n.createdAt)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Avatar id={meId} size={34} />
      </div>
    </div>
  );
}

/* ----------------------------- task card ----------------------------- */

function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const labels = useApp(s => s.labels);
  const openTask = useApp(s => s.openTask);
  const labelObjs = labels.filter(l => task.labels.includes(l.id));
  const checklistDone = task.checklist.filter(c => c.done).length;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => openTask(task.id)}
      className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      {task.cover && <div className="h-20 rounded-xl mb-3" style={{ background: task.cover }} />}
      {labelObjs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {labelObjs.map(l => (
            <span key={l.id} className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ background: l.color + '22', color: l.color }}>
              {l.name}
            </span>
          ))}
        </div>
      )}
      <div className="font-semibold text-[14.5px] text-zinc-900 leading-snug">{task.title}</div>
      {task.description && (
        <div className="text-[12.5px] text-zinc-600 mt-1.5 line-clamp-2">{task.description.split('\n')[0]}</div>
      )}
      <div className="flex items-center justify-between mt-3">
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 3).map(uid => (
            <div key={uid} className="ring-2 ring-white rounded-full"><Avatar id={uid} size={26} /></div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-[11.5px] text-zinc-500">
          {task.checklist.length > 0 && (
            <span className="flex items-center gap-1"><CheckSquare size={13} /> {checklistDone}/{task.checklist.length}</span>
          )}
          {task.comments.length > 0 && (
            <span className="flex items-center gap-1"><MessageSquare size={13} /> {task.comments.length}</span>
          )}
          <span className="w-2 h-2 rounded-full" style={{ background: getPriority(task.priority).color }} />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- kanban ----------------------------- */

function Column({ columnId, title, tasks }: { columnId: string; title: string; tasks: Task[] }) {
  const createTask = useApp(s => s.createTask);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');

  const dot: Record<string, string> = {
    Backlog: '#94a3b8', 'To Do': '#6d5cf7', 'In Progress': '#f59e0b', 'In Review': '#0ea5e9', Done: '#22c55e',
  };

  const submit = () => {
    if (draft.trim()) { createTask(columnId, draft.trim()); toast.success('Card added'); }
    setDraft('');
    setAdding(false);
  };

  return (
    <div className="w-[320px] shrink-0">
      <div className="flex items-center justify-between px-1.5 mb-3">
        <div className="text-[12.5px] font-bold uppercase tracking-wide text-zinc-700 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: dot[title] ?? '#94a3b8' }} />
          {title} <span className="text-zinc-400 font-medium">{tasks.length}</span>
        </div>
        <button onClick={() => setAdding(true)} className="text-zinc-400 hover:text-zinc-700"><Plus size={15} /></button>
      </div>

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[40px]">
          {tasks.map(t => <TaskCard key={t.id} task={t} />)}

          {adding ? (
            <div className="bg-white rounded-2xl border border-zinc-300 p-3 shadow-sm">
              <textarea
                autoFocus
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
                  if (e.key === 'Escape') { setAdding(false); setDraft(''); }
                }}
                placeholder="What needs doing?"
                className="w-full resize-none outline-none text-[13.5px] min-h-[44px]"
              />
              <div className="flex gap-2 mt-2">
                <button onClick={submit} className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-[12.5px] font-semibold">Add</button>
                <button onClick={() => { setAdding(false); setDraft(''); }} className="px-3 py-1.5 rounded-lg text-zinc-500 text-[12.5px]">Cancel</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full border border-dashed border-zinc-300 rounded-2xl py-3 text-[13px] text-zinc-500 hover:bg-zinc-50"
            >
              + Add card
            </button>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function BoardView({ tasks }: { tasks: Task[] }) {
  const projectId = useApp(s => s.currentProjectId);
  const columns = useApp(s => s.columns);
  const moveTask = useApp(s => s.moveTask);
  const allTasks = useApp(s => s.tasks);

  const cols = columns.filter(c => c.projectId === projectId).sort((a, b) => a.order - b.order);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const overId = String(over.id);
    const overTask = allTasks.find(t => t.id === overId);
    if (overTask) {
      moveTask(String(active.id), overTask.columnId);
    } else if (cols.some(c => c.id === overId)) {
      moveTask(String(active.id), overId);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="flex gap-5 pb-14 overflow-x-auto">
        {cols.map(c => (
          <Column key={c.id} columnId={c.id} title={c.title} tasks={tasks.filter(t => t.columnId === c.id)} />
        ))}
      </div>
    </DndContext>
  );
}

/* ----------------------------- list view ----------------------------- */

function ListView({ tasks }: { tasks: Task[] }) {
  const projectId = useApp(s => s.currentProjectId);
  const columns = useApp(s => s.columns);
  const labels = useApp(s => s.labels);
  const openTask = useApp(s => s.openTask);
  const cols = columns.filter(c => c.projectId === projectId).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 pb-14">
      {cols.map(col => {
        const colTasks = tasks.filter(t => t.columnId === col.id);
        if (colTasks.length === 0) return null;
        return (
          <div key={col.id}>
            <div className="text-[12.5px] font-bold uppercase tracking-wide text-zinc-700 mb-2">{col.title} · {colTasks.length}</div>
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-100">
              {colTasks.map(t => (
                <div
                  key={t.id}
                  onClick={() => openTask(t.id)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: getPriority(t.priority).color }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14px] truncate">{t.title}</div>
                    <div className="flex gap-1.5 mt-1">
                      {t.labels.map(lid => {
                        const l = labels.find(x => x.id === lid);
                        return l ? (
                          <span key={lid} className="text-[10.5px] px-1.5 py-0.5 rounded" style={{ background: l.color + '22', color: l.color }}>{l.name}</span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  {t.dueDate && (
                    <span className="text-[11.5px] text-zinc-500 hidden sm:block">
                      {new Date(t.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                  {t.comments.length > 0 && (
                    <span className="text-[11.5px] text-zinc-500 flex items-center gap-1"><MessageSquare size={13} />{t.comments.length}</span>
                  )}
                  <div className="flex -space-x-1.5">
                    {t.assignees.slice(0, 3).map(uid => <div key={uid} className="ring-2 ring-white rounded-full"><Avatar id={uid} size={24} /></div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {tasks.length === 0 && <div className="text-center text-zinc-400 py-16">No tasks match your filters.</div>}
    </div>
  );
}

/* ----------------------------- calendar view ----------------------------- */

function CalendarView({ tasks }: { tasks: Task[] }) {
  const openTask = useApp(s => s.openTask);
  const dated = tasks.filter(t => t.dueDate);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const tasksForDay = (day: number) =>
    dated.filter(t => {
      const d = new Date(t.dueDate as string);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 pb-8 shadow-sm mb-14">
      <div className="text-[16px] font-bold mb-4">{now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
      <div className="grid grid-cols-7 gap-2 text-center text-[11.5px] text-zinc-500 mb-2 font-semibold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, i) => (
          <div key={i} className={cx('min-h-[90px] rounded-xl p-2', day ? 'bg-zinc-50 border border-zinc-100' : '')}>
            {day && (
              <>
                <div className={cx('text-[12px] font-semibold mb-1', day === now.getDate() ? 'text-white bg-zinc-900 w-6 h-6 rounded-full flex items-center justify-center' : 'text-zinc-700')}>
                  {day}
                </div>
                <div className="space-y-1">
                  {tasksForDay(day).slice(0, 3).map(t => (
                    <button
                      key={t.id}
                      onClick={() => openTask(t.id)}
                      className="w-full text-left text-[10.5px] px-1.5 py-1 rounded-md truncate text-white font-medium"
                      style={{ background: getPriority(t.priority).color }}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- stats ----------------------------- */

function Stats({ tasks }: { tasks: Task[] }) {
  const projectId = useApp(s => s.currentProjectId);
  const columns = useApp(s => s.columns);
  const doneCol = columns.find(c => c.projectId === projectId && /done/i.test(c.title));
  const done = doneCol ? tasks.filter(t => t.columnId === doneCol.id).length : 0;
  const total = tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !(doneCol && t.columnId === doneCol.id)).length;

  const cards = [
    { icon: LayoutGrid, label: 'Total tasks', value: total, color: '#6d5cf7' },
    { icon: CheckCircle2, label: 'Completed', value: done, color: '#22c55e' },
    { icon: Clock, label: 'Overdue', value: overdue, color: '#ef4444' },
    { icon: Flag, label: 'Progress', value: pct + '%', color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {cards.map(c => (
        <div key={c.label} className="bg-white border border-zinc-200 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: c.color + '22', color: c.color }}>
            <c.icon size={18} />
          </div>
          <div>
            <div className="text-[18px] font-bold leading-none">{c.value}</div>
            <div className="text-[11.5px] text-zinc-500 mt-0.5">{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- activity feed ----------------------------- */

function ActivityFeed() {
  const feed = useApp(s => s.feed);
  const users = useApp(s => s.users);
  const meId = useApp(s => s.currentUserId);
  const addPost = useApp(s => s.addFeedPost);
  const toggleLike = useApp(s => s.toggleFeedLike);
  const addComment = useApp(s => s.addFeedComment);
  const [text, setText] = useState('');
  const [replyOpen, setReplyOpen] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  return (
    <aside className="w-[370px] shrink-0 border-l border-zinc-200 bg-[#fcfbf9] h-screen sticky top-0 overflow-y-auto hidden xl:block">
      <div className="h-[64px] px-5 flex items-center gap-2 border-b border-zinc-200">
        <Sparkles size={16} className="text-indigo-500" />
        <div className="font-bold text-[14.5px]">Activity Feed</div>
        <div className="ml-auto text-[11.5px] text-zinc-500 flex items-center gap-1.5">
          Live <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="bg-white rounded-2xl border border-zinc-200 p-3.5 shadow-sm">
          <div className="flex gap-3">
            <Avatar id={meId} size={34} />
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share an update with the team…"
              className="flex-1 bg-transparent outline-none text-[13.5px] resize-none min-h-[50px] pt-1.5 placeholder:text-zinc-500"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-[11.5px] text-zinc-500 flex gap-3"><Paperclip size={14} /> <Hash size={14} /> <span>@mention</span></div>
            <button
              disabled={!text.trim()}
              onClick={() => { if (text.trim()) { addPost(text.trim()); setText(''); toast.success('Posted'); } }}
              className="bg-zinc-900 text-white text-[12.5px] px-3.5 py-2 rounded-full font-semibold disabled:opacity-40"
            >
              Post
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {feed.map(p => {
            const u = users.find(x => x.id === p.userId);
            if (!u) return null;
            return (
              <div key={p.id} className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
                <div className="flex gap-3">
                  <Avatar id={u.id} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px]"><b className="font-semibold">{u.name}</b> <span className="text-zinc-500 text-[12px]">· {timeAgo(p.createdAt)}</span></div>
                    <div className="text-[12px] text-zinc-500">{u.role}</div>
                  </div>
                </div>
                <div className="text-[14px] leading-relaxed text-zinc-800 mt-3 whitespace-pre-wrap">{p.body}</div>
                <div className="flex items-center gap-4 mt-3 text-[12.5px] text-zinc-600">
                  <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1.5 hover:text-rose-600">
                    <Heart size={15} className={p.likes.includes(meId) ? 'fill-rose-500 text-rose-500' : ''} /> {p.likes.length}
                  </button>
                  <button onClick={() => setReplyOpen(replyOpen === p.id ? null : p.id)} className="flex items-center gap-1.5">
                    <MessageSquare size={15} /> {p.comments.length}
                  </button>
                </div>

                {p.comments.length > 0 && (
                  <div className="mt-3 space-y-2.5 border-t border-zinc-100 pt-3">
                    {p.comments.map((c, i) => {
                      const cu = users.find(x => x.id === c.userId);
                      if (!cu) return null;
                      return (
                        <div key={i} className="flex gap-2 text-[13px]">
                          <div className="mt-0.5"><Avatar id={cu.id} size={22} /></div>
                          <div><b className="font-semibold">{cu.name}</b> <span className="text-zinc-700">{c.body}</span></div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {replyOpen === p.id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      value={reply}
                      onChange={e => setReply(e.target.value)}
                      placeholder="Write a reply…"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && reply.trim()) { addComment(p.id, reply.trim()); setReply(''); }
                      }}
                      className="flex-1 bg-zinc-100 rounded-full px-3 py-2 text-[13px] outline-none"
                    />
                    <button
                      onClick={() => { if (reply.trim()) { addComment(p.id, reply.trim()); setReply(''); } }}
                      className="px-3 py-2 rounded-full bg-zinc-900 text-white text-[12px]"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center text-[11.5px] text-zinc-400 pb-8">You're all caught up · Built by Owais Ahmed</div>
      </div>
    </aside>
  );
}

/* ----------------------------- task drawer ----------------------------- */

function TaskDrawer() {
  const openTaskId = useApp(s => s.openTaskId);
  const task = useApp(s => s.tasks.find(t => t.id === s.openTaskId));
  const users = useApp(s => s.users);
  const meId = useApp(s => s.currentUserId);
  const updateTask = useApp(s => s.updateTask);
  const addComment = useApp(s => s.addComment);
  const toggleChecklist = useApp(s => s.toggleChecklist);
  const close = useApp(s => s.openTask);
  const [comment, setComment] = useState('');

  return (
    <AnimatePresence>
      {openTaskId && task && (
        <>
          <motion.div
            className="fixed inset-0 bg-zinc-950/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close(null)}
          />
          <motion.div
            initial={{ x: 620 }}
            animate={{ x: 0 }}
            exit={{ x: 620 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed right-0 top-0 h-full w-[600px] max-w-[95vw] bg-[#fefcfb] border-l border-zinc-200 z-50 shadow-2xl flex flex-col"
          >
            <div className="px-7 py-5 border-b border-zinc-200 flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="text-[11.5px] text-zinc-500 font-semibold">FLOW-{task.id.slice(2, 6).toUpperCase()}</div>
                <input
                  defaultValue={task.title}
                  key={task.id}
                  onBlur={e => updateTask(task.id, { title: e.target.value })}
                  className="w-full bg-transparent text-[22px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-200 rounded-lg px-1 -ml-1"
                />
              </div>
              <button onClick={() => close(null)} className="mt-1 w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-auto px-7 py-6 space-y-7">
              <div className="flex flex-wrap gap-6 text-[13px]">
                <div>
                  <div className="text-zinc-500 text-[11.5px]">Assignees</div>
                  <div className="flex -space-x-2 mt-1">
                    {task.assignees.map(a => <div key={a} className="ring-2 ring-[#fefcfb] rounded-full"><Avatar id={a} size={30} /></div>)}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[11.5px]">Priority</div>
                  <div className="flex items-center gap-1.5 mt-1 font-semibold">
                    <Flag size={14} style={{ color: getPriority(task.priority).color }} /> {getPriority(task.priority).label}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[11.5px]">Due</div>
                  <div className="mt-1">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</div>
                </div>
              </div>

              <div>
                <div className="font-semibold mb-2">Description</div>
                <textarea
                  defaultValue={task.description}
                  key={task.id + '-desc'}
                  onBlur={e => updateTask(task.id, { description: e.target.value })}
                  placeholder="Add a description…"
                  className="w-full min-h-[100px] bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[13.5px] outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {task.checklist.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">
                    Checklist · {task.checklist.filter(c => c.done).length}/{task.checklist.length}
                  </div>
                  <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-emerald-500" style={{ width: `${(task.checklist.filter(c => c.done).length / task.checklist.length) * 100}%` }} />
                  </div>
                  <div className="space-y-2">
                    {task.checklist.map(c => (
                      <label key={c.id} className="flex items-center gap-3 px-3 py-2.5 bg-white border border-zinc-200 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={c.done} onChange={() => toggleChecklist(task.id, c.id)} />
                        <span className={cx('text-[13.5px]', c.done && 'line-through text-zinc-400')}>{c.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="font-semibold mb-3">Comments · {task.comments.length}</div>
                <div className="space-y-4">
                  {task.comments.map(cm => {
                    const u = users.find(x => x.id === cm.userId);
                    if (!u) return null;
                    return (
                      <div key={cm.id} className="flex gap-3">
                        <Avatar id={u.id} size={32} />
                        <div className="flex-1 bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5">
                          <div className="text-[12.5px]"><b className="font-semibold">{u.name}</b> <span className="text-zinc-500">· {timeAgo(cm.createdAt)}</span></div>
                          <div className="text-[13.5px] text-zinc-800">{cm.body}</div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex gap-3">
                    <Avatar id={meId} size={32} />
                    <div className="flex-1 flex items-center bg-white border border-zinc-200 rounded-xl px-3">
                      <input
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Write a comment…"
                        className="flex-1 py-3 outline-none text-[13.5px] bg-transparent"
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (comment.trim()) { addComment(task.id, comment.trim()); setComment(''); }
                          }
                        }}
                      />
                      <button
                        onClick={() => { if (comment.trim()) { addComment(task.id, comment.trim()); setComment(''); } }}
                        className="text-zinc-500 hover:text-zinc-900"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11.5px] text-zinc-400 border-t pt-4">
                Real-time comments via WebSocket · Created {timeAgo(task.createdAt)} ago
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- main shell ----------------------------- */

export default function AppShell() {
  const projectId = useApp(s => s.currentProjectId);
  const allTasks = useApp(s => s.tasks);
  const meId = useApp(s => s.currentUserId);
  const memberCount = useApp(s => s.projects.find(p => p.id === s.currentProjectId)?.members.length ?? 0);

  const [view, setView] = useState<'board' | 'list' | 'calendar'>('board');
  const [filterMine, setFilterMine] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    const msgs = [
      'Ayesha completed "Board templates gallery"',
      'Zain is viewing this board',
      'Sara commented on Real-time presence',
    ];
    let i = 0;
    const iv = setInterval(() => {
      toast(msgs[i % msgs.length], { duration: 2600 });
      i++;
    }, 22000);
    return () => clearInterval(iv);
  }, []);

  const tasks = allTasks.filter(
    t =>
      t.projectId === projectId &&
      (!filterMine || t.assignees.includes(meId)) &&
      (filterPriority === 'all' || t.priority === filterPriority)
  );

  return (
    <div className="min-h-screen bg-[#f7f4f1] text-zinc-900">
      <Toaster richColors position="top-right" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Topbar />
          <div className="px-6 py-7">
            <div className="flex items-center gap-3 mb-5 text-[13px] flex-wrap">
              <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-full p-1">
                {([
                  ['board', 'Board', LayoutGrid],
                  ['list', 'List', ListIcon],
                  ['calendar', 'Calendar', Calendar],
                ] as const).map(([key, label, Icon]) => (
                  <button
                    key={key}
                    onClick={() => setView(key)}
                    className={cx(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition',
                      view === key ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
                    )}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setFilterMine(v => !v)}
                className={cx(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full border font-medium',
                  filterMine ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                )}
              >
                <Filter size={14} /> My tasks
              </button>

              <select
                value={filterPriority}
                onChange={e => setFilterPriority(e.target.value)}
                className="px-3 py-2 rounded-full border border-zinc-200 bg-white text-zinc-600 font-medium outline-none cursor-pointer"
              >
                <option value="all">All priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <span className="ml-auto flex items-center gap-2 text-zinc-600">
                <Users size={15} /> {memberCount} members
              </span>
            </div>

            <Stats tasks={tasks} />

            {view === 'board' && <BoardView tasks={tasks} />}
            {view === 'list' && <ListView tasks={tasks} />}
            {view === 'calendar' && <CalendarView tasks={tasks} />}
          </div>
        </main>
        <ActivityFeed />
      </div>
      <TaskDrawer />
    </div>
  );
}
