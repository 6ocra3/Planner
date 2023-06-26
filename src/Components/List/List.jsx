import { useState } from 'react'
import { Plus } from 'react-feather'
import './List.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'



function List() {
    const dispatch = useDispatch()
    const [inp, setInp] = useState(-1)
    const tasks = useSelector(state => state.tasks)
    const col_ord = useSelector(state => state.col_order)

    function createTask(e, index) {
        dispatch({ type: "create_task", payload: { col: index, task: e.target.value } })
        setInp(-1)
    }

    return (
        <div className="list">
            <h1 className="list__header">Сделать за неделю</h1>
            <div className="list__content">
                {tasks && col_ord && col_ord.map((v, index) => {
                    return (
                        <ul key={shortid.generate()} className='list__ul'>
                            {v.map((el) => {
                                return (<li key={el} className="list__point">
                                    <div key={el} className="list__point_square"></div>
                                    <p onClick={() => { dispatch({ type: "add_to_tr", payload: { task: el } }) }}>{tasks[el].task}</p></li>)
                            }
                            )}
                            {inp == index ? <li className="list__point">
                                <div className="list__point_square"></div>
                                <input className="list__input" autoFocus={true}
                                    onBlur={(e) => { createTask(e, index) }} onKeyUp={(e) => { e.key == "Enter" && createTask(e, index) }}></input>
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
