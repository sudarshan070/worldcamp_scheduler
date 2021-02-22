import axios from 'axios'
import { startOfMonth } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { BASE_API } from '../utils/api';
import Calendar from './Calendar';
import GMap from './GMap';

export default function Home() {
    const [eventData, setEventData] = useState([])
    const [isAllDataLoaded, setIsAllDataLoaded] = useState(false)

    useEffect(() => {
        const monthStartDate = startOfMonth(new Date())
        const todayDateInISO = monthStartDate.toISOString()
        axios.get(`${BASE_API}?per_page=100&order=desc&page=1`).then(res => {
            const totalPages = res.headers["x-wp-totalpages"]
            setEventData(data => data.concat(res.data))
            if (totalPages >= 2) {
                const promiseArr = [];
                for (let i = 2; i <= totalPages; i++) {
                    promiseArr.push(axios.get(`${BASE_API}?per_page=100&order=desc&page=${i}`).then(res => {
                        setEventData(data => data.concat(res.data))
                        return res.data
                    }).catch(err => console.log(err)))
                }
                Promise.all(promiseArr).then(resolvedPromiseArr => {
                    setIsAllDataLoaded(true)
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
                <div className='mt-5'>
                    {isAllDataLoaded ? <GMap events={eventData} /> : <p>Loading All Data...</p>}
                </div>
            </section>
        </main>
    )
}
