import React, { useState } from 'react'
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'


function Map({ events }) {
    const [inMonthsEvent, setInMonthsEvent] = useState(null)
    return <>
        <GoogleMap
            defaultZoom={2}
            defaultCenter={{ lat: 18.562622, lng: 73.808723 }}
        >
            {
                events && events.map(event => (
                    <Marker
                        key={event.id}
                        position={{
                            lat: event._host_coordinates.latitude || event._venue_coordinates.latitude,
                            lng: event._host_coordinates.longitude || event._venue_coordinates.longitude
                        }}

                        onClick={() => {
                            setInMonthsEvent(event)
                        }}
                    />

                ))
            }

            {
                inMonthsEvent && (
                    <InfoWindow position={{
                        lat: inMonthsEvent._host_coordinates.latitude || inMonthsEvent._venue_coordinates.latitude,
                        lng: inMonthsEvent._host_coordinates.longitude || inMonthsEvent._venue_coordinates.longitude
                    }}
                        onCloseClick={() => {
                            setInMonthsEvent(null)
                        }}
                    >
                        <div>
                            <h2>{inMonthsEvent.Location}</h2>
                            <h2>{inMonthsEvent['Host region']}</h2>
                        </div>

                    </InfoWindow>
                )
            }
        </GoogleMap>
    </>
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function GMap({ events }) {

    return (
        <div>
            <WrappedMap
                events={events}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDdITlvrww0H7WcgStKCRSIS7vUGKStfsk&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

        </div>
    )
}