import { useEffect, useRef, useState } from 'react'
import { Plus } from 'react-feather'
import './List.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'


import { dragDropListUl, dragStartListTask } from '../../utils/dragFunctions';
import { fetchCreateTask } from '../../utils/requests';
import ListTask from '../ListTask/ListTask';

function List() {
    const dispatch = useDispatch()
    const [inp, setInp] = useState(-1)
    const tasks = useSelector(state => state.tasks)
    const listOrder = useSelector(state => state.listOrder)
    const mondayDate = new Date(useSelector(state => state.mondayDate))
    const listsRef = useRef()
    const mainListRef = useRef()

    function createTask(e, index) {
        dispatch(fetchCreateTask(mondayDate, e, index))
        setInp(-1)
    }
    return (
        <div ref={mainListRef}
            className="list">
            <h2 className="list__header">Сделать за неделю</h2>
            <div className="list__content" ref={listsRef}>
                {tasks && listOrder && listOrder.map((v, index) => {
                    return (
                        <ul
                            onDrop={(e) => dragDropListUl(e, index, listOrder, dispatch)}
                            key={shortid.generate()} ref={listsRef} className='list__ul'>
                            {v.map((key) => {
                                return <ListTask key={key} keyId={key}></ListTask>
                            }
                            )}
                            {inp == index ? <li className="list__point">
                                <div className="list__point_square"></div>
                                <input className="list__input" autoFocus={true}
                                    onBlur={(e) => { e.target.value === "" ? setInp(-1) : createTask(e, index) }}
                                    onKeyUp={(e) => { e.key == "Enter" && (e.target.value === "" ? setInp(-1) : createTask(e, index)) }}></input>
                            </li>
                                :
                                <li className="list__add" onClick={() => {
                                    setInp(index)
                                }}><Plus className="list__add_icon" color='#4f5b66' size={15}></Plus><p>Добавить задачу</p></li>
                            }
                        </ul>)
                })}
            </div>
        </div >
    )
}
export default List
