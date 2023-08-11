import config from "../config";
const backendUrl = config.backendUrl
export function changeDayValue(body) {
    fetch(`${backendUrl}/edit_task_day`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}