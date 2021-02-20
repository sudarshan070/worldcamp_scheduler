import { fromUnixTime } from 'date-fns';
import React, { useState } from 'react'
import { Modal } from "react-bootstrap";

export default function UpcomingEvent({ upcomingEvents }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let date = (fromUnixTime(upcomingEvents['Start Date (YYYY-mm-dd)'])).toString()

    return (
        <div>
            <p className='cal-upcoming-event' onClick={() => setShow(true)} > Upcoming Events</p>
            <Modal aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Upcoming Events</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {upcomingEvents ? upcomingEvents.map(event => (<div className='pb-4'>
                        <h2 > {event.title.rendered} </h2>
                        <>
                            <small className='cal-upcoming-event-text'>{event.Location}</small>{", "}
                            <small className='cal-upcoming-event-text'>{event['Host region']}</small>
                        </>
                        <p className='cal-upcoming-event-text'>{(fromUnixTime(event['Start Date (YYYY-mm-dd)'])).toString()}</p>
                    </div>)) : ""}
                </Modal.Body>
            </Modal>
        </div>
    )
}
