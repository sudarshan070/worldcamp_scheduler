import axios from 'axios'
import { formatISO, fromUnixTime, startOfMonth } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar';
import Maps from './Maps';

export default function Home() {
    const [eventData, setEventData] = useState([])

    useEffect(() => {
        const monthStartDate = startOfMonth(new Date())
        const todayDateInISO = monthStartDate.toISOString()
        axios.get(`https://central.wordcamp.org/wp-json/wp/v2/wordcamps?per_page=1`).then(res => {
            // console.log(res.headers["x-wp-totalpages"])
            const totalpages = res.headers["x-wp-totalpages"]
            const promiseArr = [];
            for (let i = 1; i <= Math.ceil(totalpages / 100); i++) {
                promiseArr.push(axios.get(`https://central.wordcamp.org/wp-json/wp/v2/wordcamps?per_page=100&page=${i}`).then(res => {
                    // setEventData((data) => data.concat(res.data))
                    return res.data
                }).catch(err => console.log(err)))
            }

            Promise.all(promiseArr).then(resolvedPromiseArr => {
                console.log("Data Fetched", resolvedPromiseArr.length)
                // console.log(resolvedPromiseArr.flat())
                setEventData(resolvedPromiseArr.flat())
            })
        }).catch(err => console.log(err))

    }, [])

    return (
        <main className='container-xl pt-4'>
            <section className='border'>
                <Calendar eventsData={eventData} />
            </section>
            <section>
                {
                    eventData ? eventData.length : null
                } WordCamps
            </section>
            <section>
                <Maps />
            </section>
        </main>
    )
}
