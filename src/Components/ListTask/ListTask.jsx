import { useDispatch, useSelector } from 'react-redux'
import { dragStartListTask } from '../../utils/dragFunctions'
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import "./ListTask.css"
import ContextMenu from '../ContextMenu/ContextMenu';
function ListTask({ keyId }) {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const infoTask = useSelector(state => state.infoTask)
    const trackerOrder = useSelector(state => state.trackerOrder)
    console.log(keyId)
    const icons = [<></>,
    <FiCheck className="icon" size={15}></FiCheck>,
    <FiX className="icon" size={15}></FiX>]
    if (tasks[keyId]) {
        return (<li key={keyId}>
            <div className="list__point">
                <div className="list__point_square" onClick={() => { dispatch({ type: "change_status", payload: { task: keyId } }) }}>{icons[tasks[keyId].status]} </div>
                <p className={tasks[keyId].status != 0 ? "list__point_text task_finished" : "list__point_text "}
                    onClick={(e) => {
                        e.stopPropagation()
                        infoTask == keyId ? dispatch({ type: "change_info_task", payload: { "infoTask": undefined } }) : dispatch({ type: "change_info_task", payload: { "infoTask": keyId } })

                    }}
                    onDoubleClick={(e) => {
                        console.log(e.detail)
                        if (trackerOrder.indexOf(keyId) == -1) {
                            const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
                            newTrackerOrder.push(keyId)
                            dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
                        }
                    }}
                    onDragStart={(e) => dragStartListTask(e, keyId, dispatch)}
                    draggable
                >{tasks[keyId].task?.length > 20 ? tasks[keyId].task.slice(0, 18) + "..." : tasks[keyId].task}</p>
                {keyId == infoTask && <ContextMenu keyId={keyId} />}
            </div>
        </li>)
    }
}

export default ListTask;