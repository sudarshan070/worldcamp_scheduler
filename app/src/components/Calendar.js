import { fromUnixTime, getDate, getDay, getDaysInMonth, getMonth, getYear, isSameDay, isSameMonth, isToday } from 'date-fns'
import React, { useState } from 'react'

const getWeekDetails = (month, year) => {
    let arr = [];
    const daysInCurrentMonth = getDaysInMonth(new Date(year, month))
    const firstDayIndex = getDay((new Date(year, month)))
    let currentDate = 1;
    for (let weekNumber = 0; currentDate <= daysInCurrentMonth; weekNumber++) {
        let week = []
        if (weekNumber === 0) {
            week = week.concat(new Array(firstDayIndex).fill(null));
            // Add empty Cells
        }

        for (; currentDate <= daysInCurrentMonth;) {
            week.push(currentDate)
            const date = new Date(year, month, currentDate);
            // console.log(date, 'date');
            currentDate++;
            if (getDay(date) === 6) {
                // console.log(date)
                break;
            }
        }
        if (week.length !== 7) {
            week.push(...Array(7 - week.length).fill(null))
        }
        arr.push(week);
    }
    return arr
    // console.log(firstDayIndex)
}

const Calendar = ({ eventsData }) => {
    console.log(eventsData);

    // let eventsDate = []
    // eventsData && eventsData.map(eventDate => {
    //     return eventsDate.push(fromUnixTime(eventDate["Start Date (YYYY-mm-dd)"]).toString())
    // })
    // // console.log("eventDate", eventsDate);

    // let eventsMonthsIndex = []
    // eventsDate.filter(eventsDateMonth => (
    //     // console.log("eventsMonth", eventsDateMonth)
    //     eventsMonthsIndex.push(getMonth(new Date(eventsDateMonth)))
    // ))
    // console.log('eventsMonthsIndex', eventsMonthsIndex);


    const [month, setMonth] = useState(getMonth(new Date()))
    const [year, setYear] = useState(getYear(new Date()))

    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekDetails = getWeekDetails(month, year)
    // console.log(weekDetails, 'weekDetails')

    const eventsInCurrentMonth = eventsData.filter((event) => {
        return isSameMonth(new Date(year, month), fromUnixTime(event["Start Date (YYYY-mm-dd)"]))
    })

    console.log(eventsInCurrentMonth, "events in current month")
    return (
        <>
            <div className='text-center py-3 border-bottom'>
                <select className='cal-year' value={year} onChange={(e) => setYear(e.target.value)} onBlur={(e) => setYear(e.target.value)}>
                    {
                        new Array(25).fill(undefined).map((_, i) => {
                            return <option value={i + 2003}>
                                {i + 2003}
                            </option>
                        })
                    }
                </select>

                <select className='cal-month' value={month} onChange={(e) => setMonth(e.target.value)} onBlur={(e) => setMonth(e.target.value)}>
                    {new Array(12).fill(undefined).map((_, i) => {
                        return <option value={i}>
                            {monthsArr[i]}
                        </option>
                    })}
                </select>
            </div>
            <div>
                <table className='cal-table'>
                    <thead >
                        <tr className='border-bottom cal-th'>
                            <th className='cal-th text-center border-right'>Sunday</th>
                            <th className='cal-th text-center border-right'>Monday</th>
                            <th className='cal-th text-center border-right'>Tuesday</th>
                            <th className='cal-th text-center border-right'> Wednesday</th>
                            <th className='cal-th text-center border-right'>Thursday</th>
                            <th className='cal-th text-center border-right'>Friday</th>
                            <th className='cal-th text-center'>Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekDetails.map((week, callback) => {
                            return (<tr>
                                {/* {console.log(week, 'week')} */}
                                {week.map((day, i) => {
                                    const isTodayDay = isSameDay(new Date(year, month, day), new Date());
                                    const currentDayEvents = eventsInCurrentMonth.filter((event) => {
                                        return isSameDay(new Date(year, month, day), fromUnixTime(event["Start Date (YYYY-mm-dd)"]))
                                    })
                                    // console.log(currentDayEvents, "kl")
                                    return <td key={i} className='cal-td text-center border'>
                                        {day ? <>{isTodayDay ? <p className='cal-today-date'>{day}</p> : <p> {day} </p>}
                                            {currentDayEvents.length ?
                                                currentDayEvents.map(event => <p>{event.title.rendered}</p>) : null}
                                        </> : null}
                                    </td>
                                })}
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Calendar
