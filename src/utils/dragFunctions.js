export function dragStartTrackerTask(e, key) {
    e.dataTransfer.setData("key", key)
    e.target.style.marginLeft = "0"
    e.target.style.fontSize = "13px"

}
export function dragOverTrackerTask(e, index, trackerOrder) {

    function Top(div, index) {
        if (index == 0) {
            div.classList.add("top")
            div.parentElement.nextElementSibling.children[1].classList.remove('top')
        }
        else if (index == trackerOrder.length - 1) {
            div.classList.remove("bot")
            div.classList.add("top")
        }
        else {
            div.parentElement.nextElementSibling.children[1].classList.remove('top')
            div.classList.add('top')
        }
    }
    function Bot(div, index) {
        div.classList.remove("top")
        if (index == 0) {
            div.parentElement.nextElementSibling.children[1].classList.add('top')
        }
        else if (index == trackerOrder.length - 1) {
            div.classList.remove("top")
            div.classList.add("bot")
        }
        else {
            div.parentElement.nextElementSibling.children[1].classList.add('top')
        }
    }
    e.preventDefault();
    let div;
    if (e.target.parentElement.nodeName === "SECTION") {
        div = e.target
    }
    else {
        div = e.target.parentElement
    }

    (e.clientY - div.getBoundingClientRect().y) < (div.getBoundingClientRect().y + 20 - e.clientY)
        ? Top(div, index)
        : Bot(div, index)
}

export function dragEndTrackerTask(e, index, trackerOrder) {
    let div;
    if (e.target.parentElement.nodeName === "SECTION") {
        div = e.target
    }
    else {
        div = e.target.parentElement
    }
    if (!div.contains(e.relatedTarget) && e.relatedTarget?.classList[0] != "top_line" && (e.relatedTarget?.classList[0] != undefined || index == trackerOrder.length - 1)) {
        div.classList.remove("top")
        if (index == trackerOrder.length - 1) {
            div.classList.remove("bot")
        }
        else {
            div.parentElement.nextElementSibling.children[1].classList.remove("top")
        }
    }
}

export function dragDropTrackerTask(e, key, index, trackerOrder, dispatch) {
    e.preventDefault();
    e.stopPropagation()
    let div;
    if (e.target.parentElement.nodeName === "SECTION") {
        div = e.target
    }
    else {
        div = e.target.parentElement
    }
    div.classList.remove("top")
    if (index == trackerOrder.length - 1) {
        div.classList.remove("bot")
    }
    else {
        div.parentElement.nextElementSibling.children[1].classList.remove("top")
    }
    const dragTask = Number(e.dataTransfer.getData("key"))
    if (trackerOrder.indexOf(dragTask) == -1) {
        const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
        const ind = newTrackerOrder.indexOf(key)
        if ((e.clientY - div.getBoundingClientRect().y) < (div.getBoundingClientRect().y + 20 - e.clientY)) {
            newTrackerOrder.splice(ind, 0, dragTask)
        }
        else {
            newTrackerOrder.splice(ind + 1, 0, dragTask)
        }
        dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
    }
    else if (dragTask && key != dragTask) {
        const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
        newTrackerOrder.splice(newTrackerOrder.indexOf(dragTask), 1)
        const ind = newTrackerOrder.indexOf(key)
        if ((e.clientY - div.getBoundingClientRect().y) < (div.getBoundingClientRect().y + 20 - e.clientY)) {
            newTrackerOrder.splice(ind, 0, dragTask)
        }
        else {
            newTrackerOrder.splice(ind + 1, 0, dragTask)
        }
        dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
    }
}

export function dragDropTrackerTasks(e, trackerOrder, dispatch) {
    e.stopPropagation()
    const dragTask = Number(e.dataTransfer.getData("key"))
    if (trackerOrder.indexOf(dragTask) == -1) {
        const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
        newTrackerOrder.push(dragTask)
        dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
    }
    else {
        const newTrackerOrder = JSON.parse(JSON.stringify(trackerOrder))
        newTrackerOrder.splice(newTrackerOrder.indexOf(dragTask), 1)
        newTrackerOrder.push(dragTask)
        dispatch({ type: "change_tracker_order", payload: { newTrackerOrder: newTrackerOrder } })
    }
}

export function dragDropListUl(e, index, listOrder, dispatch) {
    e.preventDefault()
    e.stopPropagation()
    const key = Number(e.dataTransfer.getData("key"))
    const newListOrder = JSON.parse(JSON.stringify(listOrder))
    const updatedListOrder = newListOrder.map((subArray) => {
        return subArray.filter((element) => {
            if (Array.isArray(element)) {
                return !element.includes(key);
            }
            return element !== key;
        });
    });
    updatedListOrder[index].push(key)
    dispatch({ type: "change_list_order", payload: { newListOrder: updatedListOrder } })
}

export function dragStartListTask(e, key) {
    e.dataTransfer.setData("key", key)
}