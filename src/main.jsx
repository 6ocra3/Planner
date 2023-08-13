import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { dateF, dateSlice } from './utils/DateFunctions.js';
import { fetchChangeDayValue, fetchChangeListOrder, fetchChangeStatus, fetchChangeTrackerOrder } from './utils/requests.js';
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
  infoTask: undefined,
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
        ...state, tasks: action.payload.tasks, mondayDate: action.payload.mondayDate, trackerOrder: action.payload.week.tracker_order,
        listOrder: action.payload.week.list_order,
      }
    case "change_display":
      var body = {
        task_id: action.payload.task,
        day: action.payload.day,
        value: (temp_tasks[action.payload.task].days[action.payload.day] + 1) % 4
      }
      fetchChangeDayValue(body)
      temp_tasks[action.payload.task].days[action.payload.day] = (temp_tasks[action.payload.task].days[action.payload.day] + 1) % 4
      return { ...state, tasks: temp_tasks }
    case "change_status":
      var body = {
        task_id: action.payload.task,
        status: (temp_tasks[action.payload.task].status + 1) % 3
      }
      fetchChangeStatus(body)
      temp_tasks[action.payload.task].status = (temp_tasks[action.payload.task].status + 1) % 3
      return { ...state, tasks: temp_tasks }
    case "create_task":
      const new_task = { task: action.payload.value, status: 0, days: [0, 0, 0, 0, 0, 0, 0] }
      temp_tasks[action.payload.id] = JSON.parse(JSON.stringify(new_task))
      tempListOrder[action.payload.column].push(action.payload.id)
      return { ...state, listOrder: tempListOrder, tasks: temp_tasks }
    case "change_tracker_order":
      var body = {
        date: state.mondayDate.slice(0, 10),
        tracker_order: action.payload.newTrackerOrder
      }
      fetchChangeTrackerOrder(body)
      const newTrackerOrder = JSON.parse(JSON.stringify(action.payload.newTrackerOrder))
      return { ...state, trackerOrder: newTrackerOrder }
    case "edit_task_task":
      temp_tasks[action.payload.keyId].task = action.payload.task
      return { ...state, tasks: temp_tasks }
    case "edit_task_description":
      temp_tasks[action.payload.keyId].description = action.payload.description
      return { ...state, tasks: temp_tasks }
    case "change_info_task":
      return { ...state, infoTask: action.payload.infoTask }
    case "change_list_order":
      var body = {
        date: state.mondayDate.slice(0, 10),
        list_order: action.payload.newListOrder
      }
      fetchChangeListOrder(body)
      const newListOrder = JSON.parse(JSON.stringify(action.payload.newListOrder))
      return { ...state, listOrder: newListOrder }
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