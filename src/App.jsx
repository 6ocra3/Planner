import './App.css'
import Tracker from './Components/Tracker/Tracker';
import List from './Components/List/List';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const [dragingTask, setDragingTask] = useState()
  const appRef = useRef()
  const dispatch = useDispatch()
  const tracker_order = useSelector(state => state.tracker_order)
  function dropHandler(e) {
    e.preventDefault()

    const key = Number(e.dataTransfer.getData("key"))
    const new_tracker_order = JSON.parse(JSON.stringify(tracker_order))
    console.log(new_tracker_order)
    const ind = new_tracker_order.indexOf(key)
    new_tracker_order.splice(ind, 1)
    console.log(new_tracker_order)
    dispatch({ type: "change_tracker_order", payload: { new_tracker_order: new_tracker_order } })
  }
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => dropHandler(e)}
      style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className='body'>
        <div className="App">
          <Tracker dragingTask={dragingTask} setDragingTask={setDragingTask} />
          <List />
        </div>
      </div>
    </div>

  )
}

export default App
