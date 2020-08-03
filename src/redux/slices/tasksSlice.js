import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const tasksList = [
  { id: 1, title: 'First Task', status: 'backlog' },
  { id: 2, title: 'Second Task', status: 'backlog' },
  { id: 3, title: 'Third Task', status: 'backlog' },
  { id: 4, title: 'Fourth Task', status: 'new' },
  { id: 5, title: 'Fifth Task', status: 'new' },
  { id: 6, title: 'Sixth Task', status: 'wip' },
  { id: 7, title: 'Seventh Task', status: 'review' },
  { id: 8, title: 'Eighth Task', status: 'review' },
  { id: 9, title: 'Ninth Task', status: 'done' },
  { id: 10, title: 'Tenth Task', status: 'done' }
]

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    newTask: null,
    tasks: tasksList,
    apiStatus: {
      isLoading: false,
      hasLoaded: true,
      error: null
    }
  },
  reducers: {
    addNewTask: (state, action) => {
      state.newTask = action.payload
    },
    removeTask: (state, action) => {
      state.tasks.filter(todo => todo.id === action.payload)
    },
    updateNewTask: (state, action) => {
      state.newTask = action.payload
    },
    updateTasks: (state, action) => {
      console.log({ stateTasks: state.tasks, action })
      state.tasks = action.payload
    },
    postTasksRequest: state => {
      state.apiStatus.isLoading = true
      state.apiStatus.hasLoaded = false
    },
    postTasksSuccess: (state, action) => {
      state.apiStatus.isLoading = false
      state.apiStatus.hasLoaded = true
    },
    postTasksError: (state, action) => {
      console.log({ action })
      state.apiStatus.isLoading = false
      state.apiStatus.hasLoaded = false
      state.apiStatus.error = action.payload
    }
  }
})

// Reducer actions
export const {
  addNewTask,
  postTasksError,
  postTasksRequest,
  postTasksSuccess,
  removeTask,
  updateNewTask,
  updateTasks
} = tasksSlice.actions

export const submitNewTask = newTask => async dispatch => {
  console.log({ newTask })
  dispatch(postTasksRequest())
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://87gv9douxg.execute-api.us-east-1.amazonaws.com/dev/tasks',
      data: JSON.stringify(newTask)
    })
    console.log({ response })
    dispatch(postTasksSuccess())
  } catch (err) {
    console.log({ err })
    dispatch(postTasksError(err.message))
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const tasksSelector = state => state.tasks.tasks
export const newTaskSelector = state => state.tasks.newTask

export default tasksSlice.reducer
