import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './WeekClicker.css'
import { MONTHS } from './MONTHS'
import { ChevronLeft, ChevronRight } from 'react-feather'
export default function WeekClicker() {
    const dispatch = useDispatch()
    const mon_date = useSelector(state => state.mon_date)
    const ms_in_day = 60 * 60 * 24 * 1000
    const sun_date = new Date(mon_date.getTime() + 6 * ms_in_day)
    const weekDateText = `${mon_date.getDate()} ${MONTHS[mon_date.getMonth()]} — ${sun_date.getDate()} ${MONTHS[sun_date.getMonth()]}`
    return (
        <section className="WClicker">
            <div className="wc__container">
                <ChevronLeft onClick={() => {
                    const fetchWeekTasks = () => {
                        return async (dispatch) => {
                            console.log("test")

                            const newMondayDate = new Date(mon_date.getTime() - 7 * ms_in_day);

                            const responseTasks = await fetch(`http://127.0.0.1:5005/get_week_tasks/${newMondayDate.toISOString().slice(0, 10)}`);
                            const tasks = await responseTasks.json();

                            const responseWeek = await fetch(`http://127.0.0.1:5005/get_week/${newMondayDate.toISOString().slice(0, 10)}`);
                            const week = await responseWeek.json();

                            dispatch({ type: "change_week", payload: { mon_date: newMondayDate, week: week, tasks: tasks } });
                        };
                    };

                    dispatch(fetchWeekTasks());


                }
                }
                    size={15} />
                <h1 className="wc__date">{weekDateText}</h1>
                <ChevronRight onClick={() => {
                    const fetchWeekTasks = () => {
                        return async (dispatch) => {
                            console.log("test")

                            const newMondayDate = new Date(mon_date.getTime() + 7 * ms_in_day);

                            const responseTasks = await fetch(`http://127.0.0.1:5005/get_week_tasks/${newMondayDate.toISOString().slice(0, 10)}`);
                            const tasks = await responseTasks.json();

                            const responseWeek = await fetch(`http://127.0.0.1:5005/get_week/${newMondayDate.toISOString().slice(0, 10)}`);
                            const week = await responseWeek.json();

                            dispatch({ type: "change_week", payload: { mon_date: newMondayDate, week: week, tasks: tasks } });
                        };
                    };

                    dispatch(fetchWeekTasks());

                }} size={15} />
            </div>
        </section>
    )
}
