import config from "../config";
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