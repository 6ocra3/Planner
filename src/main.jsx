import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { dateF, dateSlice } from './utils/DateFunctions.js';
import thunkMiddleware from 'redux-thunk';
const backendWork = false
const today = new Date();
const dayOfWeek = today.getDay();
const MS_IN_DAY = 60 * 60 * 24 * 1000
const test = [6, 0, 1, 2, 3, 4, 5]
const mondayDate = new Date(today.getTime() - test[dayOfWeek] * MS_IN_DAY);
const backendUrl = backendWork ? "https://6ocra3.pythonanywhere.com" : "http://127.0.0.1:5005"
let defaultState;
var response = await fetch(`${backendUrl}/get_week_tasks/${dateSlice(mondayDate)}`);
const tasks = await response.json();
var response = await fetch(`${backendUrl}/get_week/${dateSlice(mondayDate)}}`);
const week = await response.json();

defaultState = tasks && week && {
  mondayDate: dateF(mondayDate),
  tasks: tasks,
  trackerOrder: week.tracker_order,
  listOrder: week.list_order,
  drag_task: undefined,
  backendUrl: backendWork ? "https://6ocra3.pythonanywhere.com" : "http://127.0.0.1:5005",
}
// else {
//   defaultState = {
//     mondayDate: mondayDateF,
//     tasks: {
//       1: { task: "Hello world 1", status: 2, days: [1, 1, 1, 0, 0, 0, 0] },
//       2: { task: "Hello world 2", status: 1, days: [1, 1, 1, 2, 2, 0, 0] },
//       3: { task: "Hello world 3", status: 0, days: [0, 0, 0, 0, 1, 2, 1] },
//       4: { task: "Hello world 4", status: 0, days: [0, 0, 0, 0, 1, 2, 1] },
//       5: { task: "Hello world 5", status: 0, days: [0, 0, 0, 0, 1, 2, 1] },
//       6: { task: "Hello world 6", status: 0, days: [0, 0, 0, 0, 1, 2, 1] }
//     },
//     trackerOrder: [3, 1, 4, 6, 2],
//     listOrder: [[1, 3, 5], [2, 4, 6]]
//   }
// }

const reducer = (state = defaultState, action) => {
  const temp_tasks = JSON.parse(JSON.stringify(state.tasks))
  const tempListOrder = JSON.parse(JSON.stringify(state.listOrder))
  switch (action.type) {
    case "drag_start":
      return { ...state, drag_task: action.payload.key }
    case "change_week":
      return {
        ...state, tasks: action.payload.tasks, mondayDate: action.payload.mondayDate, trackerOrder: action.payload.week.trackerOrder,
        listOrder: action.payload.week.list_order,
      }
    case "change_display":
      fetch(`${state.backendUrl}/edit_task_day`, {
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
      fetch(`${state.backendUrl}/edit_task_status`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_id: action.payload.task,
          status: (temp_tasks[action.payload.task].status + 1) % 3
        }),
      })
      temp_tasks[action.payload.task].status = (temp_tasks[action.payload.task].status + 1) % 3
      return { ...state, tasks: temp_tasks }
    case "create_task":
      const new_task = { task: action.payload.value, status: 0, days: [0, 0, 0, 0, 0, 0, 0] }
      temp_tasks[action.payload.id] = JSON.parse(JSON.stringify(new_task))
      tempListOrder[action.payload.column].push(action.payload.id)
      return { ...state, listOrder: tempListOrder, tasks: temp_tasks }
    case "change_tracker_order":
      fetch(`${state.backendUrl}/edit_week`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: state.mondayDate.slice(0, 10),
          tracker_order: action.payload.newTrackerOrder
        }),
      })
      const newTrackerOrder = JSON.parse(JSON.stringify(action.payload.newTrackerOrder))
      return { ...state, trackerOrder: newTrackerOrder }
    case "change_list_order":
      fetch(`${state.backendUrl}/edit_week`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: state.mondayDate.slice(0, 10),
          list_order: action.payload.newListOrder
        }),
      })
      const newListOrder = JSON.parse(JSON.stringify(action.payload.newListOrder))
      return { ...state, listOrder: newListOrder }
    case "add_to_tr":
      if (state.trackerOrder.indexOf(action.payload.task) == -1) {
        const a = [...state.trackerOrder]
        a.push(action.payload.task)
        fetch(`${state.backendUrl}/edit_week`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: "2022-07-03",
            tracker_order: a,
          }),
        })
        return { ...state, trackerOrder: a }
      }
      return state
    default:
      return state
  }
}
const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware(), thunkMiddleware],
  preloadedState: defaultState
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {defaultState && <Provider store={store}>
      <App />
    </Provider>}
  </React.StrictMode>,
)