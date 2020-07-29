import React, { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import makeStyles from '@material-ui/styles/makeStyles'
import KanbanColumn from './KanbanColum'
import KanbanItem from './KanbanItem'

const tasksList = [
  // { _id: 1, title: 'First Task', status: 'backlog' },
  // { _id: 2, title: 'Second Task', status: 'backlog' },
  // { _id: 3, title: 'Third Task', status: 'backlog' },
  // { _id: 4, title: 'Fourth Task', status: 'new' },
  // { _id: 5, title: 'Fifth Task', status: 'new' },
  // { _id: 6, title: 'Sixth Task', status: 'wip' },
  // { _id: 7, title: 'Seventh Task', status: 'review' },
  // { _id: 8, title: 'Eighth Task', status: 'review' },
  // { _id: 9, title: 'Ninth Task', status: 'done' },
  // { _id: 10, title: 'Tenth Task', status: 'done' }
]

const channels = ['backlog', 'wip', 'review', 'done']

const labelsMap = {
  backlog: 'Backlog',
  wip: 'In Progress',
  review: 'Review',
  done: 'Done'
}

const useStyles = makeStyles((theme) => ({
  board: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    marginTop: '2rem',
    width: '90vw'
  },
  columnHead: {
    textAlign: 'center',
    padding: 10,
    fontSize: '1.2em',
    backgroundColor: theme.palette.common.grey[400]
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: '0.8em',
    cursor: 'pointer',
    backgroundColor: 'white'
  }
}))

export default function KanbanBoard() {
  const classes = useStyles()
  const [tasks, setTaskStatus] = useState(tasksList)

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find((task) => task._id === id)
      const taskIndex = tasks.indexOf(task)
      task = { ...task, status }
      const newTasks = update(tasks, {
        [taskIndex]: { $set: task }
      })
      setTaskStatus(newTasks)
    },
    [tasks]
  )

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <section className={classes.board}>
          {channels.map((channel) => (
            <KanbanColumn
              key={channel}
              status={channel}
              changeTaskStatus={changeTaskStatus}
            >
              <>
                <div className={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {tasks
                    .filter((item) => item.status === channel)
                    .map((item) => (
                      <KanbanItem key={item.id} id={item.id}>
                        <div style={classes.item}>{item.title}</div>
                      </KanbanItem>
                    ))}
                </div>
              </>
            </KanbanColumn>
          ))}
        </section>
      </DndProvider>
    </main>
  )
}
