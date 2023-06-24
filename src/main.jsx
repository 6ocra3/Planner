import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const a = [{ name: "a", order: 1 }, { name: "c", order: 4 }, { name: "b", order: 2 }]
// const defaultState = {
//   tasks: [{ key: 0, task: "Hello world!", col_order: 1, tr_order: 2, column: 1, days: [1, 2, 3, 0, 0, 0, 0] },
//   { key: 1, task: "Hello world 2!", col_order: 2, tr_order: 1, column: 1, days: [1, 2, 3, 0, 0, 0, 0] }],
// }

const defaultState = {
  tasks: {
    0: { task: "Hello world!", col_order: 1, tr_order: 2, column: 1, days: [1, 2, 3, 0, 0, 0, 0] },
    1: { task: "Hello world 2!", col_order: 2, tr_order: 1, column: 1, days: [1, 2, 3, 0, 0, 0, 0] }
  },
  tr_order: [1, 0],
  col_order: [[0, 1], [], []]
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "change_display":
      const temp_tasks = JSON.parse(JSON.stringify(state.tasks))
      temp_tasks[action.payload.task].days[action.payload.day] = (temp_tasks[action.payload.task].days[action.payload.day] + 1) % 4
      return { ...state, tasks: temp_tasks }
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
