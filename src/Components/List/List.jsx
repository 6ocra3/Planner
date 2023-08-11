import { useEffect, useRef, useState } from 'react'
import { Plus } from 'react-feather'
import './List.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'
import { Check } from 'react-feather';
import { FiX } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

function List() {
    const dispatch = useDispatch()
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [inp, setInp] = useState(-1)
    const tasks = useSelector(state => state.tasks)
    const listOrder = useSelector(state => state.listOrder)
    const trackerOrder = useSelector(state => state.trackerOrder)
    const mondayDate = useSelector(state => state.mondayDate)
    const backendUrl = useSelector(state => state.backendUrl)
    const listsRef = useRef()
    const blankDivRef = useRef()
    const mainListRef = useRef()
    const icons = [<></>,
    <FiCheck className="icon" size={15}></FiCheck>,
    <FiX className="icon" size={15}></FiX>]
    function createTask(e, index) {
        const createTaskFetch = () => {
            return async (dispatch) => {
                const responseTask = await fetch(`${backendUrl}/create_task`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: mondayDate.slice(0, 10),
                        task: e.target.value,
                        column: index
                    }),
                })
                const task = await responseTask.json();
                dispatch({ type: "create_task", payload: { id: task.id, column: index, value: e.target.value } })
            };
        };
        dispatch(createTaskFetch())
        setInp(-1)
    }
    function getTask(key) {
        function startHandler(e, key) {
            e.dataTransfer.setData("key", key)
            // blankDivRef.current.style.display = "block"
        }
        function dragEndHandler(e) {
        }
        function dragOverHandler(e) {
            e.preventDefault();

        }
        function dropHandler(e, key) {
            e.preventDefault();
            // blankDivRef.current.style.display = "none"
        }
        if (tasks[key]) {
            return (<li key={key}>
                <div className="list__point">
                    <div className="list__point_square" onClick={() => { dispatch({ type: "change_status", payload: { task: key } }) }}>{icons[tasks[key].status]} </div>
                    <p className={tasks[key].status != 0 ? "list__point_text task_finished" : "list__point_text "}
                        onClick={() => {
                            if (trackerOrder.indexOf(key) == -1) {
                                const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
                                newTrackerOrder.push(key)
                                dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
                            }
                        }}
                        onDragStart={(e) => startHandler(e, key)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, key)}
                        draggable
                    >{tasks[key].task.length > 20 ? tasks[key].task.slice(0, 18) + "..." : tasks[key].task}</p>
                </div>
            </li>)
        }
    }
    useEffect(() => {
        if (listsRef.current.clientHeight > height) {
            setHeight(listsRef.current.clientHeight)
        }
        setWidth(listsRef.current.clientWidth)
    }, [listsRef.current])
    return (
        <div ref={mainListRef}
            onDragEnter={(e) => {
                e.preventDefault()
                // blankDivRef.current.style.display = "block"
            }}
            onDragLeave={(e) => {
                e.preventDefault()
                if (!mainListRef.current.contains(e.relatedTarget)) {
                    // blankDivRef.current.style.display = "none";
                }

            }}
            // onDrop={(e) => { blankDivRef.current.style.display = "none"; }}
            className="list">
            <h2 className="list__header">Сделать за неделю</h2>
            <div className="list__content" ref={listsRef}>
                {tasks && listOrder && listOrder.map((v, index) => {
                    return (
                        <ul
                            onDrop={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                const key = Number(e.dataTransfer.getData("key"))
                                const newListOrder = JSON.parse(JSON.stringify(listOrder))
                                const updatedListOrder = newListOrder.map((subArray) => {
                                    return subArray.filter((element) => {
                                        if (Array.isArray(element)) {
                                            return !element.includes(key);
                                        }
                                        return element !== key;
                                    });
                                });
                                updatedListOrder[index].push(key)
                                dispatch({ type: "change_list_order", payload: { newListOrder: updatedListOrder } })

                            }}
                            key={shortid.generate()} ref={listsRef} className='list__ul'>
                            {v.map((key) => {
                                return (getTask(key))
                            }
                            )}
                            {inp == index ? <li className="list__point">
                                <div className="list__point_square"></div>
                                <input className="list__input" autoFocus={true}
                                    onBlur={(e) => { e.target.value !== "" && createTask(e, index) }}
                                    onKeyUp={(e) => { e.key == "Enter" && (e.target.value === "" ? e.target.focus() : createTask(e, index)) }}></input>
                            </li>
                                :
                                <li className="list__add" onClick={() => {
                                    setInp(index)
                                }}><Plus className="list__add_icon" color='#4f5b66' size={15}></Plus><p>Добавить задачу</p></li>
                            }
                        </ul>)
                })}
                {/* <div
                    onDragOver={(e) => {
                        e.preventDefault()
                        blankDivRef.current.children[0].children[1].style.color = "#4f5b66"
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault()
                        if (!blankDivRef.current.contains(e.relatedTarget)) {
                            blankDivRef.current.children[0].children[1].style.color = "#c0c5ce"
                        }
                    }}
                    onDrop={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        blankDivRef.current.style.display = "none";
                        const newListOrder = JSON.parse(JSON.stringify(listOrder))
                        const b = new Array()
                        const key = Number(e.dataTransfer.getData("key"))
                        b.push(key)
                        const updatedListOrder = newListOrder.map((subArray) => {
                            return subArray.filter((element) => {
                                if (Array.isArray(element)) {
                                    return !element.includes(key);
                                }
                                return element !== key;
                            });
                        });§
                        updatedListOrder.push(b)
                        dispatch({ type: "change_list_order", payload: { newListOrder: updatedListOrder } })
                    }}
                    className="list__blank" style={{ height: height + "px", width: width + "px" }} id="blankList" ref={blankDivRef}>
                    <div className="list__add">
                        <Plus className="list__add_icon" color='#4f5b66' size={15}></Plus> <p>Добавить столбец</p>
                    </div>
                </div> */}
            </div>
        </div >
    )
}
// style={{
//     height: Math.max(...[...listsRef.current.children].reduce((accumulator, item) => {
//         accumulator.push(Number(item.clientHeight))
//         return accumulator
//     }, [])) + "px"
// }}
export default List
