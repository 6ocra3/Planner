import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ArrowRight } from 'react-feather'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
// #343d46,#4f5b66,#65737e,#a7adba,#c0c5ce

function App() {
  function getTaskSection(el, elIndex) {
    const { key, task, days } = el
    return (
      <section key={key} className="task">
        <div className="task__days">
          {days.map((v, index) => {
            const cs = ["none", "empty", "fill", "arrow"]
            return <div onClick={() => {
              dispatch({ type: "change_display", payload: { task: elIndex, day: index } })
            }} key={key} className={"task__day " + cs[v]}>{v == 3 && <ArrowRight size={18}></ArrowRight>}</div>
          })}
        </div>
        <h4 className="task__text">{task}</h4>
      </section>
    )
  }
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks)

  const head = [{ key: 10, value: "Пн" }, { key: 11, value: "Вт" }, { key: 12, value: "Ср" }, { key: 13, value: "Чт" }, { key: 14, value: "Пт" }, { key: 15, value: "Сб" }, { key: 16, value: "Вс" }]
  return (
    <div className="App">
      <div className="tracker">
        <header className="week">
          <div className="week__days">
            {head.map(({ key, value }) => {
              return <div key={value} className="week__day">{value}</div>
            })}
          </div>
          <h1 className="week__header">Список дел</h1>
        </header>
        <div className="tasks">
          {tasks && tasks.map((task, index) => { return getTaskSection(task, index) })}
        </div>
      </div>
      <div className="list">
        <h1 className="list__header">Сделать за неделю</h1>
        <div className="list__content">
          <ul className="list__ul">
            {tasks.map(t => {
              if (t.column == 1) {
                return (<li key={t.key} className="list__point">
                  <div className="list__point_square"></div>
                  {t.task}</li>)
              }
            })}
            <li className="list__add">Добавить задачу</li>
          </ul>
          <ul className="list__ul">
            {tasks.map(t => {
              if (t.column == 2) {
                return (<li key={t.key} className="list__point">{t.task}</li>)
              }
            })}
            <li className="list__add">Добавить задачу</li>
          </ul>
          <ul className="list__ul">
            {tasks.map(t => {
              if (t.column == 3) {
                return (<li key={t.key} className="list__point">{t.task}</li>)
              }
            })}
            <li className="list__add">Добавить задачу</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
