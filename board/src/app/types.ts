export interface Card {
  title: string;
}

export enum TaskState {
  UNASSIGNED = 'UNASSIGNED',
  TODO = 'PLANNED',
  IN_PROGRESS = 'RUNNING',
  DONE = 'COMPLETED'
}

export interface Task {
  id: string;
  content: string;
  state: TaskState;
  userId: string;
}
