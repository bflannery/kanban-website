import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import makeStyles from '@material-ui/styles/makeStyles'
import KanbanItem from './KanbanItem'

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

export default function KanbanColumn({ column, changeTaskStatus, tasks }) {
  const classes = useStyles(column)

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'card',
    drop(item) {
      changeTaskStatus(item.id, column.key)
    }
  })

  drop(ref)

  return (
    <div ref={ref} className={classes.column}>
      <div className={classNames(classes.columnHead, classes.columnHeadColor)}>
        {column.label}
      </div>
      <div>
        {tasks.map(item => (
          <KanbanItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

KanbanColumn.propTypes = {
  changeTaskStatus: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired
}
