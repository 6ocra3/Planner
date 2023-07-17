import { ArrowRight } from 'react-feather'
import './Tracker.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'


function Tracker() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const tracker_order = useSelector(state => state.tracker_order)
    const head = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    function Top(e, index) {
        let div;
        if (e.target.parentElement.nodeName === "SECTION") {
            div = e.target
        }
        else {
            div = e.target.parentElement
        }
        if (index == 0) {

        }
        else if (index == tracker_order.length - 1) {

        }
        else {
            div.parentElement.nextElementSibling.children[1].classList.remove('top')
            div.classList.add('top')
        }
    }
    function Bot(e, index) {
        let div;
        if (e.target.parentElement.nodeName === "SECTION") {
            div = e.target
        }
        else {
            div = e.target.parentElement
        }
        div.classList.remove("top")
        if (index == 0) {
            div.parentElement.nextElementSibling.children[1].classList.add('top')
        }
        else if (index == tracker_order.length - 1) {
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
        }
        function dragEndHandler(e) {
        }
        function dragOverHandler(e, index) {
            e.preventDefault();
            (e.clientY - e.target.getBoundingClientRect().y) < (e.target.getBoundingClientRect().y + 20 - e.clientY)
                ? Top(e, index)
                : Bot(e, index)
        }
        function dropHandler(e, key) {
            e.preventDefault();
            e.target.parentElement.classList.remove('top')
            e.target.parentElement.classList.remove('bot')
            const dragTask = Number(e.dataTransfer.getData("key"))
            if (tracker_order.indexOf(dragTask) == -1) {
                console.log(1234)
                const new_tracker_order = JSON.parse(JSON.stringify(tracker_order))
                const ind = new_tracker_order.indexOf(key)
                if ((e.clientY - e.target.getBoundingClientRect().y) < (e.target.getBoundingClientRect().y + 20 - e.clientY)) {
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
                console.log(ind)
                if ((e.clientY - e.target.getBoundingClientRect().y) < (e.target.getBoundingClientRect().y + 20 - e.clientY)) {
                    new_tracker_order.splice(ind, 0, dragTask)
                }
                else {
                    new_tracker_order.splice(ind + 1, 0, dragTask)
                }
                dispatch({ type: "change_tracker_order", payload: { new_tracker_order: new_tracker_order } })
                console.log(new_tracker_order)
            }
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
                <div
                    onDragOver={(e) => dragOverHandler(e, index)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}>

                    <div className='top_line'></div>
                    <h4
                        onClick={(e) => {
                            // const currentH4 = e.target;
                            // const parentDiv = currentH4.parentElement;
                            // const botLine = parentDiv.parentElement.nextElementSibling.children[1]
                            // botLine.classList.add('top')
                            console.log(e.target.nextElementSibling)
                        }}
                        className={"task__text " + (tasks[key].status != 0 ? "task_finished" : "")}
                        onDragStart={(e) => startHandler(e, key)}
                        onDrop={(e) => dropHandler(e, key)}
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
                <h1 className="week__header">Список дел</h1>
            </header>
            <div className="tasks">
                {tasks && tracker_order && tracker_order.map((key, index) => {
                    return getTaskSection(tasks[key], key, index)
                })}
            </div>
        </div>
    )
}

export default Tracker
