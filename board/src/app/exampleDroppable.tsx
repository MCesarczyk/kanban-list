import {useDroppable} from "@dnd-kit/core"

export const MyDroppableComponent = () => {
  const {setNodeRef} = useDroppable({
    id: 'droppable-1'
  })

  return <div ref={setNodeRef}> Drop on me! </div>
}
