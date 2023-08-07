import { ArrowRight } from 'react-feather'
import './Tracker.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';


function Tracker({ dragingTask, setDragingTask }) {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const tracker_order = useSelector(state => state.tracker_order)
    const head = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    function Top(div, index) {
        if (index == 0) {
            div.classList.add("top")
            div.parentElement.nextElementSibling.children[1].classList.remove('top')
        }
        else if (index == tracker_order.length - 1) {
            div.classList.remove("bot")
            div.classList.add("top")
        }
        else {
            div.parentElement.nextElementSibling.children[1].classList.remove('top')
            div.classList.add('top')
        }
    }
    function Bot(div, index) {
        div.classList.remove("top")
        if (index == 0) {
            div.parentElement.nextElementSibling.children[1].classList.add('top')
        }
        else if (index == tracker_order.length - 1) {
            div.classList.remove("top")
            div.classList.add("bot")
        }
        else {
            div.parentElement.nextElementSibling.children[1].classList.add('top')
        }
    }
    function getTaskSection(el, key, index) {
        const { task, days } = el
        const cs = ["none", "empty", "fill", "arrow"]
        function startHandler(e, key) {
            e.dataTransfer.setData("key", key)
            e.target.style.marginLeft = "0"
            e.target.style.fontSize = "13px"
            setDragingTask(key)
        }
        function dragEndHandler(e, index) {
            let div;
            if (e.target.parentElement.nodeName === "SECTION") {
                div = e.target
            }
            else {
                div = e.target.parentElement
            }
            if (!div.contains(e.relatedTarget) && e.relatedTarget?.classList[0] != "top_line" && (e.relatedTarget?.classList[0] != undefined || index == tracker_order.length - 1)) {
                div.classList.remove("top")
                if (index == tracker_order.length - 1) {
                    div.classList.remove("bot")
                }
                else {
                    div.parentElement.nextElementSibling.children[1].classList.remove("top")
                }
            }
        }
        function dragOverHandler(e, index) {
            console.log(dragingTask)
            e.preventDefault();
            let div;
            if (e.target.parentElement.nodeName === "SECTION") {
                div = e.target
            }
            else {
                div = e.target.parentElement
            }

            (e.clientY - div.getBoundingClientRect().y) < (div.getBoundingClientRect().y + 20 - e.clientY)
                ? Top(div, index)
                : Bot(div, index)
        }
        function dropHandler(e, key) {
            e.preventDefault();
            e.stopPropagation()
            let div;
            if (e.target.parentElement.nodeName === "SECTION") {
                div = e.target
            }
            else {
                div = e.target.parentElement
            }
            div.classList.remove("top")
            if (index == tracker_order.length - 1) {
                div.classList.remove("bot")
            }
            else {
                div.parentElement.nextElementSibling.children[1].classList.remove("top")
            }
            const dragTask = Number(e.dataTransfer.getData("key"))
            if (tracker_order.indexOf(dragTask) == -1) {
                const new_tracker_order = JSON.parse(JSON.stringify(tracker_order))
                const ind = new_tracker_order.indexOf(key)
                if ((e.clientY - div.getBoundingClientRect().y) < (div.getBoundingClientRect().y + 20 - e.clientY)) {
                    new_tracker_order.splice(ind, 0, dragTask)
                }
                else {
                    new_tracker_order.splice(ind + 1, 0, dragTask)
                }
                dispatch({ type: "change_tracker_order", payload: { new_tracker_order: new_tracker_order } })
            }
            else if (dragTask && key != dragTask) {
                const new_tracker_order = JSON.parse(JSON.stringify(tracker_order))
                new_tracker_order.splice(new_tracker_order.indexOf(dragTask), 1)
                const ind = new_tracker_order.indexOf(key)
                if ((e.clientY - div.getBoundingClientRect().y) < (div.getBoundingClientRect().y + 20 - e.clientY)) {
                    new_tracker_order.splice(ind, 0, dragTask)
                }
                else {
                    new_tracker_order.splice(ind + 1, 0, dragTask)
                }
                dispatch({ type: "change_tracker_order", payload: { new_tracker_order: new_tracker_order } })
            }
        }
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
                    onDragOver={(e) => dragOverHandler(e, index)}
                    onDragLeave={(e) => dragEndHandler(e, index)}
                    onDragEnd={(e) => dragEndHandler(e, index)}
                    onDrop={(e) => dropHandler(e, key)}>
                    <div className='top_line'></div>
                    <h4
                        onClick={(e) => {
                            // const currentH4 = e.target;
                            // const parentDiv = currentH4.parentElement;
                            // const botLine = parentDiv.parentElement.nextElementSibling.children[1]
                            // botLine.classList.add('top')
                        }}
                        className={"task__text " + (tasks[key].status != 0 ? "task_finished" : "")}
                        onDragStart={(e) => startHandler(e, key)}
                        draggable>{task}</h4>

                    {index == (tracker_order.length - 1) && <div className='bot_line'></div>}
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
                    if (tracker_order.indexOf(dragTask) == -1) {
                        const new_tracker_order = JSON.parse(JSON.stringify(tracker_order))
                        new_tracker_order.push(dragTask)
                        dispatch({ type: "change_tracker_order", payload: { new_tracker_order: new_tracker_order } })
                    }
                    else {
                        const new_tracker_order = JSON.parse(JSON.stringify(tracker_order))
                        new_tracker_order.splice(new_tracker_order.indexOf(dragTask), 1)
                        new_tracker_order.push(dragTask)
                        dispatch({ type: "change_tracker_order", payload: { new_tracker_order: new_tracker_order } })
                    }
                }}>
                {tasks && tracker_order && tracker_order.map((key, index) => {
                    return getTaskSection(tasks[key], key, index)
                })}
            </div>
        </div>
    )
}

export default Tracker
