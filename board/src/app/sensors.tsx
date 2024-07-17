import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ComponentProps } from 'react';

export const DragDropContainer = (props: ComponentProps<typeof DndContext>) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  return <DndContext {...props} {...{ sensors }} />;
};
