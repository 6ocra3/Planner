import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid';
import { ArrowRight } from 'react-feather'
import { dragDropTrackerTask, dragDropTrackerTasks, dragEndTrackerTask, dragOverTrackerTask, dragStartTrackerTask } from '../../utils/dragFunctions';
import "./TrackerTask.css"
function TrackerTask({ el, keyId, index }) {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const trackerOrder = useSelector(state => state.trackerOrder)
    const { task, days } = el
    const cs = ["none", "empty", "fill", "arrow"]
    return (
        <section
            onDrop={(e) => { e.stopPropagation() }}
            key={keyId} className="task">
            <div className="task__days">
                {days.map((v, index) => {
                    return <div onClick={() => {
                        dispatch({ type: "change_display", payload: { task: keyId, day: index } })
                    }} key={shortid.generate()} className={"task__day " + cs[v] + (tasks[keyId].status != 0 ? " task_finished" : "")}>{v == 3 && <ArrowRight size={18}></ArrowRight>}</div>
                })}
            </div>
            <div
                onDragOver={(e) => dragOverTrackerTask(e, index, trackerOrder)}
                onDragLeave={(e) => dragEndTrackerTask(e, index, trackerOrder)}
                onDragEnd={(e) => dragEndTrackerTask(e, index, trackerOrder)}
                onDrop={(e) => dragDropTrackerTask(e, keyId, index, trackerOrder, dispatch)}>
                <div className='top_line'></div>
                <h4
                    className={"task__text " + (tasks[keyId].status != 0 ? "task_finished" : "")}
                    onDragStart={(e) => dragStartTrackerTask(e, keyId)}
                    draggable>{task}</h4>

                {index == (trackerOrder.length - 1) && <div className='bot_line'></div>}
            </div>
        </section>
    )
}


export default TrackerTask;