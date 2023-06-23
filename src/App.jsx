import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ArrowRight } from 'react-feather'
import './App.css'

// #343d46,#4f5b66,#65737e,#a7adba,#c0c5ce

function App() {
  function getTaskSection({ key, task, days }) {
    return (
      <section className="task">
        <div className="task__days">
          {days.map((v) => {
            if (v == 0) {
              return <div key={key} className="task__day none"></div>
            }
            else if (v == 1) {
              return <div key={key} className="task__day empty"></div>
            }
            else if (v == 2) {
              return <div key={key} className="task__day fill"></div>
            }
            else {
              return <div key={key} className="task__day arrow"><ArrowRight className='icon' size={18} /></div>
            }
          })}
        </div>
        <h4 className="task__text">{task}</h4>
      </section>
    )
  }
  const tasks = [{ key: 0, task: "Hello world!", column: 1, days: [1, 2, 3, 0, 0, 0, 0] }]

  const head = [{ key: 10, value: "Пн" }, { key: 11, value: "Вт" }, { key: 12, value: "Ср" }, { key: 13, value: "Чт" }, { key: 14, value: "Пт" }, { key: 15, value: "Сб" }, { key: 16, value: "Вс" }]
  const yach = [{ key: 1, value: 0 }, { key: 2, value: 0 }, { key: 3, value: 0 }, { key: 4, value: 0 }, { key: 5, value: 0 }, { key: 6, value: 0 }, { key: 7, value: 0 }]
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
          {getTaskSection(tasks[0])}
          {getTaskSection(tasks[0])}
        </div>
      </div>
      <div className="list">
        <h1 className="list__header">Сделать за неделю</h1>
        <div className="list__content">
          <ul className="list__ul">
            {tasks.map(t => {
              if (t.column == 1) {
                return (<li className="list__point">
                  <div className="list__point_square"></div>
                  {t.task}</li>)
              }
            })}
            <li className="list__add">Добавить задачу</li>
          </ul>
          <ul className="list__ul">
            {tasks.map(t => {
              if (t.column == 2) {
                return (<li className="list__point">{t.task}</li>)
              }
            })}
            <li className="list__add">Добавить задачу</li>
          </ul>
          <ul className="list__ul">
            {tasks.map(t => {
              if (t.column == 3) {
                return (<li className="list__point">{t.task}</li>)
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