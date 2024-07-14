import { useState } from 'react';
import { DndContext, rectIntersection } from '@dnd-kit/core';
import { Flex } from '@chakra-ui/react';
import KanbanLane from './kanbanLane';
import { AddCard } from './addCard';
import { Card, TaskState } from './types';
export default function KanbanBoard() {
  const [todoItems, setTodoItems] = useState<Array<Card>>([]);
  const [doneItems, setDoneItems] = useState<Array<Card>>([]);
  const [inProgressItems, setInProgressItems] = useState<Array<Card>>([]);
  const [uItems, setuItems] = useState<Array<Card>>([]);
  const addNewCard = (title: string) => {
    setuItems([...uItems, { title }]);
  };
  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? '';
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent;

        if (container === undefined && parent === TaskState.UNASSIGNED) {
          return;
        }

        if (container === TaskState.TODO) {
          setTodoItems([...todoItems, { title }]);
        } else if (container === TaskState.DONE) {
          setDoneItems([...doneItems, { title }]);
        } else if (container === TaskState.IN_PROGRESS) {
          setInProgressItems([...inProgressItems, { title }]);
        } else {
          setuItems([...uItems, { title }]);
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
          <KanbanLane title={TaskState.UNASSIGNED} items={uItems} />
          <KanbanLane title={TaskState.TODO} items={todoItems} />
          <KanbanLane title={TaskState.IN_PROGRESS} items={inProgressItems} />
          <KanbanLane title={TaskState.DONE} items={doneItems} />
        </Flex>
      </Flex>
    </DndContext>
  );
}
