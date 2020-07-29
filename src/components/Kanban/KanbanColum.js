import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import makeStyles from '@material-ui/styles/makeStyles'
import KanbanItem from './KanbanItem'

const LABELS = {
  backlog: 'Backlog',
  wip: 'In Progress',
  review: 'Review',
  done: 'Done'
}

const useStyles = makeStyles(theme => ({
  column: {
    minWidth: 200,
    width: '18vw',
    height: '80vh',
    backgroundColor: theme.palette.common.neutral,
    border: `1px solid ${theme.palette.common.grey[500]}`,
    borderRadius: '5px'
  },
  columnHead: {
    textAlign: 'center',
    padding: 10,
    fontSize: '1.2em',
    backgroundColor: theme.palette.common.grey[400]
  }
}))

export default function KanbanColumn({
  column,
  status,
  changeTaskStatus,
  tasks
}) {
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
      <div className={classes.columnHead}>{LABELS[column]}</div>
      <div>
        {tasks.map(item => (
          <KanbanItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

KanbanColumn.propTypes = {
  status: PropTypes.string.isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
  column: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired
}
