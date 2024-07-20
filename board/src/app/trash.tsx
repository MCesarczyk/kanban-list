import { Flex } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';

export function Trash() {
  const { setNodeRef } = useDroppable({
    id: 'REMOVE',
  });
  return (
    <Flex
      ref={setNodeRef}
      borderRadius="8"
      flex="0"
      padding="2"
      color="white"
      backgroundColor="red.400"
    >
      Delete&nbsp;🗑
    </Flex>
  );
}
