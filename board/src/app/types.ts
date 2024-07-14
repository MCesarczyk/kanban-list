export interface Card {
  title: string;
}

export enum TaskState {
  UNASSIGNED = 'unassigned',
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}
