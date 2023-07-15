import './App.css'
import Tracker from './Components/Tracker/Tracker';
import List from './Components/List/List';
import { useEffect, useRef, useState } from 'react';
function App() {
  const [dragTask, setDragTask] = useState()
  // const appRef = useRef()
  // useEffect(() => {
  //   appRef.current.parentElement.parentElement.addEventListener('dragover', (e) => {
  //     e.preventDefault();
  //   });
  //   appRef.current.parentElement.parentElement.addEventListener('drop', (e) => {
  //     e.preventDefault()
  //     console.log(e)
  //   });

  // }, [appRef.current])
  return (
    <div className="App">
      <Tracker dragTask={dragTask} setDragTask={setDragTask} />
      <List dragTask={dragTask} setDragTask={setDragTask} />
    </div>
  )
}

export default App
