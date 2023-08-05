import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const backendWork = false
const today = new Date();
const dayOfWeek = today.getDay();
const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
const mondayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + difference);
const mondayDateFormat = mondayDate.toISOString().slice(0, 10)
let defaultState;
if (backendWork) {
  var response = await fetch(`http://127.0.0.1:5005/get_week_tasks/${mondayDateFormat}`);
  const tasks = await response.json();
  var response = await fetch(`http://127.0.0.1:5005/get_week/${mondayDateFormat}`);
  const week = await response.json();
  defaultState = tasks && week && {
    mon_date: mondayDate,
    tasks: tasks,
    tracker_order: week.tracker_order,
    list_order: week.list_order,
    drag_task: undefined
  }
}
else {
  defaultState = {
    mon_date: mondayDate,
    tasks: {
      1: { task: "Hello world 1", status: 2, days: [1, 1, 1, 0, 0, 0, 0] },
      2: { task: "Hello world 2", status: 1, days: [1, 1, 1, 2, 2, 0, 0] },
      3: { task: "Hello world 3", status: 0, days: [0, 0, 0, 0, 1, 2, 1] },
      4: { task: "Hello world 4", status: 0, days: [0, 0, 0, 0, 1, 2, 1] },
      5: { task: "Hello world 5", status: 0, days: [0, 0, 0, 0, 1, 2, 1] },
      6: { task: "Hello world 6", status: 0, days: [0, 0, 0, 0, 1, 2, 1] }
    },
    tracker_order: [3, 1, 4, 6, 2],
    list_order: [[1, 3, 5], [2, 4, 6]]
  }
}

const reducer = (state = defaultState, action) => {
  const temp_tasks = JSON.parse(JSON.stringify(state.tasks))
  const temp_list_order = JSON.parse(JSON.stringify(state.list_order))
  switch (action.type) {
    case "drag_start":
      return { ...state, drag_task: action.payload.key }
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
    case "change_tracker_order":
      const new_tracker_order = JSON.parse(JSON.stringify(action.payload.new_tracker_order))
      return { ...state, tracker_order: new_tracker_order }
    case "change_list_order":
      const new_list_order = JSON.parse(JSON.stringify(action.payload.new_list_order))
      return { ...state, list_order: new_list_order }
    case "add_to_tr":
      if (state.tracker_order.indexOf(action.payload.task) == -1) {
        const a = [...state.tracker_order]
        a.push(action.payload.task)
        fetch('http://127.0.0.1:5005/edit_week', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: "2022-07-03",
            tracker_order: a,
          }),
        })
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