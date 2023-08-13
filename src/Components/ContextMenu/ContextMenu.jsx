import React from 'react'
import "./ContextMenu.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchContextEditDescription, fetchContextEditTask } from '../../utils/requests';
import { FaRegTrashAlt } from "react-icons/fa";
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
            {/* <div className='context__icons'>

            </div> */}
            <div className='context__task'>
                <FaRegTrashAlt className='context__icon' onClick={(e) => { dispatch({ type: "delete_task", payload: { keyId: keyId } }) }} size={12} />
                <h3 onBlur={(e) => {
                    console.log(e.target.childNodes[0])
                    const body = {
                        "task_id": keyId,
                        "task_text": e.target.childNodes[0].nodeValue
                    }
                    fetchContextEditTask(body, dispatch)
                }}
                    onKeyDown={handleKeyDown} suppressContentEditableWarning={true}
                    contentEditable={true}>
                    {tasks[keyId].task}
                </h3>
            </div>

            <textarea className='context__description' placeholder='Ваше описание' value={textareaValue || undefined}
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
