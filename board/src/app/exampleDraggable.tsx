import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const MyDraggableComponent = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-1',
    data: {
      parent: 'ToDo',
      title: 'Lorem ipsum.',
    },
  });
  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      Drag Me!
    </div>
  );
};
