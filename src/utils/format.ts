import { format, formatISO } from 'date-fns';
import type { TimeEntry } from '../types.js';

export function renderTimeEntry(entry: TimeEntry): string {
  const id = entry.id ?? '—';
  const project = entry.projectId ?? '—';
  const start = entry.startTime ? format(new Date(entry.startTime), 'yyyy-MM-dd HH:mm') : '—';
  const end = entry.endTime ? format(new Date(entry.endTime), 'yyyy-MM-dd HH:mm') : 'running';
  const duration = typeof entry.duration === 'number' ? `${entry.duration / 60}h` : '—';
  return `${id}\t${project}\t${start}\t${end}\t${duration}`;
}

export function renderSummary(summary: { totalDuration?: number; entries?: number; period?: { start: string; end: string } }): string {
  const period = summary.period
    ? `${formatISO(new Date(summary.period.start), { representation: 'date' })} → ${formatISO(new Date(summary.period.end), { representation: 'date' })}`
    : '—';
  return `Period: ${period}\nEntries: ${summary.entries ?? '—'}\nTotal: ${typeof summary.totalDuration === 'number' ? `${summary.totalDuration / 60}h` : '—'}`;
}
