import React, { useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import makeStyles from '@material-ui/styles/makeStyles'
import { useDispatch, useSelector } from 'react-redux'
import KanbanColumn from './KanbanColum'
import { tasksSelector, updateTasks } from '../../redux/slices/tasksSlice'

const COLUMNS = ['backlog', 'wip', 'review', 'done']

const useStyles = makeStyles(() => ({
  board: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    marginTop: '2rem',
    width: '90vw'
  }
}))

export default function KanbanBoard() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const tasks = useSelector(tasksSelector)

  const updateNewOrderTasks = updatedTasks =>
    dispatch(updateTasks(updatedTasks))

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find(t => t.id === id)
      const taskIndex = tasks.indexOf(task)
      task = { ...task, status }
      const updatedTasks = update(tasks, {
        [taskIndex]: { $set: task }
      })

      updateNewOrderTasks(updatedTasks)
    },
    [tasks]
  )

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <section className={classes.board}>
          {COLUMNS.map(column => {
            const columnTasks = tasks.filter(t => t.status === column)
            return (
              <KanbanColumn
                changeTaskStatus={changeTaskStatus}
                column={column}
                key={column}
                status={column}
                tasks={columnTasks}
              />
            )
          })}
        </section>
      </DndProvider>
    </main>
  )
}
