import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './WeekClicker.css'
import { MONTHS } from './MONTHS'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { fetchWeekNext, fetchWeekprevious } from '../../utils/requests'
export default function WeekClicker() {
    const dispatch = useDispatch()
    const mondayDate = new Date(useSelector(state => state.mondayDate))
    const MS_IN_DAY = 60 * 60 * 24 * 1000
    const sundayDate = new Date(mondayDate.getTime() + 6 * MS_IN_DAY)
    const weekDateText = `${mondayDate.getDate()} ${MONTHS[mondayDate.getMonth()]} — ${sundayDate.getDate()} ${MONTHS[sundayDate.getMonth()]}`
    return (
        <section className="WClicker">
            <div className="wc__container">
                <ChevronLeft onClick={() => {
                    dispatch(fetchWeekNext(mondayDate));
                }}
                    size={15} />
                <h1 className="wc__date">{weekDateText}</h1>
                <ChevronRight onClick={() => {
                    dispatch(fetchWeekprevious(mondayDate))
                }} size={15} />
            </div>
        </section>
    )
}
