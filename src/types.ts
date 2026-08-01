import { z } from 'zod';

export const TimeEntrySchema = z.object({
  id: z.string().optional(),
  projectId: z.string().optional(),
  taskId: z.string().optional(),
  clientId: z.string().optional(),
  description: z.string().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  duration: z.number().int().nonnegative().optional(),
  billable: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export type TimeEntry = z.infer<typeof TimeEntrySchema>;

export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  clientId: z.string().optional(),
  color: z.string().optional(),
  billable: z.boolean().optional(),
  archived: z.boolean().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ClientSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type Client = z.infer<typeof ClientSchema>;

export const TaskSchema = z.object({
  id: z.string().optional(),
  projectId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['open', 'in_progress', 'completed', 'archived']).optional(),
  assigneeId: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const SummarySchema = z.object({
  totalDuration: z.number().int().nonnegative(),
  entries: z.number().int().nonnegative(),
  projects: z.array(z.string()),
  billableDuration: z.number().int().nonnegative().optional(),
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
});

export type Summary = z.infer<typeof SummarySchema>;
