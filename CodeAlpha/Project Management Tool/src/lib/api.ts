// Flowboard API client
// Author: Owais Ahmed
// Point this at the FastAPI backend if you want real persistence.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let token = localStorage.getItem('flowboard_jwt') || '';

export function setToken(t: string) {
  token = t;
  localStorage.setItem('flowboard_jwt', t);
}

async function req(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {})
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}

export const api = {
  login: (email: string, password: string) => req('/api/auth/login', { method:'POST', body: JSON.stringify({email,password}) }),
  register: (name: string, email: string, password: string) => req('/api/auth/register', { method:'POST', body: JSON.stringify({name,email,password}) }),
  me: () => req('/api/me'),
  projects: () => req('/api/projects'),
  createProject: (name: string, description = '') => req('/api/projects', { method:'POST', body: JSON.stringify({name, description}) }),
  projectTasks: (project_id: string) => req(`/api/projects/${project_id}/tasks`),
  createTask: (data: any) => req('/api/tasks', { method:'POST', body: JSON.stringify(data) }),
  updateTask: (id: string, patch: any) => req(`/api/tasks/${id}`, { method:'PATCH', body: JSON.stringify(patch) }),
  comments: (task_id: string) => req(`/api/tasks/${task_id}/comments`),
  addComment: (task_id: string, body: string) => req(`/api/tasks/${task_id}/comments`, { method:'POST', body: JSON.stringify({body}) }),
  feed: () => req('/api/feed'),
  postFeed: (body: string, project_id?: string) => req('/api/feed', { method:'POST', body: JSON.stringify({body, project_id}) }),
};

export function connectRealtime(onEvent: (e: any) => void) {
  const wsUrl = (import.meta.env.VITE_WS_URL as string) || 'ws://localhost:8000/ws/feed';
  try {
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (ev) => { try { onEvent(JSON.parse(ev.data)) } catch {} };
    return () => ws.close();
  } catch { return () => {} }
}
