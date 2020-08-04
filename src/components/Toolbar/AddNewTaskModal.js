import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNewTask,
  newTaskSelector,
  submitNewTask,
  updateNewTask
} from '../../redux/slices/tasksSlice'

export default function FormDialog({ open }) {
  const newTask = useSelector(newTaskSelector)

  const dispatch = useDispatch()

  const handleOnChange = e => {
    const { name, value } = e.target
    dispatch(updateNewTask({ ...newTask, [name]: value }))
  }

  const handleOnClose = () => {
    dispatch(setNewTask(null))
  }

  const handleOnSubmit = () => {
    dispatch(submitNewTask(newTask))
    dispatch(setNewTask(null))
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleOnClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
        <DialogContent dividers>
          <TextField
            onChange={handleOnChange}
            autoFocus
            margin="dense"
            id={`new-task-${newTask.uuid}-name`}
            label="Name"
            name="name"
            type="text"
            fullWidth
          />
          <TextField
            multiline
            rows={10}
            onChange={handleOnChange}
            margin="dense"
            id={`new-task-${newTask.uuid}-description`}
            label="Description"
            name="description"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} color="primary">
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

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired
}
