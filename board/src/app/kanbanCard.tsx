import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./types";

interface KanbanCardProps {
  task: Task;
  index: number;
  parent: string;
}

export const KanbanCard = ({
  task,
  index,
  parent,
}: KanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      id: task.id,
      content: task.content,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <Flex
      padding="3"
      backgroundColor="white"
      margin="2"
      borderRadius="8"
      border="2px solid gray.500"
      boxShadow="0px 0px 5px 2px #2121213b"
      transform={style.transform}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <Text>{task.content}</Text>
    </Flex>
  );
};
