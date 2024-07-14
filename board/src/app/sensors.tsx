import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';

export const DragDropContainer = () => {

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor)

  return (<DndContext sensors={sensors}>.....</DndContext>)
}
