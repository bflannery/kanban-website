import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import makeStyles from '@material-ui/styles/makeStyles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  item: {
    padding: 10,
    margin: 10,
    fontSize: '0.8em',
    cursor: 'pointer',
    backgroundColor: 'white'
  }
}))

export default function KanbanItem({ item }) {
  const classes = useStyles()

  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id: item.id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  drag(ref)

  return (
    <div ref={ref} style={{ opacity }}>
      <div className={classes.item}>{item.title}</div>
    </div>
  )
}

const TASK_SHAPE = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

KanbanItem.propTypes = {
  item: PropTypes.shape(TASK_SHAPE).isRequired
}
