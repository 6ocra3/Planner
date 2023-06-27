import { ArrowRight } from 'react-feather'
import './Tracker.css'
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux'

function Tracker() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const tr_ord = useSelector(state => state.tr_order)
    const head = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    function Top(e) {
        e.target.classList.add('top')
        e.target.classList.remove('bot')
    }
    function Bot(e) {
        e.target.classList.add('bot')
        e.target.classList.remove('top')
    }
    function getTaskSection(el, key) {
        const { task, days } = el
        const cs = ["none", "empty", "fill", "arrow"]
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
                <h4
                    onMouseLeave={(e) => {
                        e.target.classList.remove('top')
                        e.target.classList.remove('bot')
                    }}
                    onMouseMove={(e) => (e.clientY - e.target.getBoundingClientRect().y) < (e.target.getBoundingClientRect().y + 20 - e.clientY)
                        ? Top(e)
                        : Bot(e)}
                    // onMouseMove={(e) => console.log((e.clientY - e.target.getBoundingClientRect().y) < (e.target.getBoundingClientRect().y + 20 - e.clientY))}
                    className={"task__text " + (tasks[key].status != 0 ? "task_finished" : "")}>{task}</h4>
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
                {tasks && tr_ord && tr_ord.map((key) => {
                    return getTaskSection(tasks[key], key)
                })}
            </div>
        </div>
    )
}

export default Tracker
