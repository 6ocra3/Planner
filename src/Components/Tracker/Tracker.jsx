
import './Tracker.css'
import { dragDropTrackerTasks } from '../../utils/dragFunctions';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import TrackerTask from '../TrackerTask/TrackerTask';
function Tracker() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const trackerOrder = useSelector(state => state.trackerOrder)
    const head = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    return (
        <div className="tracker">
            <header className="week">
                <div className="week__days">
                    {head.map((value) => {
                        return <div key={value} className="week__day">{value}</div>
                    })}
                </div>
                <h2 className="week__header">Список дел</h2>
            </header>
            <div className="tasks"
                onDrop={(e) => dragDropTrackerTasks(e, trackerOrder, dispatch)}>
                {tasks && trackerOrder && trackerOrder.map((keyId, index) => {
                    return <TrackerTask key={keyId} el={tasks[keyId]} keyId={keyId} index={index} ></TrackerTask>
                })}
            </div>
        </div>
    )
}

export default Tracker
