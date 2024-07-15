import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanbanCard";
import { Task, TaskState } from "./types";

interface KanbanLaneProps {
  title: string;
  state: TaskState;
  items: Task[];
}

export function KanbanLane({ title, state, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <Flex flex="3" padding="5" flexDirection="column" minH="10rem" border="1px solid lightgray">
      <Text fontWeight="bold" textTransform="capitalize">{title}</Text>
      <Flex
        ref={setNodeRef}
        backgroundColor="gray.200"
        borderRadius="8"
        flex="1"
        padding="2"
        flexDirection="column"
      >
        {items.map((task, key) => (
          <KanbanCard task={task} key={key} index={key} parent={state} />
        ))}
      </Flex>
    </Flex>
  );
}
