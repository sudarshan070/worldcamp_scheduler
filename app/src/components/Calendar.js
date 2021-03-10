import { addMonths, fromUnixTime, getDate, getDay, getDaysInMonth, getMonth, getYear, isFuture, isSameDay, isSameMonth, isToday, subMonths, subYears } from 'date-fns'
import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import EventModal from './EventModal';
import UpcomingEvent from './UpcomingEvent';

const getWeekDetails = (month, year) => {
    let arr = [];
    const daysInCurrentMonth = getDaysInMonth(new Date(year, month))
    const firstDayIndex = getDay((new Date(year, month)))
    let currentDate = 1;
    for (let weekNumber = 0; currentDate <= daysInCurrentMonth; weekNumber++) {
        let week = []
        if (weekNumber === 0) {
            week = week.concat(new Array(firstDayIndex).fill(null));
        }

        for (; currentDate <= daysInCurrentMonth;) {
            week.push(currentDate)
            const date = new Date(year, month, currentDate);
            currentDate++;
            if (getDay(date) === 6) {
                break;
            }
        }
        if (week.length !== 7) {
            week.push(...Array(7 - week.length).fill(null))
        }
        arr.push(week);
    }
    return arr
}

const Calendar = ({ eventsData = [] }) => {

    const [month, setMonth] = useState(getMonth(new Date()))
    const [year, setYear] = useState(getYear(new Date()))
    // console.log(year);

    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekDetails = getWeekDetails(month, year)

    const eventsInCurrentMonth = eventsData.filter((event) => {
        return isSameMonth(new Date(year, month), fromUnixTime(event["Start Date (YYYY-mm-dd)"]))
    })

    const upcomingEvents = eventsData.filter((event) => {
        return isFuture(new Date(fromUnixTime(event["Start Date (YYYY-mm-dd)"])))
    })

    let previousMonth = () => {
        let date = subMonths(new Date(year, month), 1);
        setMonth(getMonth(date));
        setYear(getYear(date));
    }

    let nextMonth = () => {
        let date = addMonths(new Date(year, month), 1)
        setMonth(getMonth(date))
        setYear(getYear(date))
    }

    return (
        <>
            <div className='border'>
                <div className=' d-flex justify-content-around align-items-center py-3 border-bottom'>
                    <div>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>
                                    <p>Previous Month</p>
                                </Tooltip>
                            }
                        >
                            <button className='cal-btn' onClick={() => previousMonth()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fillRule="evenodd" d="M15.28 5.22a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 000 1.06l6.25 6.25a.75.75 0 101.06-1.06L9.56 12l5.72-5.72a.75.75 0 000-1.06z"></path></svg></button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>
                                    <p>Next Month</p>
                                </Tooltip>
                            }
                        >
                            <button className='cal-btn' onClick={() => nextMonth()} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fillRule="evenodd" d="M8.72 18.78a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06L9.78 5.22a.75.75 0 00-1.06 1.06L14.44 12l-5.72 5.72a.75.75 0 000 1.06z"></path></svg></button>
                        </OverlayTrigger>
                    </div>
                    <div>
                        <select className='cal-year' value={year} onChange={(e) => setYear(e.target.value)} onBlur={(e) => setYear(e.target.value)}>
                            {
                                new Array(25).fill(undefined).map((_, i) => {
                                    return <option value={i + 2003} key={i + 2003}>
                                        {i + 2003}
                                    </option>
                                })
                            }
                        </select>
                        <select className='cal-month' value={month} onChange={(e) => setMonth(e.target.value)} onBlur={(e) => setMonth(e.target.value)}>
                            {new Array(12).fill(undefined).map((_, i) => {
                                return <option value={i} key={i}>
                                    {monthsArr[i]}
                                </option>
                            })}
                        </select>
                    </div>

                    <div>
                        <UpcomingEvent upcomingEvents={upcomingEvents} />
                    </div>
                </div>
                <div>
                    <table className='cal-table'>
                        <thead >
                            <tr className='border-bottom cal-th'>
                                <th className='cal-th text-center border-right'>Sunday</th>
                                <th className='cal-th text-center border-right'>Monday</th>
                                <th className='cal-th text-center border-right'>Tuesday</th>
                                <th className='cal-th text-center border-right'>Wednesday</th>
                                <th className='cal-th text-center border-right'>Thursday</th>
                                <th className='cal-th text-center border-right'>Friday</th>
                                <th className='cal-th text-center'>Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weekDetails.map((week, i) => {
                                return (<tr key={i}>
                                    {week.map((day, i) => {
                                        const isTodayDay = isSameDay(new Date(year, month, day), new Date());
                                        const currentDayEvents = eventsInCurrentMonth.filter((event) => {
                                            return isSameDay(new Date(year, month, day), fromUnixTime(event["Start Date (YYYY-mm-dd)"]))
                                        })
                                        return <td key={i} className='cal-td text-center border'>
                                            {day ? <>{isTodayDay ? <p className='cal-today-date'>{day}</p> : <p> {day} </p>}
                                                {currentDayEvents.length ?
                                                    currentDayEvents.map((event) => <>
                                                        <EventModal key={event.id} event={event} />
                                                    </>) : null}
                                            </> : null}
                                        </td>
                                    })}
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Calendar
