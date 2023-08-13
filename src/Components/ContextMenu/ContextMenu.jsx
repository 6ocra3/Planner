import React from 'react'
import "./ContextMenu.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchContextEditDescription, fetchContextEditTask } from '../../utils/requests';

export default function ContextMenu({ keyId }) {

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    const handleChange = (event) => {
        setTextareaValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const [textareaValue, setTextareaValue] = useState(tasks[keyId].description);
    console.log(tasks[keyId])
    return (
        <section
            onClick={(e) => { e.stopPropagation() }}
            className='context'>
            <h3 onBlur={(e) => {
                console.log(e.target.childNodes[0])
                const body = {
                    "task_id": keyId,
                    "task_text": e.target.childNodes[0].nodeValue
                }
                fetchContextEditTask(body, dispatch)
            }}
                onKeyDown={handleKeyDown} suppressContentEditableWarning={true}
                contentEditable={true} className='context__task'>
                {tasks[keyId].task}
            </h3>
            <textarea className='context__description' placeholder='Ваше описание' value={textareaValue}
                onInput={handleChange}
                onBlur={(e) => {
                    console.log(1234567)
                    const body = {
                        "task_id": keyId,
                        "description": e.target.childNodes[0].nodeValue
                    }
                    fetchContextEditDescription(body, dispatch)
                }}
            ></textarea>
        </section>
    )
}
