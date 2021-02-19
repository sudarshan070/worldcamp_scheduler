import { fromUnixTime } from 'date-fns';
import React, { useState } from 'react'
import { Modal } from "react-bootstrap";


export default function EventModal({ event }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let date = (fromUnixTime(event['Start Date (YYYY-mm-dd)'])).toString()
    return (
        <div>
            <p className='cal-event-title' onClick={() => setShow(true)} > {event.title.rendered}</p>
            <Modal aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{event.title.rendered}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{event.Location}</p>
                    <small>{event['Host region']}</small>
                    <p>{date && date}</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}
