import { getDay, getDaysInMonth, getMonth, getYear, isThisYear, startOfMonth } from 'date-fns'
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
                console.log(date)
                break;
            }
        }
        arr.push(week);
    }
    return arr
    // console.log(firstDayIndex)
}

const Calendar = ({ eventsData }) => {

    const [month, setMonth] = useState(getMonth(new Date()))
    const [year, setYear] = useState(getYear(new Date()))

    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const weekDetails = getWeekDetails(month, year)
    console.log(weekDetails)
    return (
        <div>

            <select value={year} onChange={(e) => setYear(e.target.value)} onBlur={(e) => setYear(e.target.value)}>
                {
                    new Array(25).fill(undefined).map((_, i) => {
                        return <option value={i + 2003}>
                            {i + 2003}
                        </option>
                    })
                }
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)} onBlur={(e) => setMonth(e.target.value)}>
                {new Array(12).fill(undefined).map((_, i) => {
                    return <option value={i}>
                        {monthsArr[i]}
                    </option>
                })}
            </select>

            {/* {daysInCurrentMonth} days */}
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Sunday</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekDetails.map(week => {
                            return (<tr>
                                {week.map(day => <td>{day}</td>)}
                            </tr>)
                        })}

                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Calendar
