import config from "../config";
import { dateF, dateSlice } from "./DateFunctions";
const MS_IN_DAY = 60 * 60 * 24 * 1000
const backendUrl = config.backendUrl
export function fetchChangeDayValue(body) {
    fetch(`${backendUrl}/edit_task_day`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}

export function fetchChangeStatus(body) {
    fetch(`${backendUrl}/edit_task_status`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}

export function fetchChangeTrackerOrder(body) {
    fetch(`${backendUrl}/edit_week`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}

export function fetchChangeListOrder(body) {
    fetch(`${backendUrl}/edit_week`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}

export function fetchWeekNext(mondayDate) {
    return async (dispatch) => {

        const newMondayDate = new Date(mondayDate.getTime() - 7 * MS_IN_DAY);

        const responseTasks = await fetch(`${backendUrl}/get_week_tasks/${dateSlice(newMondayDate)}`);
        const tasks = await responseTasks.json();

        const responseWeek = await fetch(`${backendUrl}//get_week/${dateSlice(newMondayDate)}`);
        const week = await responseWeek.json();

        dispatch({ type: "change_week", payload: { mondayDate: dateF(newMondayDate), week: week, tasks: tasks } });
    };
}

export function fetchWeekprevious(mondayDate) {
    return async (dispatch) => {

        const newMondayDate = new Date(mondayDate.getTime() + 7 * MS_IN_DAY);
        const newMondayDateF = newMondayDate.toISOString()

        const responseTasks = await fetch(`${backendUrl}//get_week_tasks/${newMondayDateF.slice(0, 10)}`);
        const tasks = await responseTasks.json();

        const responseWeek = await fetch(`${backendUrl}//get_week/${newMondayDateF.slice(0, 10)}`);
        const week = await responseWeek.json();
        dispatch({ type: "change_week", payload: { mondayDate: newMondayDateF, week: week, tasks: tasks } });
    };
}

export function fetchCreateTask(mondayDate, e, index) {
    return async (dispatch) => {
        const responseTask = await fetch(`${backendUrl}/create_task`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: dateSlice(mondayDate),
                task: e.target.value,
                column: index
            }),
        })
        const task = await responseTask.json();
        dispatch({ type: "create_task", payload: { id: task.id, column: index, value: e.target.value } })
    };
}