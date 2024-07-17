import { useState } from 'react';
import { rectIntersection } from '@dnd-kit/core';
import { Flex } from '@chakra-ui/react';
import { KanbanLane } from './kanbanLane';
import { AddCard } from './addCard';
import { Task, TaskState } from './types';
import { tasksMock } from './fixtures';
import { filterTasksByState } from './helpers';
import { DragDropContainer } from './sensors';

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Array<Task>>(tasksMock as Task[]);

  const addNewCard = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <DragDropContainer
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const taskId = e.active.data.current?.id ?? '';
        const parent = e.active.data.current?.parent;

        const currentTask = tasks.find((task) => task.id === taskId);

        if (container === undefined && parent === TaskState.UNASSIGNED) {
          return;
        }

        const newTasks = tasks.filter((task) => task.id !== taskId);

        if (!currentTask) {
          return;
        }

        switch (container) {
          case TaskState.TODO:
            setTasks([...newTasks, { ...currentTask, state: TaskState.TODO }]);
            break;
          case TaskState.DONE:
            setTasks([...newTasks, { ...currentTask, state: TaskState.DONE }]);
            break;
          case TaskState.IN_PROGRESS:
            setTasks([
              ...newTasks,
              { ...currentTask, state: TaskState.IN_PROGRESS },
            ]);
            break;
          default:
            setTasks([
              ...newTasks,
              { ...currentTask, state: TaskState.UNASSIGNED },
            ]);
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
    </DragDropContainer>
  );
}
