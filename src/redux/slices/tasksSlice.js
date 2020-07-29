import { createSlice } from '@reduxjs/toolkit'

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
    tasks: tasksList
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action) => {
      state.tasks.filter((todo) => todo.id === action.payload)
    },
    updateTasks: (state, action) => {
      console.log({ stateTasks: state.tasks, action })
      state.tasks = action.payload
    }
  }
})

// Reducer actions
export const { addTask, removeTask, updateTasks } = tasksSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const tasksSelector = (state) => state.tasks.tasks || []

export default tasksSlice.reducer
