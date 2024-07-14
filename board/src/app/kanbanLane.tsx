import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanbanCard";
import { Card } from "./types";

interface KanbanLaneProps {
  title: string;
  items: Card[];
}

export default function KanbanLane({ title, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <Flex flex="3" padding="5" flexDirection="column" minH="10rem" border="1px solid lightgray">
      <Text fontWeight="bold" textTransform="capitalize">{title.replace('_',' ')}</Text>
      <Flex
        ref={setNodeRef}
        backgroundColor="gray.200"
        borderRadius="8"
        flex="1"
        padding="2"
        flexDirection="column"
      >
        {items.map(({ title: cardTitle }, key) => (
          <KanbanCard title={cardTitle} key={key} index={key} parent={title} />
        ))}
      </Flex>
    </Flex>
  );
}
