import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewTask,
  newTaskSelector,
  submitNewTask,
  updateNewTask
} from '../../redux/slices/tasksSlice'

export default function FormDialog({ onClose, open }) {
  const newTask = useSelector(newTaskSelector)

  const dispatch = useDispatch()

  const handleOnChange = e => {
    const { name, value } = e.target
    dispatch(updateNewTask({ ...newTask, [name]: value }))
  }

  const handleOnSubmit = () => {
    dispatch(submitNewTask(newTask))
    dispatch(addNewTask(null))
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
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
