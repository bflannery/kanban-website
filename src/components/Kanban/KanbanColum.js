import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  column: {
    minWidth: 200,
    width: '18vw',
    height: '80vh',
    backgroundColor: theme.palette.common.neutral,
    border: `1px solid ${theme.palette.common.grey[500]}`,
    borderRadius: '5px'
  }
}))

export default function KanbanColumn({ status, changeTaskStatus, children }) {
  const classes = useStyles()
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'card',
    drop(item) {
      changeTaskStatus(item.id, status)
    }
  })

  drop(ref)

  return (
    <div ref={ref} className={classes.column}>
      {children}
    </div>
  )
}
