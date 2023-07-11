import { ArrowRight } from 'react-feather'
import './Tracker.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';

function Tracker() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const tracker_order = useSelector(state => state.tracker_order)
    const [dragTask, setDragTask] = useState()
    const head = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    function Top(e) {
        e.target.parentElement.classList.add('top')
        e.target.parentElement.classList.remove('bot')
    }
    function Bot(e) {
        e.target.parentElement.classList.add('bot')
        e.target.parentElement.classList.remove('top')
    }
    function getTaskSection(el, key) {
        const { task, days } = el
        const cs = ["none", "empty", "fill", "arrow"]
        function startHandler(e, key) {
            e.target.parentElement.classList.add("yandex-drag-disable")
            setDragTask(key)
        }
        function dragEndHandler(e) {
            e.target.parentElement.classList.remove('top')
            e.target.parentElement.classList.remove('bot')
        }
        function dragOverHandler(e) {
            e.preventDefault();
            (e.clientY - e.target.getBoundingClientRect().y) < (e.target.getBoundingClientRect().y + 20 - e.clientY)
                ? Top(e)
                : Bot(e)
        }
        function dropHandler(e, key) {
            e.preventDefault();
            const new_tracker_order = []
            if (key != dragTask) {
                tracker_order.map((v) => {
                    if (v == key) {
                        new_tracker_order.push(dragTask)
                    }
                    else if (v == dragTask) {
                        new_tracker_order.push(key)
                    }
                    else {
                        new_tracker_order.push(v)
                    }
                })
                dispatch({ type: "change_tracker_order", payload: { new_tracker_order: new_tracker_order } })
            }
            console.log(new_tracker_order)

        }
        return (
            <section key={key} className="task">
                <div className="task__days">
                    {days.map((v, index) => {
                        return <div onClick={() => {
                            dispatch({ type: "change_display", payload: { task: key, day: index } })
                        }} key={shortid.generate()} className={"task__day " + cs[v] + (tasks[key].status != 0 ? " task_finished" : "")}>{v == 3 && <ArrowRight size={18}></ArrowRight>}</div>
                    })}
                </div>
                {/* {console.log(e.clientY - e.target.getBoundingClientRect().y < e.target.getBoundingClientRect().y + 20 - e.clientY ? "Верх" : "Низ")} */}
                <div>
                    <div className='top_line'></div>
                    <h4
                        onClick={(e) => { console.log(e.target.parentElement) }}
                        onMouseLeave={(e) => {
                            e.target.parentElement.classList.remove('top')
                            e.target.parentElement.classList.remove('bot')
                        }}
                        className={"task__text " + (tasks[key].status != 0 ? "task_finished" : "")}

                        onDragStart={(e) => startHandler(e, key)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, key)}
                        draggable>{task}</h4>

                    <div className='bot_line'></div>
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
                <h1 className="week__header">Список дел</h1>
            </header>
            <div className="tasks">
                {tasks && tracker_order && tracker_order.map((key) => {
                    return getTaskSection(tasks[key], key)
                })}
            </div>
        </div>
    )
}

export default Tracker
