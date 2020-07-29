import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'

export default function KanbanItem({ id, children }) {
  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  drag(ref)

  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  )
}
