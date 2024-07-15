import { Task, TaskState } from "./types";

export const filterTasksByState = (tasks: Task[], currentState: TaskState) => tasks.filter(({ state }) => state === currentState);
