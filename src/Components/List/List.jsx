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
    const [inp, setInp] = useState(-1)
    const tasks = useSelector(state => state.tasks)
    const list_order = useSelector(state => state.list_order)
    const listsRef = useRef()
    const icons = [<></>,
    <FiCheck className="icon" size={15}></FiCheck>,
    <FiX className="icon" size={15}></FiX>]
    function createTask(e, index) {
        dispatch({ type: "create_task", payload: { col: index, task: e.target.value } })
        setInp(-1)
    }
    function getTask(key) {

        function startHandler(e, key) {
            e.dataTransfer.setData("key", key)
        }
        function dragEndHandler(e) {
            e.target.parentElement.classList.remove('top')
            e.target.parentElement.classList.remove('bot')
        }
        function dragOverHandler(e) {
            e.preventDefault();

        }
        function dropHandler(e, key) {
            e.preventDefault();
            const dragTask = e.dataTransfer.getData("key")
        }
        return (<li key={key} className="list__point">
            <div className="list__point_square" onClick={() => { dispatch({ type: "change_status", payload: { task: key } }) }}>{icons[tasks[key].status]} </div>
            <p className={tasks[key].status != 0 ? "task_finished" : ""} onClick={() => { dispatch({ type: "add_to_tr", payload: { task: key } }) }}
                onDragStart={(e) => startHandler(e, key)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, key)}
                draggable
            >{tasks[key].task.length > 20 ? tasks[key].task.slice(0, 18) + "..." : tasks[key].task}</p></li>)
    }

    useEffect(() => {
        if (listsRef.current.clientHeight > height) {
            setHeight(listsRef.current.clientHeight)
        }
    }, [listsRef.current])

    return (
        <div className="list">
            <h1 className="list__header">Сделать за неделю</h1>
            <div className="list__content" ref={listsRef}>
                {tasks && list_order && list_order.map((v, index) => {
                    return (
                        <ul key={shortid.generate()} ref={listsRef} className='list__ul'>
                            {v.map((key) => {
                                return (getTask(key))
                            }
                            )}
                            {inp == index ? <li className="list__point">
                                <div className="list__point_square"></div>
                                <input className="list__input" autoFocus={true}
                                    onBlur={(e) => { e.target.value === "" ? e.target.focus() : createTask(e, index) }}
                                    onKeyUp={(e) => { e.key == "Enter" && (e.target.value === "" ? e.target.focus() : createTask(e, index)) }}></input>
                            </li>
                                :
                                <li className="list__add" onClick={() => {
                                    setInp(index)
                                }}><Plus className="list__add_icon" color='#4f5b66' size={15}></Plus><p>Добавить задачу</p></li>
                            }
                        </ul>)
                })}
                <div className="list__blank" style={{ height: height + "px" }}></div>
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
