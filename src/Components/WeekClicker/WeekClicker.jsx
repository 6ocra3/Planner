import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './WeekClicker.css'
import { MONTHS } from './MONTHS'
import { ChevronLeft, ChevronRight } from 'react-feather'
export default function WeekClicker() {
    const dispatch = useDispatch()
    const mondayDate = new Date(useSelector(state => state.mondayDate))
    const backendUrl = useSelector(state => state.backendUrl)
    const ms_in_day = 60 * 60 * 24 * 1000
    const sun_date = new Date(mondayDate.getTime() + 6 * ms_in_day)
    const weekDateText = `${mondayDate.getDate()} ${MONTHS[mondayDate.getMonth()]} — ${sun_date.getDate()} ${MONTHS[sun_date.getMonth()]}`
    return (
        <section className="WClicker">
            <div className="wc__container">
                <ChevronLeft onClick={() => {
                    const fetchWeekTasks = () => {
                        return async (dispatch) => {
                            console.log("test")

                            const newMondayDate = new Date(mondayDate.getTime() - 7 * ms_in_day);
                            const newMondayDateF = newMondayDate.toISOString()

                            const responseTasks = await fetch(`${backendUrl}/get_week_tasks/${newMondayDateF.slice(0, 10)}`);
                            const tasks = await responseTasks.json();

                            const responseWeek = await fetch(`${backendUrl}//get_week/${newMondayDateF.slice(0, 10)}`);
                            const week = await responseWeek.json();

                            dispatch({ type: "change_week", payload: { mondayDate: newMondayDateF, week: week, tasks: tasks } });
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

                            const newMondayDate = new Date(mondayDate.getTime() + 7 * ms_in_day);
                            const newMondayDateF = newMondayDate.toISOString()

                            const responseTasks = await fetch(`${backendUrl}//get_week_tasks/${newMondayDateF.slice(0, 10)}`);
                            const tasks = await responseTasks.json();

                            const responseWeek = await fetch(`${backendUrl}//get_week/${newMondayDateF.slice(0, 10)}`);
                            const week = await responseWeek.json();

                            dispatch({ type: "change_week", payload: { mondayDate: newMondayDateF, week: week, tasks: tasks } });
                        };
                    };

                    dispatch(fetchWeekTasks());

                }} size={15} />
            </div>
        </section>
    )
}
