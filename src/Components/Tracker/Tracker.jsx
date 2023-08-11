import { ArrowRight } from 'react-feather'
import './Tracker.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { dragDropTrackerTask, dragEndTrackerTask, dragOverTrackerTask, dragStartTrackerTask } from '../../utils/dragFunctions';

function Tracker() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const trackerOrder = useSelector(state => state.trackerOrder)
    const head = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    function getTaskSection(el, key, index) {
        const { task, days } = el
        const cs = ["none", "empty", "fill", "arrow"]
        return (
            <section
                onDrop={(e) => { e.stopPropagation() }}
                key={key} className="task">
                <div className="task__days">
                    {days.map((v, index) => {
                        return <div onClick={() => {
                            dispatch({ type: "change_display", payload: { task: key, day: index } })
                        }} key={shortid.generate()} className={"task__day " + cs[v] + (tasks[key].status != 0 ? " task_finished" : "")}>{v == 3 && <ArrowRight size={18}></ArrowRight>}</div>
                    })}
                </div>
                <div
                    onDragOver={(e) => dragOverTrackerTask(e, index, trackerOrder)}
                    onDragLeave={(e) => dragEndTrackerTask(e, index, trackerOrder)}
                    onDragEnd={(e) => dragEndTrackerTask(e, index, trackerOrder)}
                    onDrop={(e) => dragDropTrackerTask(e, key, index, trackerOrder, dispatch)}>
                    <div className='top_line'></div>
                    <h4
                        className={"task__text " + (tasks[key].status != 0 ? "task_finished" : "")}
                        onDragStart={(e) => dragStartTrackerTask(e, key)}
                        draggable>{task}</h4>

                    {index == (trackerOrder.length - 1) && <div className='bot_line'></div>}
                </div>
            </section>
        )
    }

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
                onDrop={(e) => {
                    e.stopPropagation()
                    const dragTask = Number(e.dataTransfer.getData("key"))
                    if (trackerOrder.indexOf(dragTask) == -1) {
                        const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
                        newTrackerOrder.push(dragTask)
                        dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
                    }
                    else {
                        const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
                        newTrackerOrder.splice(newTrackerOrder.indexOf(dragTask), 1)
                        newTrackerOrder.push(dragTask)
                        dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
                    }
                }}>
                {tasks && trackerOrder && trackerOrder.map((key, index) => {
                    return getTaskSection(tasks[key], key, index)
                })}
            </div>
        </div>
    )
}

export default Tracker
