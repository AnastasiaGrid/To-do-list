import { TPriority, TStatus } from './types.ts';

export const TASK_PRIORITY: Record<string, TPriority> = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export const TASK_STATUS: Record<string, TStatus> = {
  TO_DO: 'to do',
  IN_PROGRESS: 'in progress',
  DONE: 'done'
} as const;

export const TASK_STATUS_OPTIONS = Object.values(TASK_STATUS);
export const TASK_PRIORITY_OPTIONS = Object.values(TASK_PRIORITY);