import { useEffect, useState } from 'react';
import { DndContext, rectIntersection } from '@dnd-kit/core';
import { Flex } from '@chakra-ui/react';
import { KanbanLane } from './kanbanLane';
import { AddCard } from './addCard';
import { Task, TaskState } from './types';
import { tasksMock } from './fixtures';
import { filterTasksByState } from './helpers';

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Array<Task>>(tasksMock as Task[]);
  const [todoItems, setTodoItems] = useState<Array<Task>>([]);
  const [doneItems, setDoneItems] = useState<Array<Task>>([]);
  const [inProgressItems, setInProgressItems] = useState<Array<Task>>([]);
  const [uItems, setuItems] = useState<Array<Task>>([]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const addNewCard = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const taskId = e.active.data.current?.id ?? '';
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent;

        const allTasks = [
          ...todoItems,
          ...doneItems,
          ...inProgressItems,
          ...uItems,
        ];
        const currentTask = allTasks.find((task) => task.id === taskId);

        if (container === undefined && parent === TaskState.UNASSIGNED) {
          return;
        }

        if (container === TaskState.TODO && !!currentTask) {
          setTodoItems([...todoItems, currentTask]);
        } else if (container === TaskState.DONE && !!currentTask) {
          setDoneItems([...doneItems, currentTask]);
        } else if (container === TaskState.IN_PROGRESS && !!currentTask) {
          setInProgressItems([...inProgressItems, currentTask]);
        } else {
          !!currentTask && setuItems([...uItems, currentTask]);
        }

        if (parent === TaskState.TODO) {
          setTodoItems([
            ...todoItems.slice(0, index),
            ...todoItems.slice(index + 1),
          ]);
        } else if (parent === TaskState.DONE) {
          setDoneItems([
            ...doneItems.slice(0, index),
            ...doneItems.slice(index + 1),
          ]);
        } else if (parent === TaskState.IN_PROGRESS) {
          setInProgressItems([
            ...inProgressItems.slice(0, index),
            ...inProgressItems.slice(index + 1),
          ]);
        } else {
          setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
        }
      }}
    >
      <Flex flexDirection="column" gap="4" padding="4">
        <h1>Kanban board</h1>
        <AddCard addCard={addNewCard} />
        <Flex flex="3" gap="4">
          <KanbanLane
            title="Unassigned"
            state={TaskState.UNASSIGNED}
            items={filterTasksByState(tasks, TaskState.UNASSIGNED)}
          />
          <KanbanLane
            title="Todo"
            state={TaskState.TODO}
            items={filterTasksByState(tasks, TaskState.TODO)}
          />
          <KanbanLane
            title="In Progress"
            state={TaskState.IN_PROGRESS}
            items={filterTasksByState(tasks, TaskState.IN_PROGRESS)}
          />
          <KanbanLane
            title="Done"
            state={TaskState.DONE}
            items={filterTasksByState(tasks, TaskState.DONE)}
          />
        </Flex>
      </Flex>
    </DndContext>
  );
}
