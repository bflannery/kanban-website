import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: []
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action) => {
      state.tasks.filter((todo) => todo.name === action.payload.name)
    }
  }
})

// Reducer actions
export const { addTask, removeTask } = tasksSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const todosSelector = (state) => state.tasks.tasks || []

export default tasksSlice.reducer
