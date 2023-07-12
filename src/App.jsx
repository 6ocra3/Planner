import './App.css'
import Tracker from './Components/Tracker/Tracker';
import List from './Components/List/List';
import { useState } from 'react';
function App() {
  const [dragTask, setDragTask] = useState()
  return (
    <div className="App">
      <Tracker dragTask={dragTask} setDragTask={setDragTask} />
      <List dragTask={dragTask} setDragTask={setDragTask} />
    </div>
  )
}

export default App
