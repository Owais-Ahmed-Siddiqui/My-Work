export const cx = (...a: (string | false | undefined | null)[]) => a.filter(Boolean).join(' ');

export function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime())/1000;
  if (s < 60) return 'now';
  const m = s/60; if (m < 60) return `${Math.floor(m)}m`;
  const h = m/60; if (h < 24) return `${Math.floor(h)}h`;
  const d = h/24; if (d < 7) return `${Math.floor(d)}d`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const priorityMeta = {
  low: { label: 'Low', color: '#8b8b96' },
  medium: { label: 'Medium', color: '#d99719' },
  high: { label: 'High', color: '#e5533d' },
  urgent: { label: 'Urgent', color: '#d32b5b' },
};
