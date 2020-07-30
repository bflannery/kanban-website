import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/slices/tasksSlice'

export default function FormDialog({ onClose, open }) {
  const initialState = {
    name: '',
    id: uuid()
  }
  const [newTask, updateNewTask] = useState(initialState)

  const dispatch = useDispatch()

  const handleOnSubmit = () => dispatch(addTask(newTask))

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            onChange={updateNewTask}
            autoFocus
            margin="dense"
            id={`new-task-${newTask.uuid}-name`}
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            onChange={updateNewTask}
            margin="dense"
            id={`new-task-${newTask.uuid}-description`}
            label="Description"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
