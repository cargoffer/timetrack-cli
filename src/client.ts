import { TimeEntry, Project, Client, Task, Summary } from './types.js';
import { getApiKey, getApiBase } from './config.js';

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown,
    message?: string
  ) {
    super(message ?? `API error ${status}`);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const apiKey = getApiKey();
  const base = getApiBase();
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      ...(init?.headers ?? {}),
    },
  });

  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    throw new ApiError(res.status, body, typeof body === 'string' ? body : undefined);
  }

  return body as T;
}

export const client = {
  timeEntries: {
    list: () => request<TimeEntry[]>('/time-entries'),
    start: (body: Partial<TimeEntry>) =>
      request<TimeEntry>('/time-entries/start', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    stop: (id: string) =>
      request<TimeEntry>(`/time-entries/${encodeURIComponent(id)}/stop`, {
        method: 'POST',
      }),
    active: () => request<TimeEntry>('/time-entries/active'),
    create: (body: Partial<TimeEntry>) =>
      request<TimeEntry>('/time-entries', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
  projects: {
    list: () => request<Project[]>('/projects'),
    create: (body: Partial<Project>) =>
      request<Project>('/projects', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
  clients: {
    list: () => request<Client[]>('/clients'),
    create: (body: Partial<Client>) =>
      request<Client>('/clients', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
  tasks: {
    list: (projectId?: string) => {
      const qs = projectId ? `?project_id=${encodeURIComponent(projectId)}` : '';
      return request<Task[]>(`/tasks${qs}`);
    },
    create: (body: Partial<Task>) =>
      request<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
  summary: {
    weekly: () => request<Summary>('/reports/weekly'),
    daily: () => request<Summary>('/reports/daily'),
  },
};
