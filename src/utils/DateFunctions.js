export function dateF(date) {
    return date.toISOString()
}

export function dateSlice(date) {
    return date.toISOString().slice(0, 10)
}