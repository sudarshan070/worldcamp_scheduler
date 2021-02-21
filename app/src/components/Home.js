import axios from 'axios'
import { formatISO, fromUnixTime, startOfMonth } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar';

export default function Home() {
    const [eventData, setEventData] = useState([])
    const [isAllDataLoaded, setIsAllDataLoaded] = useState(false)

    useEffect(() => {
        const monthStartDate = startOfMonth(new Date())
        const todayDateInISO = monthStartDate.toISOString()
        axios.get(`https://central.wordcamp.org/wp-json/wp/v2/wordcamps?per_page=100&order=desc&page=1`).then(res => {
            // console.log(res.headers["x-wp-totalpages"])
            const totalPages = res.headers["x-wp-totalpages"]
            setEventData(data => data.concat(res.data))
            // console.log(totalPages)
            if (totalPages >= 2) {
                const promiseArr = [];
                for (let i = 2; i <= totalPages; i++) {
                    // console.log("fetching page", i)
                    promiseArr.push(axios.get(`https://central.wordcamp.org/wp-json/wp/v2/wordcamps?per_page=100&order=desc&page=${i}`).then(res => {
                        // setEventData((data) => data.concat(res.data))
                        setEventData(data => data.concat(res.data))
                        return res.data
                    }).catch(err => console.log(err)))
                }
                Promise.all(promiseArr).then(resolvedPromiseArr => {
                    // console.log(resolvedPromiseArr.flat())
                    setIsAllDataLoaded(true)
                    // setEventData(resolvedPromiseArr.flat())
                })
            } else {
                setIsAllDataLoaded(true)
            }
        }).catch(err => console.log(err))

    }, [])

    return (
        <main className='container-xl pt-4'>
            <section >
                <Calendar eventsData={eventData} />
            </section>
            <section>
                {
                    eventData ? eventData.length : null
                } WordCamps
            </section>

        </main>
    )
}
