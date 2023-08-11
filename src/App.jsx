import './App.css'
import Tracker from './Components/Tracker/Tracker';
import List from './Components/List/List';
import WeekClicker from './Components/WeekClicker/WeekClicker';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const [dragingTask, setDragingTask] = useState()
  const appRef = useRef()
  const dispatch = useDispatch()
  const trackerOrder = useSelector(state => state.trackerOrder)
  function dropHandler(e) {
    e.preventDefault()

    const key = Number(e.dataTransfer.getData("key"))
    const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
    console.log(newTrackerOrder)
    const ind = newTrackerOrder.indexOf(key)
    newTrackerOrder.splice(ind, 1)
    console.log(newTrackerOrder)
    dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
  }
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => dropHandler(e)}
      style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className='body'>
        <div className="App">
          <WeekClicker />
          <Tracker dragingTask={dragingTask} setDragingTask={setDragingTask} />
          <List />
        </div>
      </div>
    </div>

  )
}

export default App
