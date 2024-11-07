import { Priority, Status } from './const';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: (typeof Status)[keyof typeof Status];
  priority: (typeof Priority)[keyof typeof Priority];
  createTimestampMs: number;
  lastUpdatedTimestampMs: number;
}
