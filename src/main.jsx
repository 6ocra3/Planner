import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
const a = [1, 0]

const defaultState = {
  tasks: {
    0: { task: "Hello world!", status: 0, days: [0, 0, 0, 0, 0, 0, 0] },
    1: { task: "Hello world 2!", status: 1, days: [0, 0, 0, 0, 0, 0, 0] },
    2: { task: "Hello world 3!", status: 2, days: [0, 0, 0, 0, 0, 0, 0] }
  },
  tr_order: JSON.parse(JSON.stringify(a)),
  col_order: [[0, 1], [2], []]
}

const reducer = (state = defaultState, action) => {
  const temp_tasks = JSON.parse(JSON.stringify(state.tasks))
  const temp_col_order = JSON.parse(JSON.stringify(state.col_order))
  switch (action.type) {
    case "change_display":
      temp_tasks[action.payload.task].days[action.payload.day] = (temp_tasks[action.payload.task].days[action.payload.day] + 1) % 4
      return { ...state, tasks: temp_tasks }
    case "change_status":
      temp_tasks[action.payload.task].status = (temp_tasks[action.payload.task].status + 1) % 3
      return { ...state, tasks: temp_tasks }
    case "create_task":
      const keys = Object.keys(temp_tasks);
      const maxKey = Math.max(...keys);
      const new_task = { task: action.payload.task, status: 0, days: [0, 0, 0, 0, 0, 0, 0] }
      temp_tasks[maxKey + 1] = JSON.parse(JSON.stringify(new_task))
      temp_col_order[action.payload.col].push(maxKey + 1)
      return { ...state, col_order: temp_col_order, tasks: temp_tasks }
    case "add_to_tr":
      console.log(!(action.payload.task in state.tr_order))
      console.log(state.tr_order, action.payload.task)
      console.log(state.tasks[action.payload.task])
      if (state.tr_order.indexOf(action.payload.task) == -1) {
        const a = [...state.tr_order]
        a.push(action.payload.task)
        return { ...state, tr_order: a }
      }
      return state
    default:
      return state
  }
}

const store = configureStore({ reducer: reducer })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
