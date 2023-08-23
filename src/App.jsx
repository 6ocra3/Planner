import "./App.css";
import Tracker from "./Components/Tracker/Tracker";
import List from "./Components/List/List";
import WeekClicker from "./Components/WeekClicker/WeekClicker";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragDropApp } from "./utils/dragFunctions";
import DayTimeline from "./Components/DayTimeline/DayTimeline";
function App() {
  const [dragingTask, setDragingTask] = useState();
  const dispatch = useDispatch();
  const trackerOrder = useSelector((state) => state.trackerOrder);
  return (
    <div
      onClick={(e) => dispatch({ type: "change_info_task", payload: { infoTask: undefined } })}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => dragDropApp(e, trackerOrder, dispatch)}
      style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="body">
        <div className="DayTimeline">
          <DayTimeline />
        </div>
        {/* <div className="Planner">

          <WeekClicker />
          <Tracker dragingTask={dragingTask} setDragingTask={setDragingTask} />
          <List />
        </div> */}
      </div>
    </div>
  );
}

export default App;
