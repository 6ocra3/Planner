import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

var response = await fetch('http://127.0.0.1:5005/get_week_tasks/2022-07-03');
const tasks = await response.json();
var response = await fetch('http://127.0.0.1:5005/get_week/2022-07-03');
const week = await response.json();
const defaultState = tasks && week && {
  tasks: tasks,
  tracker_order: week.tracker_order,
  list_order: week.list_order
}

const reducer = (state = defaultState, action) => {
  const temp_tasks = JSON.parse(JSON.stringify(state.tasks))
  const temp_list_order = JSON.parse(JSON.stringify(state.list_order))
  switch (action.type) {
    case "change_display":
      fetch('http://127.0.0.1:5005/edit_task_day', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_id: action.payload.task,
          day: action.payload.day,
          value: (temp_tasks[action.payload.task].days[action.payload.day] + 1) % 4
        }),
      })
      temp_tasks[action.payload.task].days[action.payload.day] = (temp_tasks[action.payload.task].days[action.payload.day] + 1) % 4
      return { ...state, tasks: temp_tasks }
    case "change_status":
      fetch('http://127.0.0.1:5005/edit_task_status', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_id: action.payload.task,
          status: (temp_tasks[action.payload.task].status + 1) % 3
        }),
      })
      console.log(action.payload.task)
      temp_tasks[action.payload.task].status = (temp_tasks[action.payload.task].status + 1) % 3
      return { ...state, tasks: temp_tasks }
    case "create_task":
      fetch('http://127.0.0.1:5005/create_task', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: "2022-07-03",
          task: action.payload.task,
          column: action.payload.col
        }),
      })
      const keys = Object.keys(temp_tasks);
      const maxKey = Math.max(...keys);
      const new_task = { task: action.payload.task, status: 0, days: [0, 0, 0, 0, 0, 0, 0] }
      temp_tasks[maxKey + 1] = JSON.parse(JSON.stringify(new_task))
      temp_list_order[action.payload.col].push(maxKey + 1)
      return { ...state, list_order: temp_list_order, tasks: temp_tasks }
    case "add_to_tr":
      console.log(!(action.payload.task in state.tracker_order))
      console.log(state.tracker_order, action.payload.task)
      console.log(state.tasks[action.payload.task])
      if (state.tracker_order.indexOf(action.payload.task) == -1) {
        const a = [...state.tracker_order]
        a.push(action.payload.task)
        return { ...state, tracker_order: a }
      }
      return state
    default:
      return state
  }
}
const store = configureStore({ reducer: reducer, preloadedState: defaultState })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {defaultState && <Provider store={store}>
      <App />
    </Provider>}
  </React.StrictMode>,
)