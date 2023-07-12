import { useState } from 'react'
import { Plus } from 'react-feather'
import './List.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'
import { Check } from 'react-feather';
import { FiX } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

function List() {
    const dispatch = useDispatch()
    const [inp, setInp] = useState(-1)
    const tasks = useSelector(state => state.tasks)
    const list_order = useSelector(state => state.list_order)

    const icons = [<></>,
    <FiCheck className="icon" size={15}></FiCheck>,
    <FiX className="icon" size={15}></FiX>]

    function createTask(e, index) {
        dispatch({ type: "create_task", payload: { col: index, task: e.target.value } })
        setInp(-1)
    }

    return (
        <div className="list">
            <h1 className="list__header">Сделать за неделю</h1>
            <div className="list__content">
                {tasks && list_order && list_order.map((v, index) => {
                    return (
                        <ul key={shortid.generate()} className='list__ul'>
                            {v.map((el) => {
                                return (<li key={el} className="list__point">
                                    <div className="list__point_square" onClick={() => { dispatch({ type: "change_status", payload: { task: el } }) }}>{icons[tasks[el].status]} </div>
                                    <p className={tasks[el].status != 0 ? "task_finished" : ""} onClick={() => { dispatch({ type: "add_to_tr", payload: { task: el } }) }}
                                        draggable={true}
                                    >{tasks[el].task.length > 20 ? tasks[el].task.slice(0, 18) + "..." : tasks[el].task}</p></li>)
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
            </div>
        </div>
    )
}

export default List
